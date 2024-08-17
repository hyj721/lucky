<!-- src/components/AnimatedNumber.vue -->
<template>
  <span>{{ displayNumber }}</span>
</template>

<script>
import { ref, onMounted, watch } from 'vue'

export default {
  name: 'AnimatedNumber',
  props: {
    value: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  setup(props) {
    const displayNumber = ref(0)

    const animateValue = (start, end, duration) => {
      let startTimestamp = null
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        displayNumber.value = Math.floor(progress * (end - start) + start)
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }

    onMounted(() => {
      animateValue(0, props.value, props.duration)
    })

    watch(() => props.value, (newValue, oldValue) => {
      animateValue(oldValue, newValue, props.duration)
    })

    return {
      displayNumber
    }
  }
}
</script>