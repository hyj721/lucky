<template>
  <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
    <div class="p-8 relative">
      <div class="absolute top-4 right-4 bg-yellow-400 text-purple-800 px-4 py-2 rounded-full font-bold text-sm">
        剩余次数: {{ remainingDraws }}
      </div>
      <h2 class="text-4xl font-bold text-center text-purple-600 mb-8">🎊 今日幸运大抽奖 🎊</h2>
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="w-72 h-72 relative mb-8 md:mb-0">
          <div class="w-full h-full rounded-full border-8 border-purple-500 shadow-lg" :style="wheelStyle"></div>
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0
                      border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-yellow-400"></div>
          <div v-if="isSpinning" class="absolute inset-0 flex items-center justify-center">
            <div class="text-3xl animate-bounce">🍀</div>
          </div>
        </div>
        <div class="md:ml-12 text-center md:text-left">
          <p class="text-2xl text-gray-700 mb-6">准备好了吗？点击下方按钮开始您的幸运之旅！</p>
          <button @click="startSpin" :disabled="isSpinning || remainingDraws === 0"
                  class="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold py-4 px-10 rounded-full
                         hover:from-purple-600 hover:to-pink-600 transition duration-300 transform hover:scale-110
                         focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {{ isSpinning ? '抽奖中...' : '🚀 开始抽奖' }}
          </button>
        </div>
      </div>
    </div>
    <div class="bg-purple-100 p-8">
      <h3 class="text-2xl font-bold text-purple-600 mb-6">🏆 精彩奖品</h3>
      <ul class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <li v-for="prize in prizes" :key="prize.id"
            class="bg-white p-4 rounded-xl shadow-md text-center">
          <span class="text-lg font-medium text-purple-600">{{ prize.name }}</span>
          <div class="text-sm text-gray-500 mt-2">获奖概率: {{ prize.probability }}%</div>
        </li>
      </ul>
    </div>
    <div v-if="latestWinner" class="bg-green-100 p-4 mt-4">
      <p class="text-center text-green-800">
        恭喜 <span class="font-bold">{{ latestWinner.name }}</span> 获得了 {{ latestWinner.prize }}！
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'LuckyDrawWheel',
  setup() {
    const rotation = ref(0);
    const isSpinning = ref(false);
    const remainingDraws = ref(3);
    const latestWinner = ref(null);

    const wheelStyle = computed(() => ({
      transform: `rotate(${rotation.value}deg)`,
      transition: isSpinning.value ? 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
      background: 'conic-gradient(#fde68a 0deg 60deg, #fb7185 60deg 120deg, #f472b6 120deg 180deg, #f9a8d4 180deg 240deg, #fbcfe8 240deg 300deg, #f9a8d4 300deg 360deg)'
    }));

    const startSpin = () => {
      if (isSpinning.value || remainingDraws.value === 0) return;
      isSpinning.value = true;
      remainingDraws.value--;
      const randomDegrees = Math.floor(Math.random() * 360) + 720;
      rotation.value += randomDegrees;
      setTimeout(() => {
        isSpinning.value = false;
        // 模拟中奖逻辑
        const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
        latestWinner.value = { name: '幸运用户', prize: randomPrize.name };
      }, 5000);
    };

    const prizes = [
      { id: 1, name: '🥇 特等奖', probability: 1 },
      { id: 2, name: '🥈 一等奖', probability: 5 },
      { id: 3, name: '🥉 二等奖', probability: 10 },
      { id: 4, name: '🎁 三等奖', probability: 20 },
      { id: 5, name: '🎈 四等奖', probability: 30 },
      { id: 6, name: '🍀 幸运奖', probability: 34 },
    ];

    return {
      wheelStyle,
      startSpin,
      prizes,
      isSpinning,
      remainingDraws,
      latestWinner
    };
  }
};
</script>
