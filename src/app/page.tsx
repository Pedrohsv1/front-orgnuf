"use client";
import { ActivitiesList } from "@/components/activities/activities";
import authProtector from "@/components/authProtector";
import { Navbar } from "@/components/navbar/navbar";
import { ToDosList } from "@/components/todos/toDos";

function Home() {
  return (
    <main className="flex h-screen bg-zinc-900">
      <Navbar />
      <div className="grid h-screen w-full grid-cols-[1fr_1fr_300px]">
        <ToDosList />
        <ActivitiesList />
        <div></div>
      </div>
    </main>
  );
}
export default authProtector(Home);
