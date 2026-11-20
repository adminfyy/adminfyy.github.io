<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";

import router from "@/router";
import {
  deleteConversation,
  getMessages,
  listConversations,
  streamChat,
} from "@/utils/aiChat";
import type { ChatMessage, Conversation } from "@/utils/aiChat";
import { fetchAuthStatus, login, logout } from "@/utils/auth";
import { renderMarkdown } from "@/utils/markdown";

const INTRO_MESSAGES = [
  "你好，我是本站 AI 助手，先带你快速认识一下作者。",
  "adminfoo，前端工程师，9 年+ 经验，熟悉 Vue2/3、React、Electron 与 HarmonyOS。",
  "作者目前正在看前端岗位机会；站内还有博客、Canvas、3D、WASM 等实验，可以直接问我，或点下面的卡片逛逛。",
];

const NEAR_BOTTOM = 80;
const DRAFT_KEY = "ai-chat-draft";
const INTRO_SEEN_KEY = "ai-chat-intro-seen";

const SUGGESTIONS = [
  "介绍一下作者的前端经验",
  "Vue3 和 Vue2 响应式有什么区别",
  "Electron 主进程和渲染进程怎么通信",
];

const quickLinks = router.options.routes
  .filter(
    (route) =>
      route.meta?.title && route.path !== "/" && !route.path.includes(":")
  )
  .map((route) => ({ path: route.path, title: String(route.meta?.title) }));

const conversations = ref<Conversation[]>([]);
const activeId = ref<string | null>(null);
const messages = ref<ChatMessage[]>([]);
const input = ref("");
const loading = ref(false);
const listLoading = ref(true);
const errorText = ref("");
const listError = ref("");
const atBottom = ref(true);
const copiedIndex = ref<number | null>(null);

const authRequired = ref(false);
const authenticated = ref(true);
const showAuthModal = ref(false);
const authPassword = ref("");
const authDialogShow = ref(false);
const authError = ref("");
const authSubmitting = ref(false);
const authInputEl = ref<HTMLInputElement | null>(null);
const authDialogEl = ref<HTMLElement | null>(null);

const search = ref("");
const sidebarOpen = ref(false);
const confirmId = ref<string | null>(null);

let confirmTimer: number | undefined;

const scrollEl = ref<HTMLElement | null>(null);
const textareaEl = ref<HTMLTextAreaElement | null>(null);

let controller: AbortController | null = null;
let copyTimer: number | undefined;
let pendingSend = false;

const introTyping = ref(false);
const introFinished = ref(false);
const showQuickLinks = computed(
  () =>
    introFinished.value &&
    !introTyping.value &&
    !messages.value.some((item) => item.role === "user")
);
const unlocked = computed(() => !authRequired.value || authenticated.value);
const online = computed(() => !listError.value);
const filteredConversations = computed(() => {
  const keyword = search.value.trim().toLowerCase();
  if (!keyword) return conversations.value;
  return conversations.value.filter((item) =>
    item.title.toLowerCase().includes(keyword)
  );
});

const formatTime = (iso?: string): string => {
  if (!iso) return "";
  const time = new Date(iso).getTime();
  if (Number.isNaN(time)) return "";

  const diff = Date.now() - time;
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return "刚刚";
  if (diff < hour) return `${Math.floor(diff / minute)} 分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)} 小时前`;
  if (diff < 7 * day) return `${Math.floor(diff / day)} 天前`;

  const date = new Date(time);
  return `${date.getMonth() + 1} 月 ${date.getDate()} 日`;
};

const resizeInput = () => {
  const el = textareaEl.value;
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
};

const focusInput = () => {
  textareaEl.value?.focus();
};

const scrollToBottom = async (force = false) => {
  await nextTick();
  const el = scrollEl.value;
  if (!el) return;
  if (force || atBottom.value) {
    el.scrollTop = el.scrollHeight;
    atBottom.value = true;
  }
};

const handleScroll = () => {
  const el = scrollEl.value;
  if (!el) return;
  atBottom.value =
    el.scrollHeight - el.scrollTop - el.clientHeight < NEAR_BOTTOM;
};

const loadConversations = async () => {
  try {
    conversations.value = await listConversations();
    listError.value = "";
  } catch (error) {
    listError.value = (error as Error).message;
  } finally {
    listLoading.value = false;
  }
};

let introToken = 0;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

const cancelIntro = () => {
  introToken += 1;
  introTyping.value = false;
  introFinished.value = true;
};

