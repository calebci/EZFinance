import React from 'react';

import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import BudgetCard from './components/BudgetCard';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const percentage = 50;
function App() {
  return (
  <Container className="my-4">
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 className="me-auto">Budgets</h1>
      <Button variant="primary">Add Budget</Button>
      <Button variant="outline-primary">Add Expense</Button>
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
      <BudgetCard name="Entertainment" amount={200} max={1000}></BudgetCard>
    </div>
  </Container>
  );
}

export default App
