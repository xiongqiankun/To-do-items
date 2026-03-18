import { defineStore } from 'pinia';
import { storage } from '../utils/storage';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    isDarkMode: storage.get('isDarkMode', false),
    defaultCategory: storage.get('defaultCategory', '工作'),
    defaultPriority: storage.get('defaultPriority', '中')
  }),
  getters: {
    darkMode: (state) => {
      return state.isDarkMode;
    }
  },
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      this.saveSettings();
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setDefaultCategory(category) {
      this.defaultCategory = category;
      this.saveSettings();
    },
    setDefaultPriority(priority) {
      this.defaultPriority = priority;
      this.saveSettings();
    },
    saveSettings() {
      storage.set('isDarkMode', this.isDarkMode);
      storage.set('defaultCategory', this.defaultCategory);
      storage.set('defaultPriority', this.defaultPriority);
    },
    loadSettings() {
      this.isDarkMode = storage.get('isDarkMode', false);
      this.defaultCategory = storage.get('defaultCategory', '工作');
      this.defaultPriority = storage.get('defaultPriority', '中');
    }
  }
});