const runIntro = async () => {
  const token = ++introToken;
  messages.value = [];
  introFinished.value = false;

  for (const text of INTRO_MESSAGES) {
    if (token !== introToken) return;

    introTyping.value = true;
    await sleep(460);
    if (token !== introToken) return;

    introTyping.value = false;
    messages.value.push({ role: "assistant", content: text });
    await scrollToBottom(true);
    await sleep(300);
  }

  if (token !== introToken) return;
  introTyping.value = false;
  introFinished.value = true;

  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    // 隐私模式下 sessionStorage 不可用，忽略即可
  }
};

const showIntroInstantly = () => {
  introToken += 1;
  introTyping.value = false;
  messages.value = INTRO_MESSAGES.map((text) => ({
    role: "assistant" as const,
    content: text,
  }));
  introFinished.value = true;
  scrollToBottom(true);
};

const refreshAuth = async () => {
  try {
    const status = await fetchAuthStatus();
    authRequired.value = status.required;
    authenticated.value = status.authenticated;
  } catch {
    // 后端不可用时保持可操作，由具体请求给出错误提示
    authenticated.value = true;
  }
};

const openAuthModal = () => {
  authPassword.value = "";
  authError.value = "";
  authDialogShow.value = false;
  showAuthModal.value = true;
  nextTick(() => authInputEl.value?.focus());
};

const closeAuthModal = () => {
  showAuthModal.value = false;
  pendingSend = false;
  focusInput();
};

const lockSession = async () => {
  stop();
  resetConfirm();
  try {
    await logout();
  } catch {
    // 即使接口失败也当作已锁定，重新输入口令即可
  }
  authenticated.value = false;
  conversations.value = [];
  search.value = "";
  sidebarOpen.value = false;
  errorText.value = "";
  runIntro();
};

const trapDialogFocus = (event: KeyboardEvent) => {
  if (event.key !== "Tab") return;

  const dialog = authDialogEl.value;
  if (!dialog) return;

  const focusable = Array.from(
    dialog.querySelectorAll<HTMLElement>(
      "input, button, [href], [tabindex]:not([tabindex='-1'])"
    )
  ).filter((el) => !el.hasAttribute("disabled"));
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement as HTMLElement | null;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
};

const confirmAuth = async () => {
  if (!authPassword.value || authSubmitting.value) return;

  authSubmitting.value = true;
  authError.value = "";
  try {
    await login(authPassword.value);
    authenticated.value = true;
    showAuthModal.value = false;
    await loadConversations();

    if (pendingSend) {
      const text = input.value.trim();
      pendingSend = false;
      if (text) await dispatch(text);
    }
    focusInput();
  } catch (error) {
    authError.value = (error as Error).message;
  } finally {
    authSubmitting.value = false;
  }
};

const stop = () => {
  controller?.abort();
  controller = null;
  loading.value = false;
};

const newConversation = () => {
  stop();
  resetConfirm();
  activeId.value = null;
  errorText.value = "";
  atBottom.value = true;
  search.value = "";
  sidebarOpen.value = false;
  runIntro();
  focusInput();
};

const selectConversation = async (id: string) => {
  if (loading.value) stop();

  resetConfirm();
  cancelIntro();
  sidebarOpen.value = false;
  activeId.value = id;
  errorText.value = "";
  try {
    const history = await getMessages(id);
    if (history.length) {
      messages.value = history;
      introFinished.value = true;
    } else {
      runIntro();
    }
    atBottom.value = true;
    await scrollToBottom(true);
  } catch (error) {
    errorText.value = (error as Error).message;
  }
};

const resetConfirm = () => {
  confirmId.value = null;
  window.clearTimeout(confirmTimer);
};

const requestRemove = (id: string) => {
  if (confirmId.value === id) {
    resetConfirm();
    void removeConversation(id);
    return;
  }

  confirmId.value = id;
  window.clearTimeout(confirmTimer);
  confirmTimer = window.setTimeout(resetConfirm, 3000);
};

const removeConversation = async (id: string) => {
  try {
    await deleteConversation(id);
    if (activeId.value === id) newConversation();
    await loadConversations();
  } catch (error) {
    errorText.value = (error as Error).message;
  }
};

const reloadList = () => {
  listLoading.value = true;
  void loadConversations();
};

const copyMessage = async (content: string, index: number) => {
  if (!content) return;
  try {
    await navigator.clipboard.writeText(content);
    copiedIndex.value = index;
    window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => {
      copiedIndex.value = null;
    }, 1500);
  } catch {
    copiedIndex.value = null;
  }
};

