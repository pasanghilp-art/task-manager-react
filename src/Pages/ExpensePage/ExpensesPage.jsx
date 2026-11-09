import { ExpenseForm } from "../../Components/ExpenseComponents/Form/ExpenseForm";
import { ExpenseList } from "../../Components/ExpenseComponents/List/ExpenseList";
import { SummaryStats } from "../../Components/ExpenseComponents/Stats/SummaryStats";
import { ExpenseProvider } from "../../Components/ExpenseComponents/Content/ExpenseContent";
import { CategoryBarChart } from "../../Components/ExpenseComponents/Charts/CategoryBarChart";
import { CategoryPieChart } from "../../Components/ExpenseComponents/Charts/CategoryPieChart";
import { getSession } from "../../session";
import "../../Components/ExpenseComponents/ExpensesPage.css";

export function ExpensesPage() {
    const isGuest = !!getSession()?.isGuest;

    return (
        <ExpenseProvider>
            <div className="exp-page">
                <header className="exp-head">
                    <h1 className="exp-title">Expenses</h1>
                    <p className="exp-sub">Track where your money goes</p>
                </header>

                {isGuest && (
                    <p className="guest-banner">
                        Guest mode: expenses won’t be saved and your session
                        ends in 1 hour.
                    </p>
                )}

                <SummaryStats />

                <div className="exp-grid">
                    <div className="exp-col">
                        <ExpenseForm />
                        <ExpenseList />
                    </div>
                    <div className="exp-col">
                        <CategoryPieChart />
                        <CategoryBarChart />
                    </div>
                </div>
            </div>
        </ExpenseProvider>
    );
}
