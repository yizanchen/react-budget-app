import { Container, Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpenseModal from "./components/ViewExpenseModal";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";
import TotalCard from "./components/TotalCard";

function App() {
const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
const [showViewExpenseModalBudgetId, setShowViewExpenseModalBudgetId] = useState()
const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
const {budgets, getBudgetExpenses } = useBudgets()

function openAddExpenseModal(budgetId){
  setShowAddExpenseModal(true)
  setAddExpenseModalBudgetId(budgetId)
}

  return (
  <>
    <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          <TotalCard />
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id)
            .reduce( (total, expenses) => total + expenses.amount, 0)
            return (
            <BudgetCard 
            key={budget.id} 
            name={budget.name} 
            amount={amount} 
            max={budget.max} 
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            onViewExpenseClick={() => setShowViewExpenseModalBudgetId(budget.id)
            }
            />
            )
            })}
            <UncategorizedBudgetCard 
              onAddExpenseClick={openAddExpenseModal}
              onViewExpenseClick={() => setShowViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID) }/>
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handelClose={() => setShowAddBudgetModal(false)}/>
      <AddExpenseModal 
        show={showAddExpenseModal} 
        defaultBudgetId={addExpenseModalBudgetId}
        handelClose={() => setShowAddExpenseModal(false)}/>
      <ViewExpenseModal 
        budgetId={showViewExpenseModalBudgetId} 
        handelClose={() => setShowViewExpenseModalBudgetId()}/>
  </>
  )
}

export default App;
