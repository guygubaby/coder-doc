<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { shallowRef, computed, onMounted, watch, nextTick } from 'vue'
import { motion, Motion } from 'motion-v'
import { marked } from 'marked'

const PAID_MODEL_NAMES = [
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

const selectedModel = shallowRef<string>(PAID_MODEL_NAMES[0])
const copiedModelName = shallowRef<string | null>(null)
const copiedCodeBlock = shallowRef<string | null>(null)

// Custom renderer for code blocks with copy button
const renderer = new marked.Renderer()
const originalCodeRenderer = renderer.code.bind(renderer)
renderer.code = (code: string, language: string | undefined) => {
  const codeId = `code-${Math.random().toString(36).substr(2, 9)}`
  const html = originalCodeRenderer(code, language)
  return `<div class="code-block-wrapper" data-code="${encodeURIComponent(code)}">
    <button class="code-copy-btn" data-code-id="${codeId}" title="复制代码">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    </button>
    ${html}
  </div>`
}
marked.setOptions({ renderer })

const tutorialMarkdown = computed(() => `
以下是 Windows、macOS 和 Linux 系统下设置环境变量的详细方法：

## Windows 系统

### 方法1：配置 settings.json

创建 \`~/.claude/settings.json\` 文件，内容如下：

\`\`\`json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "替换为您的API Key",
    "ANTHROPIC_BASE_URL": "https://coder.guygubaby.top",
    "ANTHROPIC_MODEL": "${selectedModel.value}",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "${selectedModel.value}",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "${selectedModel.value}",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "${selectedModel.value}",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  },
  "permissions": {
    "allow": [],
    "deny": []
  }
}
\`\`\`

VS Code 中插件使用，创建文件 \`~/.claude/config.json\`：

\`\`\`json
{
  "primaryApiKey": "替换为您的API Key"
}
\`\`\`

### 方法2：临时设置（仅当前终端有效）

在 PowerShell 或 CMD 中执行：

\`\`\`powershell
# PowerShell
$env:ANTHROPIC_BASE_URL="https://coder.guygubaby.top"
$env:ANTHROPIC_AUTH_TOKEN="替换为您的API Key"
$env:ANTHROPIC_MODEL="${selectedModel.value}"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="${selectedModel.value}"
$env:ANTHROPIC_DEFAULT_SONNET_MODEL="${selectedModel.value}"
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL="${selectedModel.value}"

# CMD
set ANTHROPIC_BASE_URL=https://coder.guygubaby.top
set ANTHROPIC_AUTH_TOKEN=替换为您的API Key
set ANTHROPIC_MODEL=${selectedModel.value}
set ANTHROPIC_DEFAULT_OPUS_MODEL=${selectedModel.value}
set ANTHROPIC_DEFAULT_SONNET_MODEL=${selectedModel.value}
set ANTHROPIC_DEFAULT_HAIKU_MODEL=${selectedModel.value}
\`\`\`

### 方法3：永久设置（全局生效）

**图形界面：**

1. 右键「此电脑」→「属性」→「高级系统设置」→「环境变量」
2. 在「用户变量」或「系统变量」中新建：
   - 变量名：\`ANTHROPIC_BASE_URL\`
   - 变量值：\`https://coder.guygubaby.top\`
3. 同样方法添加 \`ANTHROPIC_AUTH_TOKEN\`、\`ANTHROPIC_MODEL\`、\`ANTHROPIC_DEFAULT_OPUS_MODEL\`、\`ANTHROPIC_DEFAULT_SONNET_MODEL\`、\`ANTHROPIC_DEFAULT_HAIKU_MODEL\`

**PowerShell 永久设置：**

\`\`\`powershell
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', 'https://coder.guygubaby.top', 'User')
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_AUTH_TOKEN', '替换为您的API Key', 'User')
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_MODEL', '${selectedModel.value}', 'User')
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_DEFAULT_OPUS_MODEL', '${selectedModel.value}', 'User')
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_DEFAULT_SONNET_MODEL', '${selectedModel.value}', 'User')
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_DEFAULT_HAIKU_MODEL', '${selectedModel.value}', 'User')
\`\`\`

重启终端后生效。

---

## macOS 系统

### 方法1：配置 settings.json

创建 \`~/.claude/settings.json\` 文件，内容如下：

\`\`\`json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "替换为您的API Key",
    "ANTHROPIC_BASE_URL": "https://coder.guygubaby.top",
    "ANTHROPIC_MODEL": "${selectedModel.value}",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "${selectedModel.value}",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "${selectedModel.value}",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "${selectedModel.value}",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  },
  "permissions": {
    "allow": [],
    "deny": []
  }
}
\`\`\`

VS Code 中插件使用，创建文件 \`~/.claude/config.json\`：

\`\`\`json
{
  "primaryApiKey": "替换为您的API Key"
}
\`\`\`

### 方法2：临时设置（仅当前终端有效）

在终端中执行：

\`\`\`bash
export ANTHROPIC_BASE_URL="https://coder.guygubaby.top"
export ANTHROPIC_AUTH_TOKEN="替换为您的API Key"
export ANTHROPIC_MODEL="${selectedModel.value}"
export ANTHROPIC_DEFAULT_OPUS_MODEL="${selectedModel.value}"
export ANTHROPIC_DEFAULT_SONNET_MODEL="${selectedModel.value}"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="${selectedModel.value}"
\`\`\`

### 方法3：永久设置

编辑 shell 配置文件（根据使用的 shell 选择）：

\`\`\`bash
# 如果是 bash（默认）
echo 'export ANTHROPIC_BASE_URL="https://coder.guygubaby.top"' >> ~/.bash_profile
echo 'export ANTHROPIC_AUTH_TOKEN="替换为您的API Key"' >> ~/.bash_profile
echo 'export ANTHROPIC_MODEL="${selectedModel.value}"' >> ~/.bash_profile
echo 'export ANTHROPIC_DEFAULT_OPUS_MODEL="${selectedModel.value}"' >> ~/.bash_profile
echo 'export ANTHROPIC_DEFAULT_SONNET_MODEL="${selectedModel.value}"' >> ~/.bash_profile
echo 'export ANTHROPIC_DEFAULT_HAIKU_MODEL="${selectedModel.value}"' >> ~/.bash_profile

# 如果是 zsh
echo 'export ANTHROPIC_BASE_URL="https://coder.guygubaby.top"' >> ~/.zshrc
echo 'export ANTHROPIC_AUTH_TOKEN="替换为您的API Key"' >> ~/.zshrc
echo 'export ANTHROPIC_MODEL="${selectedModel.value}"' >> ~/.zshrc
echo 'export ANTHROPIC_DEFAULT_OPUS_MODEL="${selectedModel.value}"' >> ~/.zshrc
echo 'export ANTHROPIC_DEFAULT_SONNET_MODEL="${selectedModel.value}"' >> ~/.zshrc
echo 'export ANTHROPIC_DEFAULT_HAIKU_MODEL="${selectedModel.value}"' >> ~/.zshrc
\`\`\`

立即生效：

\`\`\`bash
source ~/.bash_profile  # 或 source ~/.zshrc
\`\`\`

---

## Linux 系统

### 方法1：配置 settings.json

创建 \`~/.claude/settings.json\` 文件，内容如下：

\`\`\`json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "替换为您的API Key",
    "ANTHROPIC_BASE_URL": "https://coder.guygubaby.top",
    "ANTHROPIC_MODEL": "${selectedModel.value}",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "${selectedModel.value}",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "${selectedModel.value}",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "${selectedModel.value}",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  },
  "permissions": {
    "allow": [],
    "deny": []
  }
}
\`\`\`

### 方法2：临时设置（仅当前终端有效）

在终端中执行：

\`\`\`bash
export ANTHROPIC_BASE_URL="https://coder.guygubaby.top"
export ANTHROPIC_AUTH_TOKEN="替换为您的API Key"
export ANTHROPIC_MODEL="${selectedModel.value}"
export ANTHROPIC_DEFAULT_OPUS_MODEL="${selectedModel.value}"
export ANTHROPIC_DEFAULT_SONNET_MODEL="${selectedModel.value}"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="${selectedModel.value}"
\`\`\`

### 方法3：永久设置

编辑 shell 配置文件（根据使用的 shell 选择）：

\`\`\`bash
# 如果是 bash
echo 'export ANTHROPIC_BASE_URL="https://coder.guygubaby.top"' >> ~/.bashrc
echo 'export ANTHROPIC_AUTH_TOKEN="替换为您的API Key"' >> ~/.bashrc
echo 'export ANTHROPIC_MODEL="${selectedModel.value}"' >> ~/.bashrc
echo 'export ANTHROPIC_DEFAULT_OPUS_MODEL="${selectedModel.value}"' >> ~/.bashrc
echo 'export ANTHROPIC_DEFAULT_SONNET_MODEL="${selectedModel.value}"' >> ~/.bashrc
echo 'export ANTHROPIC_DEFAULT_HAIKU_MODEL="${selectedModel.value}"' >> ~/.bashrc

# 如果是 zsh
echo 'export ANTHROPIC_BASE_URL="https://coder.guygubaby.top"' >> ~/.zshrc
echo 'export ANTHROPIC_AUTH_TOKEN="替换为您的API Key"' >> ~/.zshrc
echo 'export ANTHROPIC_MODEL="${selectedModel.value}"' >> ~/.zshrc
echo 'export ANTHROPIC_DEFAULT_OPUS_MODEL="${selectedModel.value}"' >> ~/.zshrc
echo 'export ANTHROPIC_DEFAULT_SONNET_MODEL="${selectedModel.value}"' >> ~/.zshrc
echo 'export ANTHROPIC_DEFAULT_HAIKU_MODEL="${selectedModel.value}"' >> ~/.zshrc
\`\`\`

立即生效：

\`\`\`bash
source ~/.bashrc  # 或 source ~/.zshrc
\`\`\`

---

## 通用验证方法

在所有系统中，可以通过以下命令验证是否设置成功：

\`\`\`bash
# macOS/Linux
echo $ANTHROPIC_BASE_URL
echo $ANTHROPIC_AUTH_TOKEN
echo $ANTHROPIC_MODEL

# Windows PowerShell
echo $env:ANTHROPIC_BASE_URL
echo $env:ANTHROPIC_AUTH_TOKEN
echo $env:ANTHROPIC_MODEL

# Windows CMD
echo %ANTHROPIC_BASE_URL%
echo %ANTHROPIC_AUTH_TOKEN%
echo %ANTHROPIC_MODEL%
\`\`\`
`)

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

function setupCodeCopyButtons() {
  document.querySelectorAll('.code-copy-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const target = e.currentTarget as HTMLElement
      const wrapper = target.closest('.code-block-wrapper')
      if (!wrapper) return

      const code = decodeURIComponent(wrapper.getAttribute('data-code') || '')
      const success = await copyToClipboard(code)

      if (success) {
        target.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>`
        target.classList.add('copied')

        setTimeout(() => {
          target.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>`
          target.classList.remove('copied')
        }, 1500)
      }
    })
  })
}

