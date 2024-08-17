<!-- src/App.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-br from-yellow-200 via-red-200 to-pink-200 overflow-hidden">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-4">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <Footer class="py-4"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
body {
  overflow-y: auto; /* 改回 auto，允许滚动 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>