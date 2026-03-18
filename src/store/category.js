import { defineStore } from 'pinia';
import { storage } from '../utils/storage';
import { generateId } from '../utils/id';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: storage.get('categories', [
      { id: '1', name: '工作', color: '#3b82f6' },
      { id: '2', name: '生活', color: '#10b981' },
      { id: '3', name: '学习', color: '#f59e0b' }
    ])
  }),
  getters: {
    categoryList: (state) => {
      return state.categories;
    }
  },
  actions: {
    addCategory(category) {
      const newCategory = {
        id: generateId(),
        color: '#3b82f6',
        ...category
      };
      this.categories.push(newCategory);
      this.saveCategories();
      return newCategory;
    },
    updateCategory(id, updates) {
      const index = this.categories.findIndex(category => category.id === id);
      if (index !== -1) {
        this.categories[index] = { ...this.categories[index], ...updates };
        this.saveCategories();
        return true;
      }
      return false;
    },
    deleteCategory(id) {
      const index = this.categories.findIndex(category => category.id === id);
      if (index !== -1) {
        this.categories.splice(index, 1);
        this.saveCategories();
        return true;
      }
      return false;
    },
    saveCategories() {
      storage.set('categories', this.categories);
    },
    loadCategories() {
      this.categories = storage.get('categories', [
        { id: '1', name: '工作', color: '#3b82f6' },
        { id: '2', name: '生活', color: '#10b981' },
        { id: '3', name: '学习', color: '#f59e0b' }
      ]);
    }
  }
});