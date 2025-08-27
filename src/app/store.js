import { configureStore } from '@reduxjs/toolkit'
import  taskReducer from '../features/Task/taskSlice'

export const store = configureStore({
  reducer: {
    todos: taskReducer,
},
})