import React, { useState } from 'react'
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns/format";
import { Button } from "@/components/ui/button";
import { useDispatch } from 'react-redux';
import {
    addTodo,
} from '../features/Task/taskSlice';
import { toast } from 'sonner';


const AddTaskButton = () => {
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState({ title: "", desc: "", date: null });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addTodo({
                title: newTask.title,
                description: newTask.desc,
               date: newTask.date ? newTask.date.toISOString() : new Date().toISOString(),
            })
        );

        setNewTask({ title: "", desc: "", date: null });
        toast.success("Task added successfully!");
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="relative cursor-pointer flex items-center text-white justify-end text-end gap-3 bg-[#15803D]  p-6 w-35 text-lg font-semibold hover:bg-[#166534]"
                >
                    <Plus className="absolute  left-3" /> Add Task
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Task Details</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="grid gap-4  mb-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Title</Label>
                            <Input placeholder="Add a task title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="date-1">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={
                                            "pl-3 text-left font-normal" +
                                            (!newTask.date && " text-muted-foreground")
                                        }
                                    >
                                        {newTask.date ? (
                                            format(newTask.date, "PPP")
                                        ) : (
                                            <span>Select date</span>
                                        )}

                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={newTask.date}
                                        onSelect={(date) => setNewTask({ ...newTask, date })}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        captionLayout="dropdown" required
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="task">Description</Label>
                            <Textarea placeholder="Add any description to your task" value={newTask.desc} onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })} required/>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-[#15803D] text-white">Add Task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}

export default AddTaskButton