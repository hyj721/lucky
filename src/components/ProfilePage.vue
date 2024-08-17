<!-- ProfilePage.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-purple-600 mb-6">个人中心</h1>

    <!-- 用户信息和签到功能 -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
      <div class="flex justify-between items-start">
        <div class="flex items-center">
          <div class="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center text-purple-600 text-3xl font-bold mr-4">
            {{ userInitials }}
          </div>
          <div>
            <h2 class="text-2xl font-semibold text-gray-800">{{ userName }}</h2>
            <p class="text-gray-600">{{ userEmail }}</p>
            <div class="mt-2">
              <p class="text-gray-600">总参与次数：{{ totalDraws }}</p>
              <p class="text-gray-600">
                剩余抽奖次数：
                <transition name="count">
                  <span :key="remainingDraws">{{ remainingDraws }}</span>
                </transition>
              </p>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button
              @click="checkIn"
              :disabled="hasCheckedIn"
              class="check-in-btn bg-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-purple-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {{ hasCheckedIn ? '已签到' : '每日签到' }}
          </button>
          <p class="mt-2 text-sm text-gray-500">
            连续签到：
            <transition name="count">
              <span :key="consecutiveCheckins">{{ consecutiveCheckins }}</span>
            </transition>
            天
          </p>
        </div>
      </div>
    </div>

    <!-- 签到成功提示 -->
    <transition name="fade">
      <div v-if="showCheckinSuccess" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg p-8 text-center">
          <h3 class="text-2xl font-bold text-purple-600 mb-4">签到成功！</h3>
          <p class="text-xl mb-4">获得 1 次抽奖机会</p>
          <div class="text-5xl mb-4 animate-bounce">🎉</div>
          <button @click="showCheckinSuccess = false" class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300">
            关闭
          </button>
        </div>
      </div>
    </transition>

    <!-- 抽奖历史记录 -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <h3 class="text-2xl font-semibold text-purple-600 mb-4">抽奖历史记录</h3>
      <p class="text-sm text-gray-500 mb-4">（显示最近100条记录，共 {{ drawHistory.length }} 条）</p>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-purple-100">
          <tr>
            <th class="py-2 px-4 border-b text-left">抽奖时间</th>
            <th class="py-2 px-4 border-b text-left">订单ID</th>
            <th class="py-2 px-4 border-b text-left">活动名称</th>
            <th class="py-2 px-4 border-b text-left">奖品</th>
            <th class="py-2 px-4 border-b text-left">奖品等级</th>
            <th class="py-2 px-4 border-b text-left">奖品价值</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="record in currentPageRecords" :key="record.id" class="hover:bg-gray-50">
            <td class="py-2 px-4 border-b">{{ record.drawTime }}</td>
            <td class="py-2 px-4 border-b">{{ record.orderId }}</td>
            <td class="py-2 px-4 border-b">{{ record.activityName }}</td>
            <td class="py-2 px-4 border-b">{{ record.prize }}</td>
            <td class="py-2 px-4 border-b">{{ record.prizeLevel }}</td>
            <td class="py-2 px-4 border-b">¥{{ record.prizeValue.toFixed(2) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 分页控件 -->
      <div class="mt-4 flex justify-between items-center">
        <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="bg-purple-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          上一页
        </button>
        <div class="flex items-center">
          <span class="mr-2">跳转到第</span>
          <input
              v-model.number="jumpToPage"
              type="number"
              min="1"
              :max="totalPages"
              class="w-16 px-2 py-1 border rounded"
          >
          <span class="ml-2">页</span>
          <button
              @click="goToPage"
              class="ml-2 bg-purple-500 text-white px-4 py-2 rounded"
          >
            跳转
          </button>
        </div>
        <div>
          <span>第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
        </div>
        <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="bg-purple-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      userName: '胡怡进',
      userEmail: 'huyijin0721@163.com',
      totalDraws: 150,
      remainingDraws: 5,
      drawHistory: [
        { id: 1, drawTime: '2024-08-15 14:30:25', orderId: 'ORDER123456', activityName: '周年庆抽奖', prize: 'iPhone 15', prizeLevel: '特等奖', prizeValue: 8999 },
        { id: 2, drawTime: '2024-08-14 10:15:30', orderId: 'ORDER123457', activityName: '每日抽奖', prize: '纪念徽章', prizeLevel: '四等奖', prizeValue: 9.9 },
        { id: 3, drawTime: '2024-08-13 18:45:12', orderId: 'ORDER123458', activityName: '新品发布抽奖', prize: '智能手表', prizeLevel: '二等奖', prizeValue: 1999 },
        // ... 更多测试数据 ...
      ],
      currentPage: 1,
      recordsPerPage: 10,  // 改为每页5条记录
      jumpToPage: 1,
      showCheckinSuccess: false,
    }
  },
  computed: {
    userInitials() {
      if (this.userName.length === 2) {
        return this.userName;
      } else if (this.userName.length >= 3) {
        return this.userName.slice(-2);
      } else {
        return this.userName[0] || '';
      }
    },
    totalPages() {
      return Math.ceil(this.drawHistory.length / this.recordsPerPage)
    },
    currentPageRecords() {
      const start = (this.currentPage - 1) * this.recordsPerPage
      const end = start + this.recordsPerPage
      return this.drawHistory.slice(start, end)
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    goToPage() {
      if (this.jumpToPage >= 1 && this.jumpToPage <= this.totalPages) {
        this.currentPage = this.jumpToPage
      } else {
        alert('请输入有效的页码')
      }
    },
    checkIn() {
      const today = new Date().toDateString()
      if (this.lastCheckinDate === today) {
        alert('今天已经签到过了哦！')
        return
      }

      this.hasCheckedIn = true
      this.remainingDraws += 1  // 签到奖励一次抽奖机会

      if (this.lastCheckinDate === new Date(Date.now() - 86400000).toDateString()) {
        // 如果上次签到是昨天，连续签到天数+1
        this.consecutiveCheckins++
      } else {
        // 如果不是连续签到，重置为1
        this.consecutiveCheckins = 1
      }

      this.lastCheckinDate = today

      // 显示签到成功提示
      this.showCheckinSuccess = true

      // 在实际应用中，这里应该调用API来保存签到状态
    }
  },
  created() {
    // 生成更多测试数据
    for (let i = 4; i <= 100; i++) {
      const date = new Date(2024, 7, 15 - i)
      this.drawHistory.push({
        id: i,
        drawTime: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        orderId: `ORDER${123458 + i}`,
        activityName: ['每日抽奖', '周年庆抽奖', '新品发布抽奖', '会员专享抽奖'][Math.floor(Math.random() * 4)],
        prize: ['手机', '平板电脑', '智能手表', '耳机', '充电宝', '纪念徽章', '优惠券'][Math.floor(Math.random() * 7)],
        prizeLevel: ['特等奖', '一等奖', '二等奖', '三等奖', '四等奖', '五等奖'][Math.floor(Math.random() * 6)],
        prizeValue: Math.floor(Math.random() * 10000)
      })
    }
    // 按时间倒序排序
    this.drawHistory.sort((a, b) => new Date(b.drawTime) - new Date(a.drawTime))
  }
}
</script>
<style scoped>
.check-in-btn {
  transition: all 0.3s ease;
}

.check-in-btn:not(:disabled):hover {
  transform: scale(1.05);
}

.check-in-btn:not(:disabled):active {
  transform: scale(0.95);
}

.count-enter-active,
.count-leave-active {
  transition: all 0.5s ease;
}

.count-enter-from,
.count-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes confetti {
  0% { transform: translateY(0) rotateZ(0); opacity: 1; }
  100% { transform: translateY(1000px) rotateZ(720deg); opacity: 0; }
}

.confetti {
  position: fixed;
  width: 10px;
  height: 10px;
  background-color: #f0f;
  animation: confetti 5s ease-in-out infinite;
}
</style>