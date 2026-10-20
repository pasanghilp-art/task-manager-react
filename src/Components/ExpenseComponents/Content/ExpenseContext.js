import { createContext, useContext } from "react";

export const ExpenseContext = createContext();

export function useExpenses() {
    return useContext(ExpenseContext);
}