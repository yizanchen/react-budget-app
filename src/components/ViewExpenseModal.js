import { Button, Modal, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import { currencyFormatter } from "../utils";

export default function ViewExpenseModal({ budgetId, handelClose }){
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()
    const expenses = getBudgetExpenses(budgetId)
    const budget =
        UNCATEGORIZED_BUDGET_ID === budgetId
          ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID}
          : budgets.find(b => b.id === budgetId)

    return (
        <Modal show={budgetId != null} onHide={handelClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Stack direction="horizontal" gap="2">
                            <div>Expenses - {budget?.name}</div>
                            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                <Button variant="outline-danger"
                                  onClick={() => {
                                    deleteBudget(budget)
                                    handelClose()
                                  }}
                                >
                                    Delete
                                </Button>
                            )}
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction="vertical" gap="3">
                        {expenses.map(expense => (
                            <Stack direction="horizontal" gap="2" key={expense.id}>
                                <div className="me-auto fs-4">{expense.description}</div>
                                <div>{currencyFormatter.format(expense.amount)}</div>
                                <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button>
                            </Stack>
                        ))}
                    </Stack>
                </Modal.Body>
        </Modal>
    )
}