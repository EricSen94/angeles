import type { RootState } from '../store';

export const selectCategories    = (state: RootState) => state.app.categories;
export const selectAllTasks      = (state: RootState) => state.app.tasks;
export const selectCompletedTasks = (state: RootState) => state.app.tasks.filter(t => t.completed);
export const selectPendingTasks   = (state: RootState) => state.app.tasks.filter(t => !t.completed);