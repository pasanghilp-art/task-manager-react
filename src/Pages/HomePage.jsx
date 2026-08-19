import { BottomRow } from "../Components/BottomRow";
import { Filters } from "../Components/Filters";
import { Header } from "../Components/Header";
import { Input } from "../Components/Input";
import { Stats } from "../Components/Stats";
import { TaskList } from "../Components/TaskList";

export function HomePage({ task, setTask, filterPriority, setFilterPriority }) {
    return (
        <>
            <Header />
            <Stats />
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
            <BottomRow />
        </>
    );
}