onMounted(() => {
  nextTick(() => {
    setupCodeCopyButtons()
  })
})

watch(selectedModel, () => {
  nextTick(() => {
    setupCodeCopyButtons()
  })
})
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
            <motion.a
              href="https://coder.guygubaby.top"
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

    <main class="flex-1">
      <div class="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <!-- 模型选择 -->
        <section class="mb-8">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-1 h-6 bg-[#D97757] rounded"></span>
            <h2 class="text-xl font-semibold text-[#3D2C2C]">模型选择</h2>
          </div>
          <p class="text-[#6B5044] text-sm">点击复制模型名称，在环境变量中设置 ANTHROPIC_MODEL 即可使用。</p>
        </section>

        <div class="grid gap-6 lg:grid-cols-2 mb-8">
          <!-- 付费模型 -->
          <div class="bg-white rounded-2xl shadow-sm border border-[#D97757]/10 overflow-hidden">
            <div class="border-b border-[#D97757]/10 px-5 py-4">
              <h3 class="text-base font-semibold text-[#3D2C2C]">付费模型</h3>
              <p class="text-sm text-[#6B5044] mt-1">按次计费，单次一分钱</p>
            </div>
            <div class="flex flex-wrap gap-3 p-5">
              <div
                v-for="model in PAID_MODEL_NAMES"
                :key="model"
                class="relative"
              >
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

          <!-- 免费模型 -->
          <div class="bg-white rounded-2xl shadow-sm border border-[#D97757]/10 overflow-hidden">
            <div class="border-b border-[#D97757]/10 px-5 py-4">
              <h3 class="text-base font-semibold text-[#3D2C2C]">免费模型</h3>
              <p class="text-sm text-[#6B5044] mt-1">Open Claw、Hermes Agent 必备</p>
            </div>
            <div class="flex flex-wrap gap-3 p-5">
              <div
                v-for="model in FREE_MODEL_NAMES"
                :key="model"
                class="relative"
              >
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
            <div class="border-t border-[#D97757]/10 px-5 py-3 bg-[#D97757]/5">
              <p class="text-xs text-[#6B5044]">
                可使用 <code class="px-1 py-0.5 bg-white rounded text-[#D97757] font-mono">any-free</code> 或
                <code class="px-1 py-0.5 bg-white rounded text-[#D97757] font-mono">kilo-free</code> 自动选择可用免费模型
              </p>
            </div>
          </div>
        </div>

        <!-- 环境变量设置教程 -->
        <section class="mb-8">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-1 h-6 bg-[#D97757] rounded"></span>
            <h2 class="text-xl font-semibold text-[#3D2C2C]">环境变量设置教程</h2>
          </div>
        </section>

        <div class="bg-white rounded-2xl shadow-sm border border-[#D97757]/10 overflow-hidden">
          <article class="prose max-w-none! p-6" v-html="marked(tutorialMarkdown)"></article>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.prose h2 {
  color: #3D2C2C;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(217, 119, 87, 0.2);
}

.prose h3 {
  color: #3D2C2C;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose p {
  color: #6B5044;
  margin-bottom: 0.75rem;
}

.prose code {
  background-color: #FFF8F3;
  color: #D97757;
  padding: 0.15em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.prose pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
}

.prose ol, .prose ul {
  color: #6B5044;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose strong {
  color: #3D2C2C;
  font-weight: 600;
}

.prose hr {
  border-color: rgba(217, 119, 87, 0.2);
  margin: 2rem 0;
}

.code-block-wrapper {
  position: relative;
}

.code-copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #9ca3af;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.code-block-wrapper:hover .code-copy-btn {
  opacity: 1;
}

.code-copy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.code-copy-btn.copied {
  color: #22c55e;
}
</style>
