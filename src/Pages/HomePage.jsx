import { BottomRow } from "../Components/HomeComponents/BottomRow";
import { Filters } from "../Components/HomeComponents/Filters";
import { Header } from "../Components/HomeComponents/Header";
import { Input } from "../Components/HomeComponents/Input";
import { Stats } from "../Components/HomeComponents/Stats";
import { TaskList } from "../Components/HomeComponents/TaskList";

export function HomePage({ task, setTask, filterPriority, setFilterPriority }) {
    return (
        <>
            <Header />
            <Stats task={task} />
            <Input task={task} setTask={setTask} />
            <Filters
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
            />
            <TaskList
                task={task}
                setTask={setTask}
                filterPriority={filterPriority}
            />
            <BottomRow task={task} setTask={setTask} />
        </>
    );
}
