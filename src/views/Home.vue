<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4 py-12">
    <!-- Hero Section -->
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between mb-12">
      <div class="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-down text-gray-800">
          🎉 幸运抽奖 🎉
        </h1>
        <p class="text-xl md:text-2xl mb-8 animate-fade-in-up text-gray-600">
          欢迎大家来玩~
        </p>
        <router-link
            to="/lucky-draw"
            class="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 transform hover:scale-105 animate-pulse"
        >
          立即参与抽奖
        </router-link>
      </div>
      <div class="md:w-1/2 flex justify-center">
        <img src="/新功能预测.svg" alt="Lucky Draw Illustration" class="w-full max-w-md animate-float">
      </div>
    </div>

    <!-- Project Introduction -->
    <div class="w-full max-w-6xl bg-white rounded-xl shadow-2xl p-8 animate-fade-in-up">
      <h2 class="text-4xl font-bold text-center mb-8 text-purple-600">
        关于本项目
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(item, index) in introItems" :key="index"
             class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg"
             :class="{ 'opacity-0 translate-y-10': !item.visible }"
             :ref="el => { if (el) introItemRefs[index] = el }">
          <div class="text-4xl mb-4 text-center">{{ item.emoji }}</div>
          <h3 class="text-xl font-semibold text-purple-700 mb-3 text-center">{{ item.title }}</h3>
          <div class="text-gray-600 break-words leading-relaxed" v-html="parseMarkdown(item.description)"></div>
        </div>
      </div>
    </div>

    <!-- Learn More Button -->
    <button @click="scrollToIntro" class="mt-8 bg-purple-100 text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-200 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
      了解更多项目详情
    </button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      introItems: [
        {
          emoji: '🛠️',
          title: '技术栈',
          description: '采用**前后端分离**架构，基于**DDD**设计。主要技术：**SpringBoot**、**MySQL**、**Redis**、**消息队列**。引入**分库分表**方案，通过**Docker**实现容器化部署。',
          visible: false
        },
        {
          emoji: '📚',
          title: '项目文档',
          description: '详细的[项目文档](https://example.com/documentation)助您快速上手。包含架构设计、API 文档、部署指南等全方位信息。',
          visible: false
        },
        {
          emoji: '😊',
          title: '关于作者',
          description: '本项目由**胡同学**独立开发，旨在探索技术与创意的结合。欢迎交流与建议！\n\n**注意：** 本项目中的奖品均为虚拟，不会实际发放。',
          visible: false
        },
      ],
      introItemRefs: [],
      observer: null,
    }
  },
  mounted() {
    this.setupIntersectionObserver();
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = this.introItemRefs.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              this.introItems[index].visible = true;
            }
          }
        });
      }, { threshold: 0.2 });

      this.$nextTick(() => {
        this.introItemRefs.forEach(ref => {
          if (ref) {
            this.observer.observe(ref);
          }
        });
      });
    },
    parseMarkdown(text) {
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-purple-600">$1</strong>');
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-blue-600 hover:underline">$1</a>');
      text = text.replace(/\n/g, '<br>');
      return text;
    },
    scrollToIntro() {
      const introSection = document.querySelector('.bg-white.rounded-xl');
      if (introSection) {
        introSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
</script>

<style scoped>
@keyframes fade-in-down {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-fade-in-down {
  animation: fade-in-down 1s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.break-words {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>