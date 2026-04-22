<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { shallowRef } from 'vue'
import { Motion } from 'motion-v'

const MODEL_NAMES = [
  'glm-5',
  'glm-5.1',
  'kimi-k2.5',
  'kimi-k2.6',
  'minimax-m2.5',
  'minimax-m2.7',
] as const

const FREE_MODEL_NAMES = [
  'deepseek-v3.2-free',
  'glm-4.7-free',
  'step-3.5-flash-free',
  'kimi-k2-free',
  'glm-4.5-air',
  'nemotron-3-super',
  'arcee-trinity-free',
] as const

const selectedModel = shallowRef<string>(MODEL_NAMES[0])
const copiedModelName = shallowRef<string | null>(null)
const copiedFreeModelName = shallowRef<string | null>(null)
const copiedEnv = shallowRef(false)

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

async function copyModelName(model: string) {
  const success = await copyToClipboard(model)
  if (success) {
    copiedModelName.value = model
    setTimeout(() => {
      copiedModelName.value = null
    }, 1500)
  }
}

async function copyFreeModelName(model: string) {
  const success = await copyToClipboard(model)
  if (success) {
    copiedFreeModelName.value = model
    setTimeout(() => {
      copiedFreeModelName.value = null
    }, 1500)
  }
}

async function copyEnvVars() {
  const envText = `export ANTHROPIC_BASE_URL="https://coder.guygubaby.top"
export ANTHROPIC_AUTH_TOKEN="你的令牌"
export ANTHROPIC_MODEL="${selectedModel.value}"`

  const success = await copyToClipboard(envText)
  if (success) {
    copiedEnv.value = true
    setTimeout(() => {
      copiedEnv.value = false
    }, 1500)
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#FFF8F3] text-[#3D2C2C] flex flex-col">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#D97757]/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <RouterLink to="/" class="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#D97757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="text-lg font-extrabold text-[#3D2C2C]">Coder</span>
          </RouterLink>

          <div class="flex items-center gap-1">
            <RouterLink to="/guide" class="px-4 py-2 rounded-xl text-sm font-semibold text-[#D97757] bg-[#D97757]/5">
              使用说明
            </RouterLink>
            <a href="https://coder.guygubaby.top" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 text-[#6B5044] hover:text-[#D97757] hover:bg-[#D97757]/5 inline-flex items-center gap-1">
              官网链接
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1">
      <div class="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <!-- 使用方式 -->
        <section class="mb-8">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-1 h-6 bg-[#D97757] rounded"></span>
            <h2 class="text-xl font-semibold text-[#3D2C2C]">使用方式</h2>
          </div>
          <p class="text-[#6B5044] text-sm">您可以在配置文件中指定模型，点击下方模型标签可切换当前选中项，并复制对应名称。</p>
        </section>

        <div class="grid gap-6 lg:grid-cols-2">
          <!-- 模型选择 -->
          <div class="bg-white rounded-2xl shadow-sm border border-[#D97757]/10 overflow-hidden">
            <div class="border-b border-[#D97757]/10 px-5 py-4">
              <h3 class="text-base font-semibold text-[#3D2C2C]">选择模型</h3>
              <p class="text-sm text-[#6B5044] mt-1">点击复制模型名称，选中后可在右侧查看环境变量配置</p>
            </div>
            <div class="flex flex-wrap gap-3 p-5">
              <div
                v-for="model in MODEL_NAMES"
                :key="model"
                class="relative"
              >
                <!-- 选中背景动画 -->
                <Motion
                  v-if="selectedModel === model"
                  layoutId="model-bg"
                  class="absolute inset-0 bg-[#D97757] rounded-xl shadow-md"
                  :transition="{ type: 'spring', stiffness: 500, damping: 35 }"
                />
                <button
                  @click="selectedModel = model"
                  class="relative px-4 py-2 pr-10 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                  :class="selectedModel === model ? 'text-white' : 'bg-[#D97757]/5 text-[#3D2C2C] hover:bg-[#D97757]/10'"
                >
                  {{ model }}
                </button>
                <button
                  @click.stop="copyModelName(model)"
                  class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded transition-all"
                  :class="copiedModelName === model ? 'text-green-500' : selectedModel === model ? 'text-white/70 hover:text-white' : 'text-[#6B5044]/50 hover:text-[#6B5044]'"
                  title="复制模型名"
                >
                  <svg v-if="copiedModelName !== model" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- 环境变量配置 -->
          <div class="bg-white rounded-2xl shadow-sm border border-[#D97757]/10 overflow-hidden">
            <div class="border-b border-[#D97757]/10 px-5 py-4">
              <h3 class="text-base font-semibold text-[#3D2C2C]">环境变量配置</h3>
              <p class="text-sm text-[#6B5044] mt-1">复制以下环境变量到您的配置文件中</p>
              <a
                href="https://coder.guygubaby.top/console/token"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-sm text-[#D97757] hover:underline mt-2"
              >
                <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                获取您的令牌
              </a>
            </div>
            <div class="relative">
              <pre class="bg-[#FFF8F3] p-5 text-sm text-[#3D2C2C] overflow-x-auto"><code>export ANTHROPIC_BASE_URL="https://coder.guygubaby.top"
export ANTHROPIC_AUTH_TOKEN="你的令牌"
export ANTHROPIC_MODEL="{{ selectedModel }}"</code></pre>
              <button
                @click="copyEnvVars"
                class="absolute bottom-3 right-3 p-2 rounded-lg transition-all"
                :class="copiedEnv ? 'bg-green-500 text-white' : 'bg-white text-[#6B5044] hover:bg-[#D97757]/10'"
              >
                <svg v-if="!copiedEnv" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 免费模型 -->
        <section class="mt-8 mb-8">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-1 h-6 bg-[#D97757] rounded"></span>
            <h2 class="text-xl font-semibold text-[#3D2C2C]">新增免费模型</h2>
          </div>
          <p class="text-[#6B5044] text-sm">Open Claw、Hermes Agent 必备</p>
        </section>

        <div class="bg-white rounded-2xl shadow-sm border border-[#D97757]/10 overflow-hidden">
          <div class="flex flex-wrap gap-3 p-5">
            <div
              v-for="model in FREE_MODEL_NAMES"
              :key="model"
              class="relative group"
            >
              <button
                @click="copyFreeModelName(model)"
                class="relative px-4 py-2 pr-10 rounded-xl text-sm font-medium transition-all cursor-pointer bg-[#D97757]/5 text-[#3D2C2C] hover:bg-[#D97757]/10"
              >
                {{ model }}
              </button>
              <button
                class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded transition-all"
                :class="copiedFreeModelName === model ? 'text-green-500' : 'text-[#6B5044]/50 group-hover:text-[#6B5044]'"
                title="复制模型名"
              >
                <svg v-if="copiedFreeModelName !== model" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>

          <div class="border-t border-[#D97757]/10 px-5 py-4 bg-[#D97757]/5">
            <p class="text-sm text-[#6B5044]">
              <span class="text-[#D97757] font-medium">提示：</span>
              免费模型可能因算力原因不可用或延迟较高。
            </p>
            <p class="text-sm text-[#6B5044] mt-2">
              可使用 <code class="px-1.5 py-0.5 bg-white rounded text-[#D97757] font-mono text-xs">any-free</code> 或
              <code class="px-1.5 py-0.5 bg-white rounded text-[#D97757] font-mono text-xs">kilo-free</code> 模型自动选择可用免费模型。
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
