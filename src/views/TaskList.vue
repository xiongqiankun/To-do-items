<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-stone-800 dark:text-stone-100">我的任务</h2>
        <p class="text-stone-500 dark:text-stone-400 text-sm mt-1">共 {{ filteredTasks.length }} 个任务</p>
      </div>
      <button @click="openAddTaskModal"
        class="group relative px-5 py-2.5 bg-gradient-to-r from-amber-500 to-emerald-500 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-0.5">
        <span class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          新建任务
        </span>
      </button>
    </div>

    <div class="glass-card p-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="space-y-2">
          <label class="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">分类</label>
          <select v-model="filter.category" class="modern-select" @change="updateFilter">
            <option value="all">全部分类</option>
            <option v-for="category in categories" :key="category.id" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="space-y-2">
          <label class="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">优先级</label>
          <select v-model="filter.priority" class="modern-select" @change="updateFilter">
            <option value="all">全部优先级</option>
            <option value="高">高</option>
            <option value="中">中</option>
            <option value="低">低</option>
          </select>
        </div>
        <div class="space-y-2">
          <label class="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">状态</label>
          <select v-model="filter.status" class="modern-select" @change="updateFilter">
            <option value="all">全部状态</option>
            <option value="completed">已完成</option>
            <option value="pending">未完成</option>
          </select>
        </div>
        <div class="space-y-2">
          <label class="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">排序</label>
          <select v-model="sortBy" class="modern-select" @change="updateSort">
            <option value="createdAt">创建时间</option>
            <option value="dueDate">截止时间</option>
            <option value="priority">优先级</option>
          </select>
        </div>
      </div>
      <div class="mt-4">
        <div class="relative">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" v-model="searchQuery" class="modern-input pl-12" placeholder="搜索任务..."
            @input="updateSearch" />
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <transition-group name="task-list" tag="div" class="space-y-3">
        <div v-for="(task, index) in filteredTasks" :key="task.id" class="task-card group"
          :style="{ animationDelay: `${index * 50}ms` }">
          <div class="flex items-start gap-4">
            <button @click="toggleTaskStatus(task.id)"
              class="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full border-2 flex items-center justify-center transition-all duration-300"
              :class="task.status
                ? 'bg-gradient-to-r from-amber-400 to-emerald-500 border-transparent'
                : 'border-stone-300 dark:border-stone-600 hover:border-emerald-500'">
              <svg v-if="task.status" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </button>

            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <h3 class="font-semibold text-lg transition-all duration-300"
                    :class="task.status ? 'text-stone-400 dark:text-stone-500 line-through' : 'text-stone-800 dark:text-stone-100'">
                    {{ task.title }}
                  </h3>
                  <p v-if="task.description" class="text-sm mt-1 line-clamp-2"
                    :class="task.status ? 'text-stone-400 dark:text-stone-500' : 'text-stone-500 dark:text-stone-400'">
                    {{ task.description }}
                  </p>
                </div>
                <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <router-link :to="`/task/${task.id}`"
                    class="p-2 rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </router-link>
                  <button @click="deleteTask(task.id)"
                    class="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-2 mt-3">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                  :style="{ backgroundColor: getCategoryColor(task.category) + '20', color: getCategoryColor(task.category) }">
                  <span class="w-1.5 h-1.5 rounded-full"
                    :style="{ backgroundColor: getCategoryColor(task.category) }"></span>
                  {{ task.category }}
                </span>
                <span class="px-2.5 py-1 rounded-lg text-xs font-medium" :class="getPriorityClass(task.priority)">
                  {{ task.priority }}优先级
                </span>
                <span v-if="task.dueDate"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ dateUtils.format(task.dueDate, 'MM-DD HH:mm') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </transition-group>

      <div v-if="filteredTasks.length === 0" class="empty-state">
        <div
          class="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-700 flex items-center justify-center">
          <svg class="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">暂无任务</h3>
        <p class="text-stone-500 dark:text-stone-400">点击上方"新建任务"按钮开始添加</p>
      </div>
    </div>

    <transition name="modal">
      <div v-if="showAddTaskModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" @click="showAddTaskModal = false"></div>
        <div
          class="relative w-full max-w-lg bg-white dark:bg-stone-800 rounded-2xl shadow-2xl shadow-stone-500/20 overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-500 to-cyan-500">
          </div>
          <div class="p-6">
            <h2 class="text-xl font-bold text-stone-800 dark:text-stone-100 mb-6">新建任务</h2>
            <form @submit.prevent="addTask" class="space-y-5">
              <div class="space-y-2">
                <label class="text-sm font-medium text-stone-600 dark:text-stone-300">任务标题</label>
                <input type="text" v-model="newTask.title" class="modal-input" placeholder="输入任务标题" required />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-stone-600 dark:text-stone-300">任务描述</label>
                <textarea v-model="newTask.description" class="modal-input min-h-[100px]"
                  placeholder="输入任务描述（可选）"></textarea>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-stone-600 dark:text-stone-300">分类</label>
                  <select v-model="newTask.category" class="modern-select">
                    <option v-for="category in categories" :key="category.id" :value="category.name">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-stone-600 dark:text-stone-300">优先级</label>
                  <select v-model="newTask.priority" class="modern-select">
                    <option value="高">高</option>
                    <option value="中">中</option>
                    <option value="低">低</option>
                  </select>
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-stone-600 dark:text-stone-300">截止时间</label>
                <input type="datetime-local" v-model="newTask.dueDate" class="modal-input" placeholder="年/月/日" />
              </div>
              <div class="flex justify-end gap-3 pt-4">
                <button type="button" @click="showAddTaskModal = false"
                  class="px-5 py-2.5 rounded-xl font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors">
                  取消
                </button>
                <button type="submit"
                  class="px-5 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-amber-500 to-emerald-500 hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
                  创建任务
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '../store/task';
import { useCategoryStore } from '../store/category';
import { dateUtils } from '../utils/date';