const dispatch = async (text: string, pushUser = true) => {
  input.value = "";
  errorText.value = "";
  await nextTick();
  resizeInput();

  if (pushUser) {
    messages.value.push({ role: "user", content: text });
  }

  const reply: ChatMessage = { role: "assistant", content: "" };
  messages.value.push(reply);
  loading.value = true;
  atBottom.value = true;
  controller = new AbortController();
  await scrollToBottom(true);

  try {
    await streamChat(
      text,
      activeId.value,
      {
        onStart: (conversation) => {
          activeId.value = conversation.id;
          const existing = conversations.value.find(
            (item) => item.id === conversation.id
          );
          if (existing) {
            existing.title = conversation.title;
          } else {
            conversations.value.unshift({
              id: conversation.id,
              title: conversation.title,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
        },
        onDelta: (delta) => {
          reply.content += delta;
          scrollToBottom();
        },
      },
      controller.signal
    );
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      reply.content = reply.content
        ? `${reply.content}\n\n（已停止）`
        : "（已停止）";
    } else {
      const message = (error as Error).message;
      const unauthorized = message.includes("401");

      if (!reply.content) messages.value.pop();

      if (unauthorized) {
        authenticated.value = false;
        input.value = text;
        pendingSend = true;

        // 本次请求未落库，回滚刚插入的用户消息，避免验证后重复发送
        const last = messages.value[messages.value.length - 1];
        if (last && last.role === "user" && last.content === text) {
          messages.value.pop();
        }
        openAuthModal();
      } else {
        errorText.value = message;
      }
    }
  } finally {
    loading.value = false;
    controller = null;
    await scrollToBottom();
    if (authenticated.value) await loadConversations();
    focusInput();
  }
};

const regenerate = async () => {
  if (loading.value) return;

  const lastUserIndex = messages.value
    .map((item) => item.role)
    .lastIndexOf("user");
  if (lastUserIndex < 0) return;

  const text = messages.value[lastUserIndex].content;
  messages.value = messages.value.slice(0, lastUserIndex + 1);
  cancelIntro();
  await dispatch(text, false);
};

const useSuggestion = async (text: string) => {
  input.value = text;
  await send();
};

const send = async () => {
  const text = input.value.trim();
  if (!text || loading.value) return;

  cancelIntro();

  if (!unlocked.value) {
    pendingSend = true;
    openAuthModal();
    return;
  }

  await dispatch(text);
};

const onEnter = (event: KeyboardEvent) => {
  // keyCode 229 兼容部分输入法组合态
  if (event.shiftKey || event.isComposing || event.keyCode === 229) return;
  event.preventDefault();
  send();
};

const onGlobalKeydown = (event: KeyboardEvent) => {
  if (event.key !== "Escape") return;
  if (showAuthModal.value) {
    closeAuthModal();
    return;
  }
  if (loading.value) stop();
};

watch(input, (value) => {
  try {
    if (value) localStorage.setItem(DRAFT_KEY, value);
    else localStorage.removeItem(DRAFT_KEY);
  } catch {
    // 隐私模式下 localStorage 不可用，忽略即可
  }
  nextTick(resizeInput);
});

onMounted(async () => {
  window.addEventListener("keydown", onGlobalKeydown);
  try {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) input.value = draft;
  } catch {
    // 忽略读取失败
  }
  let introSeen = false;
  try {
    introSeen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    introSeen = false;
  }
  if (introSeen) showIntroInstantly();
  else runIntro();
  await refreshAuth();
  if (authenticated.value) {
    loadConversations();
  } else {
    listLoading.value = false;
  }
  nextTick(() => {
    resizeInput();
    focusInput();
  });
});

onUnmounted(() => {
  window.removeEventListener("keydown", onGlobalKeydown);
  window.clearTimeout(confirmTimer);
  cancelIntro();
});
</script>

<template>
  <main class="chat-page">
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <button
        class="side-toggle"
        type="button"
        :aria-expanded="sidebarOpen"
        @click="sidebarOpen = !sidebarOpen"
      >
        <span class="side-title">会话</span>
        <span class="side-count">{{ conversations.length }}</span>
        <span class="side-caret" :class="{ open: sidebarOpen }">⌄</span>
      </button>

      <div class="side-head">
        <span class="side-title">会话</span>
        <span class="side-count">{{ conversations.length }}</span>
      </div>

      <div class="side-body">
        <button class="new-btn" @click="newConversation">
          <span class="plus">+</span>
          新对话
        </button>

        <input
          v-if="unlocked && conversations.length"
          v-model="search"
          class="side-search"
          type="search"
          placeholder="搜索会话标题"
          aria-label="搜索会话标题"
        />

        <p v-if="!unlocked" class="side-empty">
          输入访问口令后即可发送消息、查看历史会话
        </p>

        <template v-else>
          <p v-if="listError" class="side-error">
            {{ listError }}
            <button class="side-retry" type="button" @click="reloadList">
              重试
            </button>
          </p>

          <ul v-else-if="listLoading" class="conv-skeleton">
            <li
              v-for="n in 4"
              :key="n"
              class="skeleton-row"
              aria-hidden="true"
            ></li>
          </ul>

          <p v-else-if="!filteredConversations.length" class="side-empty">
            {{ search ? "没有匹配的会话" : "还没有历史会话，发一句话开始吧" }}
          </p>

          <ul v-else class="conv-list">
            <li
              v-for="conversation in filteredConversations"
              :key="conversation.id"
              class="conv-item"
              :class="{ active: conversation.id === activeId }"
            >
              <button
                class="conv-open"
                type="button"
                :title="conversation.title"
                @click="selectConversation(conversation.id)"
              >
                <span class="conv-name">{{ conversation.title }}</span>
                <span class="conv-time">{{
                  formatTime(conversation.updatedAt)
                }}</span>
              </button>
              <button
                class="conv-del"
                :class="{ confirming: confirmId === conversation.id }"
                :title="
                  confirmId === conversation.id
                    ? '再次点击确认删除'
                    : '删除会话'
                "
                :aria-label="
                  confirmId === conversation.id ? '确认删除会话' : '删除会话'
                "
                @click="requestRemove(conversation.id)"
              >
                {{ confirmId === conversation.id ? "确认" : "×" }}
              </button>
            </li>
          </ul>
        </template>

        <button
          v-if="unlocked && authRequired"
          class="lock-btn"
          type="button"
          @click="lockSession"
        >
          锁定会话
        </button>
      </div>
    </aside>

    <section class="chat-main">
      <header class="chat-header">
        <div class="brand">
          <p class="eyebrow">AI Chat</p>
          <h1>和本站 AI 助手聊聊</h1>
          <p class="hint">
            <span
              class="status-dot"
              :class="{ off: !online || !unlocked }"
            ></span>
            {{
              !unlocked
                ? "输入口令后开始对话"
                : online
                ? "流式回复 · 多会话历史"
                : "后端连接异常"
            }}
          </p>
        </div>

        <router-link class="job-card" to="/about">
          <span class="job-badge">
            <span class="job-dot"></span>
            求职中
          </span>
          <span class="job-title">前端工程师 · 9 年+ 经验</span>
          <span class="job-meta">Vue2/3 · React · Electron · HarmonyOS</span>
          <span class="job-link">厦门 · 查看简历 →</span>
        </router-link>
      </header>

      <div class="messages-wrap">
        <section
          ref="scrollEl"
          class="messages"
          role="log"
          aria-live="polite"
          @scroll.passive="handleScroll"
        >
          <article
            v-for="(message, index) in messages"
            :key="index"
            class="message"
            :class="[
              message.role,
              { live: loading && index === messages.length - 1 },
            ]"
          >
            <div class="avatar" :class="message.role">
              {{ message.role === "user" ? "你" : "AI" }}
            </div>

            <div class="bubble-wrap">
              <p
                v-if="
                  !message.content && loading && message.role === 'assistant'
                "
                class="typing"
              >
                <span></span><span></span><span></span>
              </p>
              <div
                v-else-if="message.role === 'assistant'"
                class="bubble md"
                v-html="renderMarkdown(message.content)"
              ></div>
              <p v-else class="bubble">{{ message.content }}</p>

              <div
                v-if="message.role === 'assistant' && message.content"
                class="bubble-tools"
              >
                <button
                  class="tool-btn"
                  type="button"
                  @click="copyMessage(message.content, index)"
                >
                  {{ copiedIndex === index ? "已复制" : "复制" }}
                </button>
                <button
                  v-if="!loading && !errorText && index === messages.length - 1"
                  class="tool-btn"
                  type="button"
                  @click="regenerate"
                >
                  重新生成
                </button>
                <span v-if="message.createdAt" class="msg-time">
                  {{ formatTime(message.createdAt) }}
                </span>
              </div>
            </div>
          </article>

          <div v-if="introTyping" class="message assistant">
            <div class="avatar assistant">AI</div>
            <div class="bubble-wrap">
              <p class="typing"><span></span><span></span><span></span></p>
            </div>
          </div>

          <nav v-if="showQuickLinks" class="suggestions" aria-label="快捷提问">
            <button
              v-for="text in SUGGESTIONS"
              :key="text"
              class="suggestion"
              type="button"
              @click="useSuggestion(text)"
            >
              {{ text }}
            </button>
          </nav>

          <nav v-if="showQuickLinks" class="quick-links">
            <router-link
              v-for="link in quickLinks"
              :key="link.path"
              :to="link.path"
              class="quick-link"
            >
              <span>{{ link.title }}</span>
              <span class="arrow">→</span>
            </router-link>
          </nav>
        </section>

        <button
          v-if="!atBottom && messages.length > 2"
          class="to-bottom"
          type="button"
          @click="scrollToBottom(true)"
        >
          回到底部 ↓
        </button>
      </div>

      <div v-if="errorText" class="error" role="alert">
        <span class="error-text">{{ errorText }}</span>
        <div class="error-actions">
          <button class="error-retry" type="button" @click="regenerate">
            重试
          </button>
          <button
            class="error-close"
            type="button"
            aria-label="关闭错误提示"
            @click="errorText = ''"
          >
            ×
          </button>
        </div>
      </div>

      <form class="composer" @submit.prevent="send">
        <textarea
          ref="textareaEl"
          v-model="input"
          rows="1"
          aria-label="输入问题"
          placeholder="输入问题…"
          @keydown.enter="onEnter"
        />
        <div class="composer-foot">
          <span class="composer-hint">
            Enter 发送 · Shift + Enter 换行 · Esc 停止
          </span>
          <div class="actions">
            <button
              v-if="loading"
              type="button"
              class="ghost-btn"
              @click="stop"
            >
              停止生成
            </button>
            <button
              v-else
              type="submit"
              class="send-btn"
              :disabled="!input.trim()"
            >
              发送
              <span class="send-arrow">↑</span>
            </button>
          </div>
        </div>
      </form>
    </section>

    <div v-if="showAuthModal" class="auth-mask" @click.self="closeAuthModal">
      <form
        ref="authDialogEl"
        class="auth-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        @submit.prevent="confirmAuth"
        @keydown.esc="closeAuthModal"
        @keydown="trapDialogFocus"
      >
        <h2 id="auth-title">输入访问口令</h2>
        <p class="auth-dialog-tip">验证通过后会自动发送你的消息</p>

        <div class="auth-dialog-field">
          <input
            ref="authInputEl"
            v-model="authPassword"
            :type="authDialogShow ? 'text' : 'password'"
            placeholder="访问口令"
            autocomplete="current-password"
            :disabled="authSubmitting"
          />
          <button
            class="auth-dialog-toggle"
            type="button"
            tabindex="-1"
            @click="authDialogShow = !authDialogShow"
          >
            {{ authDialogShow ? "隐藏" : "显示" }}
          </button>
        </div>

        <p v-if="authError" class="auth-dialog-error">{{ authError }}</p>

        <div class="auth-dialog-actions">
          <button type="button" class="ghost-btn" @click="closeAuthModal">
            取消
          </button>
          <button
            type="submit"
            class="send-btn"
            :disabled="authSubmitting || !authPassword"
          >
            {{ authSubmitting ? "验证中…" : "验证并发送" }}
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
.chat-page {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
  width: 100%;
  animation: rise-in 0.5s var(--ease-out) both;
}

