import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const fetchTasks = createAsyncThunk(
    'todos/fetchTasks',
    async () => {
        const response = await axios.get('/api/tasks');
        return response.data;
    }
);

export const addTask = createAsyncThunk(
    'todos/addTask',
    async (task, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/tasks', {
                id: uuidv4(),
                title: task.text,
                completed: false
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateTask = createAsyncThunk(
    'todos/updateTask',
    async ({ id, completed }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/tasks/${id}`, { completed });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteTask = createAsyncThunk(
    'todos/deleteTask',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        tasks: [],
        status: 'idle',
        error: null
    },
    reducers: {
        toggleTodo: (state, action) => {
            const todo = state.tasks.find(t => t.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.tasks.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = state.tasks.filter(t => t.id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;