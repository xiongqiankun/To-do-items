<template>
  <div class="space-y-6 max-w-2xl mx-auto">
    <div>
      <h2 class="text-2xl font-bold text-stone-800 dark:text-stone-100">设置</h2>
      <p class="text-stone-500 dark:text-stone-400 text-sm mt-1">自定义您的应用体验</p>
    </div>
    
    <div class="glass-card p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
          <div>
            <h3 class="font-medium text-stone-800 dark:text-stone-100">深色模式</h3>
            <p class="text-sm text-stone-500 dark:text-stone-400">切换明暗主题</p>
          </div>
        </div>
        <button 
          @click="toggleDarkMode" 
          class="relative w-14 h-7 rounded-full transition-colors duration-300"
          :class="isDarkMode ? 'bg-gradient-to-r from-violet-500 to-purple-600' : 'bg-stone-300 dark:bg-stone-600'"
        >
          <span 
            class="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center"
            :class="isDarkMode ? 'translate-x-8' : 'translate-x-1'"
          >
            <svg v-if="isDarkMode" class="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <svg v-else class="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
          </span>
        </button>
      </div>
    </div>
    
    <div class="glass-card p-6 space-y-4">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <div>
          <h3 class="font-medium text-stone-800 dark:text-stone-100">分类管理</h3>
          <p class="text-sm text-stone-500 dark:text-stone-400">添加、编辑或删除任务分类</p>
        </div>
      </div>
      
      <div class="space-y-3">
        <div 
          v-for="category in categories" 
          :key="category.id" 
          class="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-700/50"
        >
          <div class="flex items-center gap-3">
            <span class="w-4 h-4 rounded-full shadow-sm" :style="{ backgroundColor: category.color }"></span>
            <span class="font-medium text-stone-700 dark:text-stone-200">{{ category.name }}</span>
          </div>
          <div class="flex items-center gap-2">
            <button 
              @click="editCategory(category)" 
              class="p-2 rounded-lg text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button 
              @click="deleteCategory(category.id)" 
              class="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <button 
        @click="showAddCategoryModal = true" 
        class="w-full py-3 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-600 text-stone-500 dark:text-stone-400 hover:border-emerald-500 hover:text-emerald-500 transition-colors flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        添加新分类
      </button>
    </div>
    
    <div class="glass-card p-6 space-y-4">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h3 class="font-medium text-stone-800 dark:text-stone-100">默认设置</h3>
          <p class="text-sm text-stone-500 dark:text-stone-400">新任务的默认属性</p>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium text-stone-600 dark:text-stone-300">默认分类</label>
          <select v-model="defaultCategory" class="modern-select" @change="updateDefaultCategory">
            <option v-for="category in categories" :key="category.id" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-stone-600 dark:text-stone-300">默认优先级</label>
          <select v-model="defaultPriority" class="modern-select" @change="updateDefaultPriority">
            <option value="高">高</option>
            <option value="中">中</option>
            <option value="低">低</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="glass-card p-6 space-y-4">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        <div>
          <h3 class="font-medium text-stone-800 dark:text-stone-100">数据管理</h3>
          <p class="text-sm text-stone-500 dark:text-stone-400">导出、导入或清空数据</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button 
          @click="exportData" 
          class="py-3 px-4 rounded-xl font-medium text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          导出数据
        </button>
        <label class="py-3 px-4 rounded-xl font-medium text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors flex items-center justify-center gap-2 cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          导入数据
          <input type="file" accept=".json" @change="importData" class="hidden" />
        </label>
      </div>
      
      <button 
        @click="clearData" 
        class="w-full py-3 rounded-xl font-medium text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        清空所有数据
      </button>
    </div>
    
    <transition name="modal">
      <div v-if="showAddCategoryModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" @click="showAddCategoryModal = false"></div>
        <div class="relative w-full max-w-md bg-white dark:bg-stone-800 rounded-2xl shadow-2xl shadow-stone-500/20 overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"></div>
          <div class="p-6">
            <h2 class="text-xl font-bold text-stone-800 dark:text-stone-100 mb-6">
              {{ editingCategory ? '编辑分类' : '添加分类' }}
            </h2>
            <form @submit.prevent="saveCategory" class="space-y-5">
              <div class="space-y-2">
                <label class="text-sm font-medium text-stone-600 dark:text-stone-300">分类名称</label>
                <input type="text" v-model="categoryForm.name" class="modern-input" placeholder="输入分类名称" required />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-stone-600 dark:text-stone-300">颜色</label>
                <div class="flex items-center gap-3">
                  <input type="color" v-model="categoryForm.color" class="w-12 h-12 rounded-xl cursor-pointer border-0" />
                  <span class="text-sm text-stone-500 dark:text-stone-400">{{ categoryForm.color }}</span>
                </div>
              </div>
              <div class="flex justify-end gap-3 pt-4">
                <button type="button" @click="showAddCategoryModal = false" class="px-5 py-2.5 rounded-xl font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors">
                  取消
                </button>
                <button type="submit" class="px-5 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                  {{ editingCategory ? '保存' : '添加' }}
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
import { useSettingsStore } from '../store/settings';
import { useCategoryStore } from '../store/category';
import { useTaskStore } from '../store/task';