/* ─── Sidebar ─── */
.sidebar {
  position: sticky;
  top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: calc(100vh - 2rem);
  padding: 0.9rem;
  overflow-y: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--surface-glass);
  box-shadow: var(--shadow-sm);
}

.side-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.25rem;
}

.side-title {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.side-count {
  min-width: 1.4rem;
  padding: 0.05rem 0.4rem;
  border-radius: var(--radius-pill);
  background: var(--bg-2);
  color: var(--color-text-secondary);
  font-size: 0.72rem;
  text-align: center;
}

.side-toggle {
  display: none;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.65rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--bg-0);
  color: var(--color-text);
  font: inherit;
  cursor: pointer;
}

.side-toggle .side-title {
  flex: 1;
  text-align: left;
}

.side-caret {
  color: var(--color-text-secondary);
  transition: transform var(--duration-fast) var(--ease-out);
}

.side-caret.open {
  transform: rotate(180deg);
}

.side-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.side-search {
  width: 100%;
  padding: 0.42rem 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--bg-0);
  color: var(--color-text);
  font: inherit;
  font-size: 0.82rem;
}

.side-search:focus {
  border-color: var(--color-border-focus);
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-bg-subtle);
}

.lock-btn {
  align-self: flex-start;
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.78rem;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.lock-btn:hover {
  border-color: var(--color-border-hover);
  color: var(--accent-600);
}

.new-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.55rem 0.75rem;
  border: 1px solid var(--accent-500);
  border-radius: var(--radius-md);
  background: var(--accent-bg-light);
  color: var(--accent-600);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.new-btn:hover {
  background: var(--accent-bg-medium);
  transform: translateY(-1px);
}

.plus {
  font-size: 1.05rem;
  line-height: 1;
}

.conv-list,
.conv-skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  max-height: 58vh;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  list-style: none;
}

