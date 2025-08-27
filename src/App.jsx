import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ModeToggle } from "./components/mode-toggle";
import { Search, X } from "lucide-react";
import AddTaskButton from "./components/AddTaskButton";
import TaskCard from "./components/TaskCard";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilter,
  selectFilteredTodos,
  selectStats,
} from './features/Task/taskSlice';
import { Toaster } from "@/components/ui/sonner"

function App() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const currentFilter = useSelector((state) => state.todos.filter);
  const todos = useSelector(selectFilteredTodos);
  const stats = useSelector(selectStats);

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div className='w-11/12 mx-auto py-10 space-y-10'>
      <h1 className="text-end">
        <ModeToggle />
      </h1>
      <Toaster />
      <Card className="shadow-lg">
        <CardContent className="flex items-center gap-10 justify-center sm:justify-between  font-medium sm:px-20 flex-wrap">
          <h1 >All: {stats.total}</h1>
          <h1>Active: {stats.remaining}</h1>
          <h1>Completed: {stats.completed}</h1>
        </CardContent>
      </Card>
      <Card className="shadow-lg">
        <CardContent className="flex items-center justify-center gap-10 md:justify-between font-medium sm:px-20 flex-col sm:flex-row flex-wrap">
          <img src="src/assets/Vista SysTech-02 1.png" alt="logo" />
          <div className="flex items-center justify-between flex-col sm:flex-row flex-wrap gap-3 ">
            <div className="flex-1 mx-4">
              <div className="relative border bg-[#E2E8F0]/50 dark:bg-[#E2E8F0] w-full md:min-w-[15rem]  lg:min-w-[28rem] xl:min-w-xl rounded-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-secondary" size={20} />
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10 placeholder-gray-400 dark:text-secondary dark:placeholder-secondary/70"
                />
                {searchValue && (
                  <button
                    size="icon"
                    onClick={() => setSearchValue("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full hover:text-red-500 cursor-pointer "
                  >
                    <X className="h-4 w-4 border-1 border-gray-500 rounded-full text-gray-500" />
                  </button>
                )}
              </div>
            </div>
            <div className="relative">
              <Select
                defaultValue="all"
                value={currentFilter}
                onValueChange={(val) => dispatch(setFilter(val))}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
              {currentFilter !== "all" && (
                <button
                  onClick={() => dispatch(setFilter("all"))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-red-500 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </CardContent>

      </Card>
      {/* adding task */}
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">Tasks</h1>
        <AddTaskButton />
      </div>
      {/* task cards */}
      {filteredTodos.length !== 0 ? (
        filteredTodos.map(item => (
          <TaskCard key={item.id} item={item} />
        ))
      ) : (
        <h1 className="text-center">
          No Todos available! <br /> Add new todo!
        </h1>
      )}
      {/* <TaskCard item={item} /> */}
    </div>
  )
}

export default App
