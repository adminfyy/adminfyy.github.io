<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";

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
const errorText = ref("");
const listError = ref("");
const scrollEl = ref<HTMLElement | null>(null);

let controller: AbortController | null = null;

const showQuickLinks = computed(() => messages.value.length <= 1);

const scrollToBottom = async () => {
  await nextTick();
  if (scrollEl.value) {
    scrollEl.value.scrollTop = scrollEl.value.scrollHeight;
  }
};

const loadConversations = async () => {
  try {
    conversations.value = await listConversations();
    listError.value = "";
  } catch (error) {
    listError.value = (error as Error).message;
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
    await scrollToBottom();
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

const send = async () => {
  const text = input.value.trim();
  if (!text || loading.value) return;

  input.value = "";
  errorText.value = "";
  messages.value.push({ role: "user", content: text });

  const reply: ChatMessage = { role: "assistant", content: "" };
  messages.value.push(reply);
  loading.value = true;
  controller = new AbortController();
  await scrollToBottom();

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
  }
};

const onEnter = (event: KeyboardEvent) => {
  if (event.shiftKey || event.isComposing) return;
  event.preventDefault();
  send();
};

onMounted(() => {
  loadConversations();
});
</script>

<template>
  <main class="chat-page">
    <aside class="sidebar">
      <button class="new-btn" @click="newConversation">+ 新对话</button>

      <p v-if="listError" class="side-error">{{ listError }}</p>
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
            {{ conversation.title }}
          </button>
          <button
            class="conv-del"
            title="删除会话"
            @click="removeConversation(conversation.id)"
          >
            ×
          </button>
        </li>
      </ul>
      <p v-if="!listError && !conversations.length" class="side-empty">
        还没有历史会话
      </p>
    </aside>

    <section class="chat-main">
      <header class="chat-header">
        <div>
          <p class="eyebrow">AI Chat</p>
          <h1>和本站 AI 助手聊聊</h1>
          <p class="hint">流式回复 · 多会话历史</p>
        </div>
      </header>

      <section ref="scrollEl" class="messages">
        <article
          v-for="(message, index) in messages"
          :key="index"
          class="message"
          :class="message.role"
        >
          <p class="role">{{ message.role === "user" ? "你" : "AI" }}</p>
          <p class="bubble">
            {{ message.content || (loading ? "思考中…" : "") }}
          </p>
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

      <p v-if="errorText" class="error">{{ errorText }}</p>

      <form class="composer" @submit.prevent="send">
        <textarea
          v-model="input"
          rows="3"
          placeholder="输入问题，Enter 发送，Shift + Enter 换行"
          @keydown.enter="onEnter"
        />
        <div class="actions">
          <button v-if="loading" type="button" class="ghost-btn" @click="stop">
            停止
          </button>
          <button
            type="submit"
            class="send-btn"
            :disabled="loading || !input.trim()"
          >
            发送
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
.chat-page {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
  width: 100%;
  animation: rise-in 0.5s var(--ease-out) both;
}

.sidebar {
  position: sticky;
  top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--surface-glass);
}

.new-btn {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--accent-500);
  border-radius: var(--radius-pill);
  background: var(--accent-bg-light);
  color: var(--accent-600);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--duration-fast) ease;
}

.new-btn:hover {
  background: var(--accent-bg-medium);
}

.conv-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-height: 60vh;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  list-style: none;
}

.conv-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: var(--radius-sm);
}

.conv-item.active {
  background: var(--accent-bg-light);
}

.conv-open {
  flex: 1;
  min-width: 0;
  padding: 0.45rem 0.6rem;
  overflow: hidden;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 0.88rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.conv-open:hover {
  background: var(--accent-bg-subtle);
}

.conv-del {
  padding: 0.2rem 0.45rem;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
}

.conv-del:hover {
  background: rgba(220, 38, 38, 0.08);
  color: #dc2626;
}

.side-error {
  color: #dc2626;
  font-size: 0.82rem;
  word-break: break-word;
}

.side-empty {
  color: var(--color-text-secondary);
  font-size: 0.82rem;
}

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
  padding: 1.5rem;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, #312e81, #4f46e5 50%, #7c3aed);
  color: #fff;
  box-shadow: var(--shadow-lg);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
  font-weight: 600;
  opacity: 0.7;
}

.chat-header h1 {
  color: #fff;
  font-size: 1.5rem;
}

.hint {
  font-size: 0.85rem;
  opacity: 0.75;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: min(52vh, 480px);
  padding: 1rem;
  overflow-y: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--surface-glass);
}

.message {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-width: 85%;
}

.message.user {
  align-self: flex-end;
  align-items: flex-end;
}

.role {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.bubble {
  padding: 0.6rem 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--bg-2);
  white-space: pre-wrap;
  word-break: break-word;
}

.message.user .bubble {
  border-color: var(--accent-500);
  background: var(--accent-bg-light);
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.5rem;
  padding-top: 0.25rem;
}

.quick-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--bg-0);
  color: var(--color-text);
  font-size: 0.88rem;
  transition: all var(--duration-fast) ease;
}

.quick-link:hover {
  border-color: var(--accent-500);
  background: var(--accent-bg-subtle);
  color: var(--accent-600);
  transform: translateY(-1px);
}

.arrow {
  color: var(--color-text-secondary);
}

.error {
  color: #dc2626;
  font-size: 0.9rem;
}

.composer {
  display: grid;
  gap: 0.6rem;
  padding: 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--surface-glass);
}

textarea {
  width: 100%;
  padding: 0.6rem 0.75rem;
  resize: vertical;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--bg-0);
  color: var(--color-text);
  font: inherit;
}

textarea:focus {
  outline: none;
  border-color: var(--color-border-focus);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.send-btn,
.ghost-btn {
  padding: 0.42rem 1rem;
  border-radius: var(--radius-pill);
  font-size: 0.92rem;
  cursor: pointer;
  transition: all var(--duration-fast) ease;
}

.send-btn {
  border: 1px solid var(--accent-500);
  background: var(--accent-600);
  color: #fff;
}

.send-btn:hover:enabled {
  background: var(--accent-700);
}

.send-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
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

.ghost-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

@media (max-width: 860px) {
  .chat-page {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }

  .conv-list {
    flex-direction: row;
    max-height: none;
    overflow-x: auto;
  }

  .conv-item {
    flex: 0 0 auto;
  }

  .conv-open {
    max-width: 160px;
  }

  .message {
    max-width: 95%;
  }
}
</style>
