import React from 'react';

import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



// var percentage = 15;

// goal variables
var amount_needed = 300;
var months_until = 5;

var monthly_income = 800;

// expense variables 
var rent_utilities = 0;
var food = 300;
var transportation = 120;
var entertainment = 10;
var other = 20;

var tot_monthly_expneses = rent_utilities + food + transportation + entertainment + other;

var monthly_net_income = monthly_income - tot_monthly_expneses;
var month_split = amount_needed / months_until;

var outcome = (month_split / monthly_net_income) * 100
var percentage = outcome.toFixed(2)



var percBar;

// if (percentage <= 0) {
//   percBar = 0
// }
if (percentage <= 20) {
  percBar = <CircularProgressbar
  value={percentage}
  text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'green'})} />
}

if (percentage > 20 && percentage <= 40 ) {
  percBar = <CircularProgressbar
  value={percentage}
  text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'yellowgreen'})} />
}

if (percentage > 40 && percentage <= 60 ) {
  percBar = <CircularProgressbar
  value={percentage}
  text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'yellow'})} />
}

if (percentage > 60 && percentage <= 80) {
  percBar = <CircularProgressbar
  value={percentage}
  text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'orange'})} />
}

if (percentage > 80) {
  percBar = <CircularProgressbar
  value={percentage}
  text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'red'})} />
}

function App() {
  return (
  <Container className="my-4">
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 className="me-auto">Budgets</h1>
      <Button variant="primary">Add Budget</Button>
      <Button variant="outline-primary">Add Expense</Button>
    </Stack>
    <div style = {{width: 200, height: 200}}>
      {percBar}
    </div>
  </Container>
  );
}

export default App