.conv-item {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  border-radius: var(--radius-sm);
  transition: background var(--duration-fast) var(--ease-out);
}

.conv-item:hover {
  background: var(--bg-1);
}

.conv-item.active {
  background: var(--accent-bg-light);
}

.conv-open {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
  padding: 0.45rem 0.6rem;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.conv-name {
  overflow: hidden;
  font-size: 0.88rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conv-time {
  font-size: 0.72rem;
  color: var(--color-text-secondary);
}

.conv-del {
  padding: 0.15rem 0.4rem;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 1rem;
  line-height: 1;
  opacity: 0;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.conv-item:hover .conv-del,
.conv-item.active .conv-del {
  opacity: 1;
}

.conv-del:hover {
  background: rgba(220, 38, 38, 0.08);
  color: #dc2626;
}

.conv-del.confirming {
  padding: 0.15rem 0.5rem;
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  font-size: 0.72rem;
  opacity: 1;
}

.skeleton-row {
  height: 2.1rem;
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, var(--bg-2), var(--bg-1), var(--bg-2));
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite linear;
}

.side-error {
  margin: 0;
  color: #dc2626;
  font-size: 0.8rem;
  word-break: break-word;
}

.side-retry {
  margin-left: 0.35rem;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--accent-600);
  font-size: 0.8rem;
  text-decoration: underline;
  cursor: pointer;
}

.side-empty {
  margin: 0;
  padding: 0.5rem 0.25rem;
  color: var(--color-text-secondary);
  font-size: 0.8rem;
  line-height: 1.5;
}

/* ─── Main ─── */
.chat-main {
  display: grid;
  gap: 1rem;
  min-width: 0;
}

.chat-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.4rem 1.6rem;
  border-radius: var(--radius-xl);
  background: radial-gradient(
      circle at 82% 18%,
      rgba(255, 255, 255, 0.22),
      transparent 46%
    ),
    linear-gradient(135deg, #312e81, #4f46e5 52%, #7c3aed);
  color: #fff;
  box-shadow: var(--shadow-lg);
}

.eyebrow {
  margin: 0;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.72;
}

.chat-header h1 {
  margin: 0.25rem 0 0;
  color: #fff;
  font-size: 1.45rem;
  line-height: 1.3;
}

.hint {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0.35rem 0 0;
  font-size: 0.82rem;
  opacity: 0.8;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.22);
}

