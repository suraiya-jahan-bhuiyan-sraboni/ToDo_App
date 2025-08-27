import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import {
    CalendarDays,
    Pencil,
    Trash2
} from 'lucide-react';
import {
    Card,
    CardContent,
} from "@/components/ui/card"
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
import { toggleTodo, editTodo, deleteTodo } from "../features/Task/taskSlice";
import { toast } from 'sonner';


const TaskCard = ({ item }) => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);
    //console.log(item)
    const changeDes = item.description.substring(0, 100) + '....';
    const [newTask, setNewTask] = useState({ title: item.title, desc: item.description, date: item.date });
    const formatted = format(new Date(item.date), "EEE, dd MMM yyyy");
    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(
            editTodo({
                id: item.id,
                title: newTask.title,
                description: newTask.desc,
                date: newTask.date ? new Date(newTask.date).toISOString() : null,
            })
        );
        toast.success("Task updated successfully!");
    }
    return (
        <Card className="shadow-xl">
            <CardContent className="flex items-center sm:justify-between gap-4 rounded-lg flex-col sm:flex-row sm:px-10 md:px-15 xl:px-20">

                <div className="flex items-center gap-6 space-y-1 md:w-7/12 lg:w-2/3">
                    <Checkbox
                        checked={!!item.completed}
                        onCheckedChange={() => { setIsExpanded(!isExpanded) }}
                        className="h-6 w-6 rounded border-2 cursor-pointer border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        onClick={() => { dispatch(toggleTodo(item.id)); toast.success("Task status updated!"); }}
                    />
                    <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                            {isExpanded ? item.description : changeDes}
                            <span
                                className="ml-1 cursor-pointer select-none text-xs text-blue-500 hover:underline"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? 'see less' : 'see more'}
                            </span>
                        </p>
                    </div>

                </div>

                <div className="flex items-end gap-3 sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays className="h-4 w-4" />
                        <span>{formatted}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Dialog>

                            <DialogTrigger asChild>
                                <button
                                    aria-label="Edit"
                                    disabled={item.completed}
                                    className="text-gray-400 transition-colors hover:text-gray-600 cursor-pointer"
                                >
                                    <Pencil className="h-5 w-5" />
                                </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[425px] ">
                                <DialogHeader>
                                    <DialogTitle>Task Details</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={(e) => handleUpdate(e)}>
                                    <div className="grid gap-4 mb-4">
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
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="task">Description</Label>
                                            <Textarea placeholder="Add any description to your task" value={newTask.desc} onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })} required />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Close</Button>
                                        </DialogClose>
                                        <Button type="submit" className="bg-[#15803D] text-white" >Update Task</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>

                        </Dialog>
                        <button
                            aria-label="Delete"
                            className="text-gray-400 transition-colors hover:text-red-500 cursor-pointer"
                            onClick={() => { dispatch(deleteTodo(item.id)); toast.success("Task deleted successfully!"); }}
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TaskCard