<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-stone-800 dark:text-stone-100">数据统计</h2>
      <p class="text-stone-500 dark:text-stone-400 text-sm mt-1">查看您的任务完成情况</p>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="stat-card" style="--delay: 0">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div class="mt-3">
          <p class="text-3xl font-bold text-stone-800 dark:text-stone-100">{{ stats.total }}</p>
          <p class="text-sm text-stone-500 dark:text-stone-400">总任务</p>
        </div>
      </div>
      
      <div class="stat-card" style="--delay: 1">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="mt-3">
          <p class="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{{ stats.completed }}</p>
          <p class="text-sm text-stone-500 dark:text-stone-400">已完成</p>
        </div>
      </div>
      
      <div class="stat-card" style="--delay: 2">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="mt-3">
          <p class="text-3xl font-bold text-amber-600 dark:text-amber-400">{{ stats.pending }}</p>
          <p class="text-sm text-stone-500 dark:text-stone-400">待完成</p>
        </div>
      </div>
      
      <div class="stat-card" style="--delay: 3">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div class="mt-3">
          <p class="text-3xl font-bold text-cyan-600 dark:text-cyan-400">{{ stats.completionRate }}%</p>
          <p class="text-sm text-stone-500 dark:text-stone-400">完成率</p>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="glass-card p-6">
        <h3 class="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-4">分类分布</h3>
        <div class="h-64">
          <canvas ref="categoryChart"></canvas>
        </div>
      </div>
      
      <div class="glass-card p-6">
        <h3 class="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-4">优先级分布</h3>
        <div class="h-64">
          <canvas ref="priorityChart"></canvas>
        </div>
      </div>
    </div>
    
    <div class="glass-card p-6">
      <h3 class="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-4">分类详情</h3>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-stone-200 dark:border-stone-700">
              <th class="text-left py-3 text-sm font-medium text-stone-500 dark:text-stone-400">分类</th>
              <th class="text-left py-3 text-sm font-medium text-stone-500 dark:text-stone-400">总任务</th>
              <th class="text-left py-3 text-sm font-medium text-stone-500 dark:text-stone-400">已完成</th>
              <th class="text-left py-3 text-sm font-medium text-stone-500 dark:text-stone-400">完成率</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, category) in stats.categoryStats" :key="category" class="border-b border-stone-100 dark:border-stone-700/50">
              <td class="py-4">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: getCategoryColor(category) }"></span>
                  <span class="font-medium text-stone-700 dark:text-stone-200">{{ category }}</span>
                </div>
              </td>
              <td class="py-4 text-stone-600 dark:text-stone-300">{{ data.total }}</td>
              <td class="py-4 text-stone-600 dark:text-stone-300">{{ data.completed }}</td>
              <td class="py-4">
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div 
                      class="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-all duration-500"
                      :style="{ width: `${Math.round((data.completed / data.total) * 100)}%` }"
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-stone-600 dark:text-stone-300 w-12">
                    {{ Math.round((data.completed / data.total) * 100) }}%
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useTaskStore } from '../store/task';
import { useCategoryStore } from '../store/category';
import Chart from 'chart.js/auto';

const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

const categoryChart = ref(null);
const priorityChart = ref(null);
const categoryChartInstance = ref(null);
const priorityChartInstance = ref(null);

const stats = computed(() => taskStore.taskStats);
const categories = computed(() => categoryStore.categoryList);

const getCategoryColor = (categoryName) => {
  const category = categories.value.find(c => c.name === categoryName);
  return category ? category.color : '#3b82f6';
};

const renderCategoryChart = () => {
  if (categoryChart.value && Object.keys(stats.value.categoryStats).length > 0) {
    if (categoryChartInstance.value) {
      categoryChartInstance.value.destroy();
    }
    
    const ctx = categoryChart.value.getContext('2d');
    const labels = Object.keys(stats.value.categoryStats);
    const data = Object.values(stats.value.categoryStats).map(item => item.total);
    const backgroundColors = labels.map(label => getCategoryColor(label));
    
    categoryChartInstance.value = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          borderWidth: 0,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          }
        }
      }
    });
  }
};

const renderPriorityChart = () => {
  if (priorityChart.value && Object.keys(stats.value.priorityStats).length > 0) {
    if (priorityChartInstance.value) {
      priorityChartInstance.value.destroy();
    }
    
    const ctx = priorityChart.value.getContext('2d');
    const labels = Object.keys(stats.value.priorityStats);
    const data = Object.values(stats.value.priorityStats);
    const backgroundColors = ['#ef4444', '#f59e0b', '#10b981'];
    
    priorityChartInstance.value = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '任务数量',
          data: data,
          backgroundColor: backgroundColors,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              grid: {
                display: false
              }
            },
            border: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            },
            border: {
              display: false
            }
          }
        }
      }
    });
  }
};

watch(() => stats.value, () => {
  renderCategoryChart();
  renderPriorityChart();
}, { deep: true });

onMounted(() => {
  taskStore.loadTasks();
  categoryStore.loadCategories();
  
  setTimeout(() => {
    renderCategoryChart();
    renderPriorityChart();
  }, 100);
});
</script>

<style scoped>
.stat-card {
  @apply p-5 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200/50 dark:border-stone-700/50 shadow-sm hover:shadow-md transition-all duration-300;
  animation: slideUp 0.5s ease forwards;
  animation-delay: calc(var(--delay) * 100ms);
  opacity: 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-card:hover {
  @apply -translate-y-1;
}

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1.5rem;
}

.dark .glass-card {
  background: rgba(30, 30, 30, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
</style>