.status-dot.off {
  background: #fbbf24;
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.22);
}

.job-card {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 0 0 auto;
  padding: 0.75rem 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  text-decoration: none;
  backdrop-filter: blur(6px);
  transition: all var(--duration-fast) var(--ease-out);
}

.job-card:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.45);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.18);
}

.job-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: fit-content;
  padding: 0.1rem 0.5rem;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.18);
  font-size: 0.7rem;
  letter-spacing: 0.04em;
}

.job-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.25);
  animation: pulse 2s infinite ease-in-out;
}

.job-title {
  font-size: 0.92rem;
  font-weight: 600;
}

.job-meta {
  font-size: 0.75rem;
  opacity: 0.78;
}

.job-link {
  margin-top: 0.15rem;
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.9;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.25);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(52, 211, 153, 0.05);
  }
}

/* ─── Messages ─── */
.messages-wrap {
  position: relative;
  min-width: 0;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: min(54vh, 520px);
  padding: 1.25rem;
  overflow-y: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: radial-gradient(
      circle at 100% 0%,
      var(--accent-bg-subtle),
      transparent 55%
    ),
    var(--surface-glass);
  scroll-behavior: smooth;
}

.message {
  display: flex;
  gap: 0.6rem;
  max-width: 88%;
  animation: fade-up 0.28s var(--ease-out) both;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.avatar {
  display: grid;
  flex: 0 0 28px;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.avatar.assistant {
  background: linear-gradient(135deg, var(--accent-500), #7c3aed);
  color: #fff;
}

.avatar.user {
  background: var(--bg-3);
  color: var(--color-text-secondary);
}

.bubble-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.message.user .bubble-wrap {
  align-items: flex-end;
}

.bubble {
  margin: 0;
  padding: 0.7rem 0.95rem;
  border: 1px solid var(--color-border);
  border-radius: 4px 14px 14px 14px;
  background: var(--bg-0);
  color: var(--color-text);
  font-size: 0.94rem;
  line-height: 1.65;
  white-space: pre-wrap;
  word-break: break-word;
  box-shadow: var(--shadow-sm);
}

.message.user .bubble {
  border-color: transparent;
  border-radius: 14px 4px 14px 14px;
  background: linear-gradient(135deg, var(--accent-600), #6d28d9);
  color: #fff;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.24);
}

/* Markdown 内容排版 */
.bubble.md {
  white-space: normal;
}

.bubble.md ::v-deep p {
  margin: 0 0 0.55rem;
}

.bubble.md ::v-deep p:last-child {
  margin-bottom: 0;
}

.bubble.md ::v-deep h1,
.bubble.md ::v-deep h2,
.bubble.md ::v-deep h3,
.bubble.md ::v-deep h4 {
  margin: 0.25rem 0 0.45rem;
  line-height: 1.35;
}

.bubble.md ::v-deep h1 {
  font-size: 1.05rem;
}

.bubble.md ::v-deep h2 {
  font-size: 1rem;
}

.bubble.md ::v-deep h3,
.bubble.md ::v-deep h4 {
  font-size: 0.95rem;
}

.bubble.md ::v-deep ul,
.bubble.md ::v-deep ol {
  margin: 0.3rem 0 0.55rem;
  padding-left: 1.15rem;
}

.bubble.md ::v-deep li {
  margin: 0.15rem 0;
}

.bubble.md ::v-deep code {
  padding: 0.1rem 0.35rem;
  border-radius: 5px;
  background: var(--bg-2);
  color: var(--accent-700);
  font-family: var(--font-mono);
  font-size: 0.86em;
}

.bubble.md ::v-deep pre {
  margin: 0.5rem 0;
  padding: 0.7rem 0.85rem;
  overflow-x: auto;
  border-radius: var(--radius-sm);
  background: #0f172a;
  color: #e2e8f0;
}

.bubble.md ::v-deep pre code {
  padding: 0;
  background: transparent;
  color: inherit;
  font-size: 0.84rem;
  line-height: 1.55;
  white-space: pre;
}

.bubble.md ::v-deep blockquote {
  margin: 0.45rem 0;
  padding-left: 0.7rem;
  border-left: 3px solid var(--accent-500);
  color: var(--color-text-secondary);
}

.bubble.md ::v-deep a {
  color: var(--accent-600);
  text-decoration: underline;
}

.bubble.md ::v-deep hr {
  margin: 0.65rem 0;
  border: none;
  border-top: 1px solid var(--color-border);
}

.message.live .bubble.md::after {
  content: "";
  display: inline-block;
  width: 2px;
  height: 1em;
  margin-left: 2px;
  vertical-align: -0.15em;
  background: var(--accent-500);
  animation: caret 1s steps(1) infinite;
}

@keyframes caret {
  50% {
    opacity: 0;
  }
}

.typing {
  display: flex;
  gap: 4px;
  padding: 0.85rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px 14px 14px 14px;
  background: var(--bg-0);
}

.typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-text-secondary);
  animation: blink 1.2s infinite ease-in-out;
}

.typing span:nth-child(2) {
  animation-delay: 0.18s;
}

.typing span:nth-child(3) {
  animation-delay: 0.36s;
}

.bubble-tools {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.message:hover .bubble-tools,
.message:focus-within .bubble-tools {
  opacity: 1;
}

.tool-btn {
  padding: 0;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  cursor: pointer;
}

.tool-btn:hover {
  color: var(--accent-600);
}

.msg-time {
  font-size: 0.72rem;
  color: var(--color-text-secondary);
}

.suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.suggestion {
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--bg-0);
  color: var(--color-text-secondary);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.suggestion:hover {
  border-color: var(--accent-500);
  background: var(--accent-bg-subtle);
  color: var(--accent-600);
  transform: translateY(-1px);
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.5rem;
  padding-top: 0.35rem;
}

.quick-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--bg-0);
  color: var(--color-text);
  font-size: 0.88rem;
  transition: all var(--duration-fast) var(--ease-out);
}

.quick-link:hover {
  border-color: var(--accent-500);
  background: var(--accent-bg-subtle);
  color: var(--accent-600);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.arrow {
  color: var(--color-text-secondary);
  transition: transform var(--duration-fast) var(--ease-out);
}

.quick-link:hover .arrow {
  transform: translateX(3px);
  color: var(--accent-600);
}

.to-bottom {
  position: absolute;
  right: 1rem;
  bottom: 0.9rem;
  z-index: 2;
  padding: 0.3rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--surface-glass-hover);
  color: var(--color-text-secondary);
  font-size: 0.78rem;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(6px);
}

.to-bottom:hover {
  color: var(--accent-600);
  border-color: var(--color-border-hover);
}

.error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0;
  padding: 0.65rem 0.9rem;
  border: 1px solid rgba(220, 38, 38, 0.25);
  border-radius: var(--radius-md);
  background: rgba(220, 38, 38, 0.06);
  color: #b91c1c;
  font-size: 0.85rem;
}

