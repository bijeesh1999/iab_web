"use client"
import Image from "next/image";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import DataTable from "./ui/table";
import TaskDashboard from "./dashboard/page";

export default function Home() {
  return (
    <Provider store={store}>

    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between px-16 bg-white dark:bg-black sm:items-start">
       <TaskDashboard/>
      </main>
    </div>
    </Provider>
  );
}
