import { ExpenseForm } from "../Components/ExpenseComponents/ExpenseForm";
import { ExpenseList } from "../Components/ExpenseComponents/ExpenseList";
import { SummaryStats } from "../Components/ExpenseComponents/SummaryStats";
import { ExpenseProvider } from "../Components/ExpenseComponents/ExpenseContent";
import { CategoryBarChart } from "../Components/ExpenseComponents/CategoryBarChart";
import { CategoryPieChart } from "../Components/ExpenseComponents/CategoryPieChart";

export function ExpensesPage() {
    return (
        <ExpenseProvider>
            <div className="app-container">
                <div className="left-column">
                    <ExpenseForm />
                    <ExpenseList />
                </div>
                <div className="right-column">
                    <SummaryStats />
                    <CategoryPieChart />
                    <CategoryBarChart />
                </div>
            </div>
        </ExpenseProvider>
    );
}