.error-text {
  min-width: 0;
  word-break: break-word;
}

.error-actions {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.6rem;
}

.error-retry {
  padding: 0.15rem 0.55rem;
  border: 1px solid rgba(185, 28, 28, 0.35);
  border-radius: var(--radius-pill);
  background: transparent;
  color: #b91c1c;
  font-size: 0.78rem;
  cursor: pointer;
}

.error-retry:hover {
  background: rgba(185, 28, 28, 0.08);
}

.error-close {
  border: none;
  background: transparent;
  color: inherit;
  font-size: 1rem;
  line-height: 1;
  opacity: 0.6;
  cursor: pointer;
}

.error-close:hover {
  opacity: 1;
}

/* ─── Composer ─── */
.composer {
  display: grid;
  gap: 0.5rem;
  padding: 0.8rem 0.9rem 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--surface-glass);
  box-shadow: var(--shadow-sm);
  transition: border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.composer:focus-within {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 4px var(--accent-bg-subtle), var(--shadow-md);
}

textarea {
  width: 100%;
  min-height: 2.4rem;
  max-height: 160px;
  padding: 0.2rem 0.15rem;
  overflow-y: auto;
  resize: none;
  border: none;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 0.94rem;
  line-height: 1.6;
}

textarea:focus {
  outline: none;
}

