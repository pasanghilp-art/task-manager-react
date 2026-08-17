import { BottomRow } from "../Components/BottomRow";
import { Filters } from "../Components/Filters";
import { Header } from "../Components/Header";
import { Input } from "../Components/Input";
import { Stats } from "../Components/Stats";
import { TaskList } from "../Components/TaskList";

export function HomePage() {
    return (
        <>
            <Header />
            <Stats />
            <Input />
            <Filters />
            <TaskList />
            <BottomRow />
        </>
    );
}
