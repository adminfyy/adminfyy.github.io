<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";

import router from "@/router";
import {
  deleteConversation,
  getMessages,
  listConversations,
  streamChat,
} from "@/utils/aiChat";
import type { ChatMessage, Conversation } from "@/utils/aiChat";

const GREETING =
  "你好，我是本站的 AI 助手。可以问我前端工程、Vue、AI Agent 相关的问题，也可以点下面的卡片逛其他页面。";

const NEAR_BOTTOM = 80;

const quickLinks = router.options.routes
  .filter(
    (route) =>
      route.meta?.title && route.path !== "/" && !route.path.includes(":")
  )
  .map((route) => ({ path: route.path, title: String(route.meta?.title) }));

const conversations = ref<Conversation[]>([]);
const activeId = ref<string | null>(null);
const messages = ref<ChatMessage[]>([{ role: "assistant", content: GREETING }]);
const input = ref("");
const loading = ref(false);
const listLoading = ref(true);
const errorText = ref("");
const listError = ref("");
const atBottom = ref(true);
const copiedIndex = ref<number | null>(null);

const scrollEl = ref<HTMLElement | null>(null);
const textareaEl = ref<HTMLTextAreaElement | null>(null);

let controller: AbortController | null = null;
let copyTimer: number | undefined;

const showQuickLinks = computed(() => messages.value.length <= 1);
const online = computed(() => !listError.value);

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

const stop = () => {
  controller?.abort();
  controller = null;
  loading.value = false;
};

const newConversation = () => {
  stop();
  activeId.value = null;
  messages.value = [{ role: "assistant", content: GREETING }];
  errorText.value = "";
  atBottom.value = true;
  focusInput();
};

const selectConversation = async (id: string) => {
  if (loading.value) return;

  activeId.value = id;
  errorText.value = "";
  try {
    const history = await getMessages(id);
    messages.value = history.length
      ? history
      : [{ role: "assistant", content: GREETING }];
    atBottom.value = true;
    await scrollToBottom(true);
  } catch (error) {
    errorText.value = (error as Error).message;
  }
};

const removeConversation = async (id: string) => {
  if (!window.confirm("删除这个会话？")) return;

  try {
    await deleteConversation(id);
    if (activeId.value === id) newConversation();
    await loadConversations();
  } catch (error) {
    errorText.value = (error as Error).message;
  }
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

const send = async () => {
  const text = input.value.trim();
  if (!text || loading.value) return;

  input.value = "";
  errorText.value = "";
  await nextTick();
  resizeInput();

  messages.value.push({ role: "user", content: text });

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
      errorText.value = (error as Error).message;
      if (!reply.content) messages.value.pop();
    }
  } finally {
    loading.value = false;
    controller = null;
    await scrollToBottom();
    await loadConversations();
    focusInput();
  }
};

const onEnter = (event: KeyboardEvent) => {
  if (event.shiftKey || event.isComposing) return;
  event.preventDefault();
  send();
};

const onEscape = () => {
  if (loading.value) stop();
};

watch(input, () => {
  nextTick(resizeInput);
});

onMounted(() => {
  loadConversations();
  nextTick(() => {
    resizeInput();
    focusInput();
  });
});
</script>

<template>
  <main class="chat-page">
    <aside class="sidebar">
      <div class="side-head">
        <span class="side-title">会话</span>
        <span class="side-count">{{ conversations.length }}</span>
      </div>

      <button class="new-btn" @click="newConversation">
        <span class="plus">+</span>
        新对话
      </button>

      <p v-if="listError" class="side-error">{{ listError }}</p>

      <ul v-else-if="listLoading" class="conv-skeleton">
        <li v-for="n in 4" :key="n" class="skeleton-row"></li>
      </ul>

      <ul v-else class="conv-list">
        <li
          v-for="conversation in conversations"
          :key="conversation.id"
          class="conv-item"
          :class="{ active: conversation.id === activeId }"
        >
          <button
            class="conv-open"
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
            title="删除会话"
            aria-label="删除会话"
            @click="removeConversation(conversation.id)"
          >
            ×
          </button>
        </li>
      </ul>

      <p
        v-if="!listError && !listLoading && !conversations.length"
        class="side-empty"
      >
        还没有历史会话，发一句话开始吧
      </p>
    </aside>

    <section class="chat-main">
      <header class="chat-header">
        <div class="brand">
          <p class="eyebrow">AI Chat</p>
          <h1>和本站 AI 助手聊聊</h1>
          <p class="hint">
            <span class="status-dot" :class="{ off: !online }"></span>
            {{ online ? "流式回复 · 多会话历史" : "后端连接异常" }}
          </p>
        </div>
      </header>

      <section ref="scrollEl" class="messages" @scroll.passive="handleScroll">
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
              v-if="!message.content && loading && message.role === 'assistant'"
              class="typing"
            >
              <span></span><span></span><span></span>
            </p>
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
              <span v-if="message.createdAt" class="msg-time">
                {{ formatTime(message.createdAt) }}
              </span>
            </div>
          </div>
        </article>

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

      <p v-if="errorText" class="error" @click="errorText = ''">
        {{ errorText }}
        <span class="error-close">×</span>
      </p>

      <form class="composer" @submit.prevent="send">
        <textarea
          ref="textareaEl"
          v-model="input"
          rows="1"
          placeholder="输入问题，Enter 发送，Shift + Enter 换行"
          @keydown.enter="onEnter"
          @keydown.esc="onEscape"
        />
        <div class="composer-foot">
          <span class="composer-hint">Enter 发送 · Esc 停止</span>
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
              type="submit"
              class="send-btn"
              :disabled="loading || !input.trim()"
            >
              发送
              <span class="send-arrow">↑</span>
            </button>
          </div>
        </div>
      </form>
    </section>
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

/* ─── Messages ─── */
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

.message:hover .bubble-tools {
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
  justify-self: end;
  margin-top: -0.35rem;
  padding: 0.3rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--bg-0);
  color: var(--color-text-secondary);
  font-size: 0.78rem;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
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
  cursor: pointer;
}

.error-close {
  font-size: 1rem;
  line-height: 1;
  opacity: 0.6;
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
  }

  .sidebar {
    position: static;
    max-height: none;
  }

  .conv-list,
  .conv-skeleton {
    flex-direction: row;
    max-height: none;
    overflow-x: auto;
  }

  .conv-item {
    flex: 0 0 auto;
  }

  .conv-open {
    max-width: 170px;
  }

  .conv-del {
    opacity: 1;
  }

  .message {
    max-width: 96%;
  }

  .messages {
    height: min(58vh, 460px);
  }

  .composer-hint {
    display: none;
  }
}
</style>
