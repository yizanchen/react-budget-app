import { Button, Form, FormControl, FormLabel, Modal } from "react-bootstrap";
import { useRef } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";

export default function AddExpenseModal({ show, handelClose , defaultBudgetId }){
    const descriptionRef = useRef()
    const amountRef = useRef()
    const dateRef = useRef()
    const budgetIdRef = useRef()
    const { addExpense, budgets } = useBudgets()

    function handleSumbit(e){
        e.preventDefault()
        addExpense(
        {
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            date: dateRef.current.value,
            budgetId: budgetIdRef.current.value,
        })
        handelClose()
    }

    return (
        <Modal show={show} onHide={handelClose}>
            <Form onSubmit={handleSumbit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <FormLabel>Description</FormLabel>
                        <FormControl ref={descriptionRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <FormLabel>Amount</FormLabel>
                        <FormControl ref={amountRef} type="number" required step={0.01} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="date">
                        <FormLabel>Date</FormLabel>
                        <FormControl ref={dateRef} type="date" required defaultValue={new Date(new Date().toLocaleDateString()).toISOString().substr(0, 10)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="BudgetId">
                        <FormLabel>Budget</FormLabel>
                        <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                            <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                            {budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}