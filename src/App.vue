<script setup lang="ts">
import { onMounted, ref } from "vue";

import { fetchAuthStatus, login } from "@/utils/auth";

const checking = ref(true);
const needLogin = ref(false);
const password = ref("");
const submitting = ref(false);
const errorText = ref("");

const load = async () => {
  checking.value = true;
  errorText.value = "";
  try {
    const status = await fetchAuthStatus();
    needLogin.value = status.required && !status.authenticated;
  } catch (error) {
    errorText.value = (error as Error).message;
    needLogin.value = true;
  } finally {
    checking.value = false;
  }
};

const submit = async () => {
  if (!password.value || submitting.value) return;

  submitting.value = true;
  errorText.value = "";
  try {
    await login(password.value);
    needLogin.value = false;
    password.value = "";
  } catch (error) {
    errorText.value = (error as Error).message;
  } finally {
    submitting.value = false;
  }
};

onMounted(load);
</script>

<template>
  <div v-if="checking" class="auth-state">正在验证访问权限…</div>

  <form v-else-if="needLogin" class="auth-gate" @submit.prevent="submit">
    <h1>需要访问口令</h1>
    <p class="auth-tip">本站为私人演示站点，请输入口令后进入。</p>
    <input
      v-model="password"
      type="password"
      placeholder="访问口令"
      autocomplete="current-password"
    />
    <button type="submit" :disabled="submitting || !password">
      {{ submitting ? "验证中…" : "进入" }}
    </button>
    <p v-if="errorText" class="auth-error">{{ errorText }}</p>
  </form>

  <router-view v-else />
</template>

<style scoped>
.auth-state {
  padding: 4rem 0;
  text-align: center;
  color: var(--color-text-secondary);
}

.auth-gate {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: min(360px, 100%);
  margin: 12vh auto 0;
  padding: 2rem;
  background: var(--surface-glass);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.auth-gate h1 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-heading);
}

.auth-tip {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.auth-gate input {
  padding: 0.65rem 0.75rem;
  font-size: 0.95rem;
  color: var(--color-text);
  background: var(--bg-0);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  outline: none;
}

.auth-gate input:focus {
  border-color: var(--color-border-focus);
}

.auth-gate button {
  padding: 0.65rem;
  font-size: 0.95rem;
  color: #fff;
  background: var(--accent-500);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-out);
}

.auth-gate button:hover:not(:disabled) {
  background: var(--accent-600);
}

.auth-gate button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.auth-error {
  margin: 0;
  font-size: 0.85rem;
  color: #dc2626;
}
</style>
