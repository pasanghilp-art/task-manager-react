import { BottomRow } from "../Components/HomeComponents/BottomRow";
import { Filters } from "../Components/HomeComponents/Filters";
import { Header } from "../Components/HomeComponents/Header";
import { Input } from "../Components/HomeComponents/Input";
import { Stats } from "../Components/HomeComponents/Stats";
import { TaskList } from "../Components/HomeComponents/TaskList";

export function HomePage({
    task,
    setTask,
    filterPriority,
    setFilterPriority,
    isGuest,
}) {
    return (
        <>
            <Header />
            {isGuest && (
                <p className="guest-banner">
                    Guest mode: task won't be saved and your session ends in 1
                    hour.
                </p>
            )}
            <Stats task={task} />
            <Input setTask={setTask} isGuest={isGuest} />
            <Filters
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
            />
            <TaskList
                task={task}
                setTask={setTask}
                filterPriority={filterPriority}
                isGuest={isGuest}
            />
            <BottomRow task={task} setTask={setTask} isGuest={isGuest} />
        </>
    );
}