const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

const showAddTaskModal = ref(false);
const newTask = ref({
  title: '',
  description: '',
  category: '工作',
  priority: '中',
  dueDate: ''
});

const openAddTaskModal = () => {
  // 设置默认截止时间为当前时间的一天后
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  // 格式化为 datetime-local 输入框需要的格式
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  const hours = String(tomorrow.getHours()).padStart(2, '0');
  const minutes = String(tomorrow.getMinutes()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  newTask.value = {
    title: '',
    description: '',
    category: '工作',
    priority: '中',
    dueDate: formattedDate
  };

  showAddTaskModal.value = true;
};

const filter = ref({
  category: 'all',
  priority: 'all',
  status: 'all'
});

const sortBy = ref('createdAt');
const searchQuery = ref('');

const categories = computed(() => categoryStore.categoryList);
const filteredTasks = computed(() => taskStore.filteredTasks);

const updateFilter = () => {
  taskStore.setFilter(filter.value);
};

const updateSort = () => {
  taskStore.setSortBy(sortBy.value);
};

const updateSearch = () => {
  taskStore.setSearchQuery(searchQuery.value);
};

const addTask = () => {
  taskStore.addTask(newTask.value);
  showAddTaskModal.value = false;
  newTask.value = {
    title: '',
    description: '',
    category: '工作',
    priority: '中',
    dueDate: ''
  };
};

const toggleTaskStatus = (id) => {
  taskStore.toggleTaskStatus(id);
};

const deleteTask = (id) => {
  if (confirm('确定要删除这个任务吗？')) {
    taskStore.deleteTask(id);
  }
};

const getCategoryColor = (categoryName) => {
  const category = categories.value.find(c => c.name === categoryName);
  return category ? category.color : '#3b82f6';
};

const getPriorityClass = (priority) => {
  switch (priority) {
    case '高':
      return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
    case '中':
      return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
    case '低':
      return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
    default:
      return 'bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-300';
  }
};

onMounted(() => {
  taskStore.loadTasks();
  categoryStore.loadCategories();
});
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
}

.dark .glass-card {
  background: rgba(30, 30, 30, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.modern-input {
  @apply w-full px-4 py-3 pl-12 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200;
}

.modal-input {
  @apply w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200;
}

.modern-select {
  @apply w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 cursor-pointer appearance-none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}

.task-card {
  @apply p-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-200/50 dark:border-stone-700/50 shadow-sm hover:shadow-md transition-all duration-300;
  animation: slideIn 0.3s ease forwards;
  opacity: 0;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.task-card:hover {
  @apply border-emerald-500/30;
}

.empty-state {
  @apply text-center py-16;
}

.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.3s ease;
}

.task-list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.task-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>