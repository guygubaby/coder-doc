<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { shallowRef } from 'vue'
import { motion, Motion } from 'motion-v'

const MODEL_NAMES = [
  'glm-5',
  'glm-5.1',
  'kimi-k2.5',
  'kimi-k2.6',
  'minimax-m2.5',
  'minimax-m2.7',
  'deepseek-v4-flash',
  'deepseek-v4-pro',
  'mimo-v2.5-pro',
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
  const envText = `export ANTHROPIC_BASE_URL="http://520qq.cn:4000"
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
    <!-- 优惠公告 -->
    <div class="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-[#D97757] to-[#E8956E] text-white">
      <div class="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2 text-sm">
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
        <span class="font-medium">限时优惠：全场模型现已开启 0.5 倍费率，新用户注册即享超值体验</span>
        <a
          href="http://520qq.cn:4000"
          target="_blank"
          rel="noopener noreferrer"
          class="ml-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-semibold transition-colors"
        >
          立即注册
        </a>
      </div>
    </div>

    <!-- Navbar -->
    <nav class="sticky top-10 z-50 bg-white/80 backdrop-blur-md border-b border-[#D97757]/10">
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
            <motion.a
              href="http://520qq.cn:4000"
              target="_blank"
              rel="noopener noreferrer"
              :while-hover="{ scale: 1.05 }"
              :while-press="{ scale: 0.95 }"
              class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 text-[#6B5044] hover:text-[#D97757] hover:bg-[#D97757]/5 inline-flex items-center gap-1"
            >
              官网链接
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1 pt-10">
      <div class="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <!-- 使用方式 -->
        <section class="mb-8">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="w-1 h-6 bg-[#D97757] rounded"></span>
              <h2 class="text-xl font-semibold text-[#3D2C2C]">使用方式</h2>
            </div>
            <RouterLink to="/tutorial" class="text-sm text-[#D97757] hover:underline inline-flex items-center gap-1">
              查看详细教程
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>
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
                <motion.button
                  @click="selectedModel = model"
                  :while-hover="{ scale: 1.03 }"
                  :while-press="{ scale: 0.97 }"
                  class="relative px-4 py-2 pr-10 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                  :class="selectedModel === model ? 'text-white' : 'bg-[#D97757]/5 text-[#3D2C2C] hover:bg-[#D97757]/10'"
                >
                  {{ model }}
                </motion.button>
                <motion.button
                  @click.stop="copyModelName(model)"
                  :while-hover="{ scale: 1.1 }"
                  :while-press="{ scale: 0.9 }"
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
                </motion.button>
              </div>
            </div>
          </div>

          <!-- 环境变量配置 -->
          <div class="bg-white rounded-2xl shadow-sm border border-[#D97757]/10 overflow-hidden">
            <div class="border-b border-[#D97757]/10 px-5 py-4">
              <h3 class="text-base font-semibold text-[#3D2C2C]">环境变量配置</h3>
              <p class="text-sm text-[#6B5044] mt-1">复制以下环境变量到您的配置文件中</p>
              <motion.a
                href="http://520qq.cn:4000/console/token"
                target="_blank"
                rel="noopener noreferrer"
                :while-hover="{ scale: 1.02 }"
                :while-press="{ scale: 0.98 }"
                class="inline-flex items-center text-sm text-[#D97757] hover:underline mt-2"
              >
                <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                获取您的令牌
              </motion.a>
            </div>
            <div class="relative">
              <pre class="bg-[#FFF8F3] p-5 text-sm text-[#3D2C2C] overflow-x-auto"><code>export ANTHROPIC_BASE_URL="http://520qq.cn:4000"
export ANTHROPIC_AUTH_TOKEN="你的令牌"
export ANTHROPIC_MODEL="{{ selectedModel }}"</code></pre>
              <motion.button
                @click="copyEnvVars"
                :while-hover="{ scale: 1.1 }"
                :while-press="{ scale: 0.9 }"
                class="absolute bottom-3 right-3 p-2 rounded-lg transition-all"
                :class="copiedEnv ? 'bg-green-500 text-white' : 'bg-white text-[#6B5044] hover:bg-[#D97757]/10'"
              >
                <svg v-if="!copiedEnv" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        <!-- 免费模型 -->
        <section class="mt-8 mb-8">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-1 h-6 bg-[#D97757] rounded"></span>
            <h2 class="text-xl font-semibold text-[#3D2C2C]">更有免费模型</h2>
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
              <motion.button
                @click="copyFreeModelName(model)"
                :while-hover="{ scale: 1.03 }"
                :while-press="{ scale: 0.97 }"
                class="relative px-4 py-2 pr-10 rounded-xl text-sm font-medium transition-all cursor-pointer bg-[#D97757]/5 text-[#3D2C2C] hover:bg-[#D97757]/10"
              >
                {{ model }}
              </motion.button>
              <motion.button
                :while-hover="{ scale: 1.1 }"
                :while-press="{ scale: 0.9 }"
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
              </motion.button>
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

        <!-- 充值流程 -->
        <section class="mt-8 mb-8">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-1 h-6 bg-[#D97757] rounded"></span>
            <h2 class="text-xl font-semibold text-[#3D2C2C]">充值流程</h2>
          </div>
          <p class="text-[#6B5044] text-sm">目前暂时只能用兑换码充值</p>
        </section>

        <div class="bg-white rounded-2xl shadow-sm border border-[#D97757]/10 overflow-hidden">
          <div class="p-5 space-y-4">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-[#D97757]/10 text-[#D97757] flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p class="text-[#3D2C2C] font-medium">进入个人中心-钱包管理</p>
                <motion.a
                  href="http://520qq.cn:4000/console/topup"
                  target="_blank"
                  rel="noopener noreferrer"
                  :while-hover="{ scale: 1.02 }"
                  :while-press="{ scale: 0.98 }"
                  class="inline-flex items-center text-sm text-[#D97757] hover:underline mt-1"
                >
                  <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  点击前往充值页面
                </motion.a>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-[#D97757]/10 text-[#D97757] flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p class="text-[#3D2C2C] font-medium">点击购买兑换码即可跳转</p>
                <motion.a
                  href="https://pay.ldxp.cn/shop/T962P0JF/5ryr7b"
                  target="_blank"
                  rel="noopener noreferrer"
                  :while-hover="{ scale: 1.02 }"
                  :while-press="{ scale: 0.98 }"
                  class="inline-flex items-center text-sm text-[#D97757] hover:underline mt-1"
                >
                  <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  点击前往小铺购买
                </motion.a>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-[#D97757]/10 text-[#D97757] flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p class="text-[#3D2C2C] font-medium">购买后可得到兑换码，返回系统使用兑换码进行兑换即可</p>
              </div>
            </div>
          </div>

          <div class="border-t border-[#D97757]/10 px-5 py-4 bg-[#D97757]/5">
            <p class="text-sm text-[#6B5044]">
              <span class="text-[#D97757] font-medium">客服微信：</span>
              <code class="px-1.5 py-0.5 bg-white rounded text-[#D97757] font-mono text-xs">guygubaby</code>
              有任何疑问可随时联系
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