const settingsStore = useSettingsStore();
const categoryStore = useCategoryStore();
const taskStore = useTaskStore();

const showAddCategoryModal = ref(false);
const editingCategory = ref(null);
const categoryForm = ref({
  name: '',
  color: '#3b82f6'
});

const isDarkMode = computed(() => settingsStore.isDarkMode);
const categories = computed(() => categoryStore.categoryList);
const defaultCategory = ref('工作');
const defaultPriority = ref('中');

const toggleDarkMode = () => {
  settingsStore.toggleDarkMode();
};

const editCategory = (category) => {
  editingCategory.value = category;
  categoryForm.value = { ...category };
  showAddCategoryModal.value = true;
};

const saveCategory = () => {
  if (editingCategory.value) {
    categoryStore.updateCategory(editingCategory.value.id, categoryForm.value);
  } else {
    categoryStore.addCategory(categoryForm.value);
  }
  showAddCategoryModal.value = false;
  editingCategory.value = null;
  categoryForm.value = {
    name: '',
    color: '#3b82f6'
  };
};

const deleteCategory = (id) => {
  if (confirm('确定要删除这个分类吗？')) {
    categoryStore.deleteCategory(id);
  }
};

const updateDefaultCategory = () => {
  settingsStore.setDefaultCategory(defaultCategory.value);
};

const updateDefaultPriority = () => {
  settingsStore.setDefaultPriority(defaultPriority.value);
};

const exportData = () => {
  const data = {
    tasks: taskStore.tasks,
    categories: categoryStore.categories,
    settings: {
      isDarkMode: settingsStore.isDarkMode,
      defaultCategory: settingsStore.defaultCategory,
      defaultPriority: settingsStore.defaultPriority
    }
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `todo-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const importData = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.tasks) {
          taskStore.tasks = data.tasks;
          taskStore.saveTasks();
        }
        if (data.categories) {
          categoryStore.categories = data.categories;
          categoryStore.saveCategories();
        }
        if (data.settings) {
          settingsStore.isDarkMode = data.settings.isDarkMode;
          settingsStore.defaultCategory = data.settings.defaultCategory;
          settingsStore.defaultPriority = data.settings.defaultPriority;
          settingsStore.saveSettings();
          
          if (settingsStore.isDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        alert('数据导入成功');
      } catch (error) {
        alert('数据导入失败，请检查文件格式');
      }
    };
    reader.readAsText(file);
  }
};

const clearData = () => {
  if (confirm('确定要清空所有数据吗？此操作不可恢复。')) {
    taskStore.tasks = [];
    taskStore.saveTasks();
    categoryStore.categories = [
      { id: '1', name: '工作', color: '#3b82f6' },
      { id: '2', name: '生活', color: '#10b981' },
      { id: '3', name: '学习', color: '#f59e0b' }
    ];
    categoryStore.saveCategories();
    settingsStore.isDarkMode = false;
    settingsStore.defaultCategory = '工作';
    settingsStore.defaultPriority = '中';
    settingsStore.saveSettings();
    document.documentElement.classList.remove('dark');
    alert('数据已清空');
  }
};

onMounted(() => {
  settingsStore.loadSettings();
  categoryStore.loadCategories();
  defaultCategory.value = settingsStore.defaultCategory;
  defaultPriority.value = settingsStore.defaultPriority;
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

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>