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
  const [percBar, setBar] = useState(<CircularProgressbar styles = {buildStyles ({pathColor: 'grey'})}></CircularProgressbar>)
  const [excessVal, setexcess] = useState(0)
  const [oweVal, setoweVal] = useState(0)
  var excess = 0
  var percentage = 0
  var owe = 0
  var outcome = 0

  function submitValues() {

    var total_budget = window.localStorage.getItem('max');
    excess = monthly_income - total_budget
    owe = (goal_cost - money_saved) / months_left
    outcome = (owe / excess) * 100
    percentage = outcome.toFixed(2)
    setexcess(excess)
    setoweVal(owe)

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
      text={`${percentage}%` } styles = {buildStyles ({textSize: '16px', pathColor: 'red'})} />)
    }

    if (percentage > 100) {
      setBar(<CircularProgressbar
      value={percentage}
      text={`L`} styles = {buildStyles ({textSize: '16px', pathColor: 'red'})} />)
    }
    console.log(total_budget)
  }

  return (
  <Container className="my-4">
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1>EZ Goal Manager</h1>
    </Stack>
    <div style = {{position: 'absolute', right: '30vw', bottom: '20vh', width: 400, height: 400}}>
    {percBar}
    </div>  
    <div>
    <h2 style = {{position: 'absolute', right: '29vw', bottom: '10vh'}}>Amount to save: {oweVal} per month</h2> 
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
    <div className="header">
      <h1>EZ Finance</h1>
      <Tabs>
        <div label="Tutorial">
          <div class="tutorial-1">
              <h1>
                Application Introduction
              </h1>
              <p>
              By using Easy Finance, you can easily track your monthly expenditures, and determine if you can save for a particular item in a certain amount of time. 
              With the help of this app, you can have a better control over your finances, achieve your financial goals and make better financial decisions.              </p>
          </div>
          <div class="tutorial-2">
              <h1>
                EZ Budget Tutorial
              </h1>
              <p>
              In the “EZ Budget” tab, you can set a monthly budget for each spending category and see how much you have left to spend for the month.              </p>
          </div>
          <div class="tutorial-1">
              <h1>
                EZ Goal Tutorial
              </h1>
              <p>
              In the "EZ Goal" tab, you can set a specific savings goal, such as a new car or a vacation.
              Enter the cost of the item and the date by which you want to purchase it.
              Easy Finance will determine how much you need to save each month to reach your goal by that date and show you how much of 
              your excess monthly cash it will take to reach that goal.
              </p>
          </div>
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