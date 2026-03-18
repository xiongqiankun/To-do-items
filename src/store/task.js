import { defineStore } from 'pinia';
import { storage } from '../utils/storage';
import { generateId } from '../utils/id';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: storage.get('tasks', []),
    filter: {
      category: 'all',
      priority: 'all',
      status: 'all'
    },
    sortBy: 'createdAt',
    searchQuery: ''
  }),
  getters: {
    filteredTasks: (state) => {
      let result = [...state.tasks];
      
      // 应用筛选
      if (state.filter.category !== 'all') {
        result = result.filter(task => task.category === state.filter.category);
      }
      if (state.filter.priority !== 'all') {
        result = result.filter(task => task.priority === state.filter.priority);
      }
      if (state.filter.status !== 'all') {
        result = result.filter(task => task.status === (state.filter.status === 'completed'));
      }
      
      // 应用搜索
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        result = result.filter(task => 
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
        );
      }
      
      // 应用排序
      result.sort((a, b) => {
        if (state.sortBy === 'createdAt') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (state.sortBy === 'dueDate') {
          return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (state.sortBy === 'priority') {
          const priorityOrder = { '高': 0, '中': 1, '低': 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return 0;
      });
      
      return result;
    },
    taskStats: (state) => {
      const total = state.tasks.length;
      const completed = state.tasks.filter(task => task.status).length;
      const pending = total - completed;
      const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      // 按分类统计
      const categoryStats = {};
      state.tasks.forEach(task => {
        if (!categoryStats[task.category]) {
          categoryStats[task.category] = { total: 0, completed: 0 };
        }
        categoryStats[task.category].total++;
        if (task.status) {
          categoryStats[task.category].completed++;
        }
      });
      
      // 按优先级统计
      const priorityStats = {};
      state.tasks.forEach(task => {
        if (!priorityStats[task.priority]) {
          priorityStats[task.priority] = 0;
        }
        priorityStats[task.priority]++;
      });
      
      return {
        total,
        completed,
        pending,
        completionRate,
        categoryStats,
        priorityStats
      };
    }
  },
  actions: {
    addTask(task) {
      const newTask = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        status: false,
        tags: [],
        repeat: null,
        reminder: null,
        ...task
      };
      this.tasks.push(newTask);
      this.saveTasks();
      return newTask;
    },
    updateTask(id, updates) {
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...updates };
        this.saveTasks();
        return true;
      }
      return false;
    },
    deleteTask(id) {
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        return true;
      }
      return false;
    },
    toggleTaskStatus(id) {
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.tasks[index].status = !this.tasks[index].status;
        this.saveTasks();
        return true;
      }
      return false;
    },
    setFilter(filter) {
      this.filter = { ...this.filter, ...filter };
    },
    setSortBy(sortBy) {
      this.sortBy = sortBy;
    },
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    saveTasks() {
      storage.set('tasks', this.tasks);
    },
    loadTasks() {
      this.tasks = storage.get('tasks', []);
    }
  }
});