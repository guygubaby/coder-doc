<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { motion } from 'motion-v'
</script>

<template>
  <div class="min-h-screen bg-[#FFF8F3] text-[#3D2C2C] flex flex-col">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#D97757]/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#D97757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="text-lg font-extrabold text-[#3D2C2C]">Coder</span>
          </RouterLink>

          <!-- Nav Links -->
          <div class="flex items-center gap-1">
            <RouterLink to="/guide" class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 text-[#6B5044] hover:text-[#D97757] hover:bg-[#D97757]/5">
              使用说明
            </RouterLink>
            <a
              href="https://coder.guygubaby.top" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 text-[#6B5044] hover:text-[#D97757] hover:bg-[#D97757]/5 inline-flex items-center gap-1">
              官网链接
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="flex-1">
      <!-- Hero -->
      <section class="py-20 lg:py-32">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl lg:text-6xl font-extrabold text-[#3D2C2C] mb-6">
            Coding Plan <span class="text-[#D97757]">中转站</span>
          </h1>
          <p class="text-lg text-[#6B5044] mb-12 max-w-2xl mx-auto">
            支持 GLM (glm-5.1、glm-5)、MiniMax (minimax-m2.7、minimax-m2.5)、Kimi (kimi-k2.6、kimi-k2.5) 等主流国产 AI 模型 API 中转，为开发者提供稳定高效的编程助手服务
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
            :while-hover="{scale: 1.05}"
            :while-press="{scale: 0.95}"
             href="https://coder.guygubaby.top/register" target="_blank" rel="noopener noreferrer" class="px-8 py-3 bg-[#D97757] text-white font-bold rounded-xl cursor-pointer hover:bg-[#C86946] transition-colors inline-flex items-center gap-2">
              立即注册
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
            <motion.a
              href="#features"
              :while-hover="{ scale: 1.05 }"
              :while-press="{ scale: 0.95 }"
              class="px-8 py-3 bg-white text-[#6B5044] font-bold rounded-xl border-2 border-[#D97757]/20 cursor-pointer hover:bg-[#D97757]/5 transition-colors"
            >
              了解更多
            </motion.a>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section id="features" class="py-20">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl lg:text-4xl font-extrabold text-[#3D2C2C] mb-6">为什么选择我们</h2>
            <p class="text-lg text-[#6B5044] max-w-2xl mx-auto">三大核心优势，助力您的AI开发之旅</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- 智能高效 -->
            <div class="bg-white rounded-2xl p-8 shadow-sm border border-[#D97757]/10 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-[#D97757]/10">
                <svg class="w-6 h-6 text-[#D97757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-[#3D2C2C] mb-4">智能高效</h3>
              <p class="text-[#6B5044]">聚合 腾讯、阿里、智普、火山引擎 等国内大厂 Coding Plan 渠道，智能分配调用渠道，保持高效快速</p>
            </div>

            <!-- 稳定可靠 -->
            <div class="bg-white rounded-2xl p-8 shadow-sm border border-[#D97757]/10 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-[#D97757]/10">
                <svg class="w-6 h-6 text-[#D97757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-[#3D2C2C] mb-4">稳定可靠</h3>
              <p class="text-[#6B5044]">企业级 API 中转服务，端到端加密保护，确保 AI 编程工具的稳定连接与数据安全</p>
            </div>

            <!-- 灵活易用 -->
            <div class="bg-white rounded-2xl p-8 shadow-sm border border-[#D97757]/10 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-[#D97757]/10">
                <svg class="w-6 h-6 text-[#D97757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-[#3D2C2C] mb-4">灵活易用</h3>
              <p class="text-[#6B5044]">兼容 OpenAI API 格式，轻松接入各类 AI 编程工具，无缝集成到现有开发流程</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-20">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl lg:text-4xl font-extrabold text-[#3D2C2C] mb-6">
            开启 <span class="text-[#D97757]">无限可能</span>
          </h2>
          <p class="text-lg text-[#6B5044] mb-8 max-w-2xl mx-auto">
            <a href="https://coder.guygubaby.top/register" target="_blank" rel="noopener noreferrer" class="text-[#D97757] hover:underline inline-flex items-center">
              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              免费注册
            </a>即可获得 100 次调用体验，每日签到持续领取额度。按次计费透明清晰，单次一分钱，不再为 token 用量焦虑。
          </p>
          <motion.a
            href="https://coder.guygubaby.top/register"
            target="_blank"
            rel="noopener noreferrer"
            :while-hover="{ scale: 1.05 }"
            :while-press="{ scale: 0.95 }"
            class="inline-flex items-center gap-2 px-8 py-3 bg-[#D97757] text-white font-bold rounded-xl cursor-pointer hover:bg-[#C86946] transition-colors"
          >
            立即注册
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
          <div class="mt-8 flex items-center justify-center flex-wrap gap-6 text-sm text-[#8B7355]">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-[#D97757]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>无需抢购</span>
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-[#D97757]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>稳定可靠</span>
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-[#D97757]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>即时开始</span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t-2 border-[#D97757]/10 bg-white/60 backdrop-blur-sm mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#D97757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="text-sm text-[#8B7355] font-medium">Coder © 2026</span>
          </div>
          <span class="text-xs text-[#8B7355]/60">Powered by Coder</span>
        </div>
      </div>
    </footer>
  </div>
</template>
