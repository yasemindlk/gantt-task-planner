import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "../../types/task.types";
import { mockTasks } from "../../constants/mockTasks";

export interface TaskState {
  items: Task[];
}

const initialState: TaskState = {
  items: mockTasks,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state, 
      action: { payload: Task },
    ) => {
      state.items.push(action.payload);
    },
    updateTask: (
      state,
      action: { payload: { id: string; updates: Partial<Task> } },
    ) => {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload.updates };
      }
    },
    removeTask: (
      state, 
      action: { payload: string },
    ) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task?.type === 'main') {
        state.items = state.items.filter(
          (t) => t.id !== action.payload && t.parentId !== action.payload
        );
      } else {
        state.items = state.items.filter((t) => t.id !== action.payload);
      }
    },
    setTasks: (
      state, 
      action: { payload: Task[] },
    ) => {
      state.items = action.payload;
    },
  },
});

export const { addTask, updateTask, removeTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
