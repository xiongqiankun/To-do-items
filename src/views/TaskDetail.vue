<template>
  <div class="max-w-2xl mx-auto">
    <div class="glass-card p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <router-link 
            to="/" 
            class="p-2 rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </router-link>
          <h2 class="text-xl font-bold text-stone-800 dark:text-stone-100">任务详情</h2>
        </div>
      </div>
      
      <div v-if="task" class="space-y-6">
        <form @submit.prevent="updateTask" class="space-y-5">
          <div class="space-y-2">
            <label class="text-sm font-medium text-stone-600 dark:text-stone-300">任务标题</label>
            <input type="text" v-model="taskForm.title" class="modern-input" required />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-stone-600 dark:text-stone-300">任务描述</label>
            <textarea v-model="taskForm.description" class="modern-input min-h-[120px]" placeholder="输入任务描述"></textarea>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-stone-600 dark:text-stone-300">分类</label>
              <select v-model="taskForm.category" class="modern-select">
                <option v-for="category in categories" :key="category.id" :value="category.name">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-stone-600 dark:text-stone-300">优先级</label>
              <select v-model="taskForm.priority" class="modern-select">
                <option value="高">高</option>
                <option value="中">中</option>
                <option value="low">低</option>
              </select>
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <input 
              type="checkbox" 
              v-model="taskForm.status" 
              id="status"
              class="w-5 h-5 rounded border-stone-300 dark:border-stone-600 text-emerald-500 focus:ring-emerald-500/30"
            />
            <label for="status" class="text-sm font-medium text-stone-600 dark:text-stone-300">标记为已完成</label>
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-stone-600 dark:text-stone-300">截止时间</label>
            <input type="datetime-local" v-model="taskForm.dueDate" class="modern-input" />
          </div>
          
          <div class="flex justify-between pt-4 border-t border-stone-200 dark:border-stone-700">
            <button 
              type="button" 
              @click="deleteTask" 
              class="px-5 py-2.5 rounded-xl font-medium text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25 transition-all hover:-translate-y-0.5"
            >
              删除任务
            </button>
            <button 
              type="submit" 
              class="px-5 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-amber-500 to-emerald-500 hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
            >
              保存修改
            </button>
          </div>
        </form>
        
        <div class="pt-6 border-t border-stone-200 dark:border-stone-700">
          <h3 class="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-4">任务信息</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-700/50">
              <p class="text-xs text-stone-400 dark:text-stone-500 mb-1">创建时间</p>
              <p class="font-medium text-stone-700 dark:text-stone-200">{{ dateUtils.format(task.createdAt) }}</p>
            </div>
            <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-700/50">
              <p class="text-xs text-stone-400 dark:text-stone-500 mb-1">任务ID</p>
              <p class="font-mono text-sm text-stone-600 dark:text-stone-300 truncate">{{ task.id }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-state">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center">
          <svg class="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">任务不存在</h3>
        <p class="text-stone-500 dark:text-stone-400 mb-4">该任务可能已被删除</p>
        <router-link to="/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-amber-500 to-emerald-500 transition-all hover:shadow-lg hover:shadow-emerald-500/30">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回列表
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '../store/task';
import { useCategoryStore } from '../store/category';
import { dateUtils } from '../utils/date';

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

const taskForm = ref({
  title: '',
  description: '',
  category: '工作',
  priority: '中',
  status: false,
  dueDate: ''
});

const task = computed(() => {
  return taskStore.tasks.find(t => t.id === route.params.id);
});

const categories = computed(() => categoryStore.categoryList);

const updateTask = () => {
  if (task.value) {
    taskStore.updateTask(task.value.id, taskForm.value);
    alert('任务已更新');
  }
};

const deleteTask = () => {
  if (task.value && confirm('确定要删除这个任务吗？')) {
    taskStore.deleteTask(task.value.id);
    router.push('/');
  }
};

onMounted(() => {
  taskStore.loadTasks();
  categoryStore.loadCategories();
  
  if (task.value) {
    taskForm.value = { ...task.value };
  }
});
</script>

<style scoped>
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

.modern-input {
  @apply w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200;
}

.modern-select {
  @apply w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 cursor-pointer appearance-none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}

.empty-state {
  @apply text-center py-12;
}
</style>