import React from 'react';

import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import BudgetCard from './components/BudgetCard';
import 'react-circular-progressbar/dist/styles.css';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useState } from 'react';

// var outcome = (owe / excess) * 100
// var percentage = outcome.toFixed(2)
// var percBar;

// if (percentage <= 20) {
//   percBar = <CircularProgressbar
//   value={percentage}
//   text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'green'})} />
// }

// if (percentage > 20 && percentage <= 40 ) {
//   percBar = <CircularProgressbar
//   value={percentage}
//   text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'yellowgreen'})} />
// }

// if (percentage > 40 && percentage <= 60 ) {
//   percBar = <CircularProgressbar
//   value={percentage}
//   text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'yellow'})} />
// }

// if (percentage > 60 && percentage <= 80) {
//   percBar = <CircularProgressbar
//   value={percentage}
//   text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'orange'})} />
// }

// if (percentage > 80) {
//   percBar = <CircularProgressbar
//   value={percentage}
//   text={`${percentage}%`} styles = {buildStyles ({textSize: '16px', pathColor: 'red'})} />
// }

function App() {

  const [owe, setOwe] = useState("");
  const [excess, setExcess] = useState("");
  var percentage = 0;

  function submitValues() {
    
    var outcome = (owe / excess) * 100
    percentage = outcome.toFixed(2)
    var percBar;

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
  }

  return (
  <Container className="my-4">
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 className="me-auto">Budgets</h1>
    </Stack>
    <p>
    <CircularProgressbar value={percentage} text={`${percentage}%`} />;
    </p>
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1rem",
      alignItems: "flex-start",
    }}
    >
      <TextField
          label="Owe"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          value = {owe}
          onChange={(e) => {
            setOwe(e.target.value);
        }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          label="Excess"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          value = {excess}
          onChange={(e) => {
            setExcess(e.target.value);
        }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <Button variant="primary" onClick={submitValues}>
          Submit
        </Button>
    </div>
  </Container>
  );
}

export default App
