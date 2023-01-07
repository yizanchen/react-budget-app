import { Button, Col, Modal, Row, Stack } from "react-bootstrap";
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
                    <Stack>
                    <Row className="d-flex align-items-baseline fw-bold pb-1">
                        <Col sm={4} xs={4}>Description</Col>
                        <Col sm={4} xs={4} className="d-flex justify-content-center">Date</Col>
                        <Col sm={2} xs={2} className="d-flex justify-content-center">$</Col>
                        <Col sm={2} xs={2} className="d-flex justify-content-end">Delete</Col>
                    </Row>
                        {expenses.map(expense => (
                            <Row className="d-flex align-items-baseline pb-1" key={expense.id}>
                                <Col sm={4} xs={4}>{expense.description}</Col>
                                <Col sm={4} xs={4} className="d-flex justify-content-center">{expense.date}</Col>
                                <Col sm={2} xs={2} className="d-flex justify-content-center">{currencyFormatter.format(expense.amount)}</Col>
                                <Col sm={2} xs={2} className="d-flex justify-content-end"><Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button></Col>
                            </Row>
                        ))}
                    </Stack>
                </Modal.Body>
        </Modal>
    )
}