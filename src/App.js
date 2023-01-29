import React from 'react'
import Box from '@mui/material/Box'
import Container from 'react-bootstrap/Container'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import AddBudgetModal from "./components/AddBudgetModal"
import AddExpenseModal from "./components/AddExpenseModal"
import ViewExpensesModal from "./components/ViewExpensesModal"
import BudgetCard from "./components/BudgetCard"
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import TotalBudgetCard from "./components/TotalBudgetCard"
import Tabs from "./components/Tabs"
import { useState } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext"
import { Button, Stack } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import './App.css';
import 'react-circular-progressbar/dist/styles.css'

function Goal() {

  const [goal_cost, set_goal_cost] = useState(0)
  const [money_saved, set_money_saved] = useState(0)
  const [monthly_income, set_monthly_income] = useState(0)
  const [months_left, set_months_left] = useState(0)
  const [percBar, setBar] = useState(<CircularProgressbar></CircularProgressbar>)
  var total_budget = window.localStorage.getItem('max');
  var excess = 0
  var percentage = 0
  var total_budget = 500
  var owe = 0
  var outcome = 0

  function submitValues() {

    excess = monthly_income - total_budget
    owe = (goal_cost - money_saved) / months_left
    outcome = (owe / excess) * 100
    percentage = outcome.toFixed(2)

    if (percentage <= 20) {
      setBar(<CircularProgressbar
      value={percentage}
      text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'green'})} />)
    }

    if (percentage > 20 && percentage <= 40 ) {
      setBar(<CircularProgressbar
      value={percentage}
      text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'yellowgreen'})} />)
    }

    if (percentage > 40 && percentage <= 60 ) {
      setBar(<CircularProgressbar
      value={percentage}
      text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'yellow'})} />)
    }

    if (percentage > 60 && percentage <= 80) {
      setBar(<CircularProgressbar
      value={percentage}
      text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'orange'})} />)
    }

    if (percentage > 80 && percentage <= 100) {
      setBar(<CircularProgressbar
      value={percentage}
      text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'red'})} />)
    }

    if (percentage > 100) {
      setBar(<CircularProgressbar
      value={percentage}
      text={`L`} styles = {buildStyles ({textSize: '16px', pathColor: 'red'})} />)
    }
  }

  return (
  <Container className="my-4">
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 className="me-auto">EZ Goal Manager</h1>
    </Stack>
    <div style = {{position: 'absolute', right: '30vw', bottom: '20vh', width: 400, height: 400}}>
    {percBar};
    </div>
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1rem",
      alignItems: "flex-start",
    }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap'}}>
        <TextField
            label="Goal Cost"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            value = {goal_cost}
            onChange={(e) => {
              set_goal_cost(e.target.value);
          }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <TextField
            label="Money Saved"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            value = {money_saved}
            onChange={(e) => {
              set_money_saved(e.target.value);
          }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <TextField
            label="Monthly Income"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            value = {monthly_income}
            onChange={(e) => {
              set_monthly_income(e.target.value);
          }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <TextField
            label="Months Left"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            value = {months_left}
            onChange={(e) => {
              set_months_left(e.target.value);
          }}
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
          />
          <Button variant="primary" onClick={submitValues} style={{width: '27ch', height: '50px'}}>
            Submit
          </Button>
        </Box>
    </div>
  </Container>
  );
}

function Tool() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container>
        <Stack>
          <h1>EZ Budget Tracker</h1>
          <div class="button">
            <Button onClick={() => setShowAddBudgetModal(true)}>
              Add New Budget Category
            </Button>
          </div>
          {/* <Button onClick={openAddExpenseModal}>
            Add New Expense
          </Button> */}
        </Stack>
        <div class="budgetcard">
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount, 0
            )
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            )
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId} 
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  )
}

function App() {
  return (
    <div>
      <h1>EZ Finances</h1>
      <Tabs>
        <div label="Tutorial">
          Tutorial
        </div>
        <div label="EZ Budget">
          <Tool/>
        </div>
        <div label="EZ Goal">
          <Goal/>
        </div>
      </Tabs>
    </div>
  );
}

export default App
//export { App } from './App';