import { useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function TotalCard(){
    const { expenses, budgets } = useBudgets()
    const amount = expenses.reduce((total, expenses) => total + expenses.amount, 0)
    const max = budgets.reduce((total, budget) => total + budget.max, 0)
    if(amount === 0 ) return null
    return (
        <BudgetCard amount={amount} name="Total" max={max} hideButton/>
    )
}