.composer-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.composer-hint {
  font-size: 0.72rem;
  color: var(--color-text-secondary);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.actions > button {
  justify-content: center;
  min-width: 5.4rem;
}

.send-btn,
.ghost-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.42rem 1rem;
  border-radius: var(--radius-pill);
  font-size: 0.88rem;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.send-btn {
  border: 1px solid transparent;
  background: var(--accent-600);
  color: #fff;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.send-btn:hover:enabled {
  background: var(--accent-700);
  transform: translateY(-1px);
}

.send-btn:disabled {
  cursor: not-allowed;
  opacity: 0.45;
  box-shadow: none;
}

.send-arrow {
  font-size: 0.95rem;
  line-height: 1;
}

.ghost-btn {
  border: 1px solid var(--color-border);
  background: var(--bg-0);
  color: var(--color-text);
}

.ghost-btn:hover:enabled {
  border-color: var(--color-border-hover);
  color: var(--accent-600);
}

/* ─── Auth dialog ─── */
.auth-mask {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(15, 23, 42, 0.36);
  backdrop-filter: blur(3px);
  animation: mask-in 0.18s ease both;
}

.auth-dialog {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: min(360px, 100%);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: var(--bg-0);
  box-shadow: var(--shadow-xl);
  animation: dialog-in 0.22s var(--ease-out) both;
}

.auth-dialog h2 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--color-heading);
}

.auth-dialog-tip {
  margin: 0;
  font-size: 0.82rem;
  color: var(--color-text-secondary);
}

.auth-dialog-field {
  position: relative;
}

.auth-dialog-field input {
  width: 100%;
  padding: 0.65rem 3.2rem 0.65rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--bg-1);
  color: var(--color-text);
  font: inherit;
  outline: none;
}

.auth-dialog-field input:focus {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 4px var(--accent-bg-subtle);
}

.auth-dialog-toggle {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  padding: 0.15rem 0.3rem;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  cursor: pointer;
  transform: translateY(-50%);
}

.auth-dialog-toggle:hover {
  color: var(--accent-600);
}

.auth-dialog-error {
  margin: 0;
  font-size: 0.8rem;
  color: #b91c1c;
}

.auth-dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.2rem;
}

@keyframes mask-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes dialog-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

@keyframes blink {
  0%,
  80%,
  100% {
    opacity: 0.25;
    transform: translateY(0);
  }
  40% {
    opacity: 1;
    transform: translateY(-2px);
  }
}

@media (max-width: 860px) {
  .chat-page {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .chat-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.9rem;
    padding: 1.1rem 1.15rem;
    border-radius: var(--radius-lg);
  }

  .chat-header h1 {
    font-size: 1.25rem;
  }

  .job-card {
    width: 100%;
  }

  .sidebar {
    position: static;
    max-height: none;
    padding: 0.75rem;
  }

  .side-toggle {
    display: flex;
  }

  .side-head {
    display: none;
  }

  .sidebar .side-body {
    display: none;
  }

  .sidebar.open .side-body {
    display: flex;
  }

  .conv-list,
  .conv-skeleton {
    max-height: 46vh;
  }

  .conv-open {
    max-width: none;
  }

  .conv-del {
    opacity: 1;
  }

  .bubble-tools {
    opacity: 1;
  }

  .message {
    max-width: 94%;
  }

  .bubble {
    padding: 0.65rem 0.85rem;
    font-size: 0.92rem;
  }

  .messages {
    gap: 0.85rem;
    height: min(58vh, 460px);
    height: min(58dvh, 520px);
    padding: 1rem 0.9rem;
  }

  .composer {
    padding: 0.7rem 0.75rem 0.6rem;
  }

  .actions > button {
    min-width: 5rem;
  }

  .quick-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .composer-hint {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .chat-page,
  .message,
  .auth-mask,
  .auth-dialog,
  .job-dot {
    animation: none;
  }

  .messages {
    scroll-behavior: auto;
  }
}
</style>
