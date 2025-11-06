import { createNewTask, findAllTasks } from "@/app/services/task.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createNewTaskData = createAsyncThunk("task/create", async (body) => {
  const res = await createNewTask(body);
  return res;
});

export const tasksList = createAsyncThunk("talse/list", async (body) => {
  console.log(body);

  const res = await findAllTasks(body);
  return res.data;
});

// export const updateTask = createAsyncThunk("talse/update", async (body) => {
//   console.log(body);

//   const res = await updateTask(id,body);
//   return res.data;
// });

const initialState = {
  users: [],
  user: {},
  status: null,
  isLoading: false,
  error: null,
};

const TaskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewTaskData.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(createNewTaskData.fulfilled, (state, action) => {
        state.status = "created";
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(createNewTaskData.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      })
      .addCase(tasksList.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(tasksList.fulfilled, (state, action) => {
        state.status = "success";
        state.users = action.payload.data;
        state.isLoading = false;
      })
      .addCase(tasksList.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      });
  },
});

export const {} = TaskSlice.actions;

export default TaskSlice.reducer;
