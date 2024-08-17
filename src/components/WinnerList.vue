<template>
  <div class="bg-white p-4 rounded-xl shadow-md h-72 overflow-hidden">
    <h3 class="text-2xl font-bold text-purple-600 mb-4 text-center">🎉 最新中奖用户</h3>
    <div class="relative h-full">
      <ul class="absolute w-full transition-transform duration-500" :style="scrollStyle">
        <li v-for="(winner, index) in winners" :key="index" class="mb-2">
          <span class="text-lg font-medium text-purple-600">{{ winner.name }}</span>
          <span class="text-sm text-gray-500 ml-2">获得 {{ winner.prize }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'WinnerList',
  props: {
    winners: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const currentIndex = ref(0);

    const scrollStyle = computed(() => ({
      transform: `translateY(-${currentIndex.value * 100}%)`,
    }));

    const scrollWinners = () => {
      currentIndex.value = (currentIndex.value + 1) % props.winners.length;
    };

    onMounted(() => {
      setInterval(scrollWinners, 3000);
    });

    return {
      scrollStyle,
    };
  },
};
</script>
