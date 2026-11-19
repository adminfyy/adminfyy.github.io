<script setup lang="ts">
import { onMounted, ref } from "vue";

import { fetchAuthStatus, login } from "@/utils/auth";

const checking = ref(true);
const needLogin = ref(false);
const password = ref("");
const showPassword = ref(false);
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
  <div v-if="checking" class="auth-state">
    <span class="spinner"></span>
    正在验证访问权限…
  </div>

  <form v-else-if="needLogin" class="auth-page" @submit.prevent="submit">
    <div class="auth-card">
      <div class="auth-brand">
        <span class="auth-logo">AI</span>
        <div>
          <p class="auth-eyebrow">TECH CHANGES LIFE</p>
          <p class="auth-site">技术改变生活</p>
        </div>
      </div>

      <h1>需要访问口令</h1>
      <p class="auth-tip">本站为私人演示站点，请输入口令后进入。</p>

      <div class="auth-field">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="访问口令"
          autocomplete="current-password"
          autofocus
          :disabled="submitting"
        />
        <button
          class="auth-toggle"
          type="button"
          tabindex="-1"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? "隐藏" : "显示" }}
        </button>
      </div>

      <button
        class="auth-submit"
        type="submit"
        :disabled="submitting || !password"
      >
        <span v-if="submitting" class="spinner light"></span>
        {{ submitting ? "验证中…" : "进入" }}
      </button>

      <p v-if="errorText" class="auth-error">{{ errorText }}</p>
    </div>
  </form>

  <router-view v-else />
</template>

<style scoped>
.auth-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 6rem 0;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.auth-page {
  display: flex;
  justify-content: center;
  padding: clamp(3rem, 12vh, 7rem) 0 2rem;
  animation: auth-in 0.4s var(--ease-out) both;
}

.auth-card {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: min(380px, 100%);
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--surface-glass);
  box-shadow: var(--shadow-xl);
  backdrop-filter: blur(12px);
}

.auth-brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid var(--color-border);
}

.auth-logo {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--accent-500), #7c3aed);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.28);
}

.auth-eyebrow {
  margin: 0;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--color-text-secondary);
}

.auth-site {
  margin: 0.1rem 0 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-heading);
}

.auth-card h1 {
  margin: 0.6rem 0 0;
  font-size: 1.35rem;
  color: var(--color-heading);
}

.auth-tip {
  margin: 0 0 0.3rem;
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.auth-field {
  position: relative;
}

.auth-field input {
  width: 100%;
  padding: 0.7rem 3.6rem 0.7rem 0.85rem;
  font-size: 0.95rem;
  color: var(--color-text);
  background: var(--bg-0);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  outline: none;
  transition: border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.auth-field input:focus {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 4px var(--accent-bg-subtle);
}

.auth-toggle {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  padding: 0.2rem 0.35rem;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.78rem;
  cursor: pointer;
  transform: translateY(-50%);
}

.auth-toggle:hover {
  color: var(--accent-600);
}

.auth-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.7rem;
  margin-top: 0.2rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(135deg, var(--accent-600), #6d28d9);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.auth-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.28);
}

.auth-submit:disabled {
  cursor: not-allowed;
  opacity: 0.55;
  box-shadow: none;
}

.auth-error {
  margin: 0;
  padding: 0.5rem 0.7rem;
  font-size: 0.82rem;
  color: #b91c1c;
  background: rgba(220, 38, 38, 0.06);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: var(--radius-sm);
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--color-border);
  border-top-color: var(--accent-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner.light {
  border-color: rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes auth-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
