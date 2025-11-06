"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import TaskSlice from "@/redux/slices/task.slice"

const rootReducer = combineReducers({
    user:TaskSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;