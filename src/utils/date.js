import dayjs from 'dayjs';

export const dateUtils = {
  format(date, format = 'YYYY-MM-DD HH:mm') {
    return dayjs(date).format(format);
  },
  fromNow(date) {
    return dayjs(date).fromNow();
  },
  isToday(date) {
    return dayjs(date).isSame(dayjs(), 'day');
  },
  isTomorrow(date) {
    return dayjs(date).isSame(dayjs().add(1, 'day'), 'day');
  },
  isOverdue(date) {
    return dayjs(date).isBefore(dayjs(), 'day');
  },
  addDays(date, days) {
    return dayjs(date).add(days, 'day').toISOString();
  }
};