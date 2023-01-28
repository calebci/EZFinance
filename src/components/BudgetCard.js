//import React from 'react'
import { Card } from "react-bootstrap";
import { currencyFormatter } from '../utils'

export default function BudgetCard({ name, amount, max }) {
  return (
    <Card>
        <Card.Body>
            <Card.Title>
                <div>{name}</div>
                <div>{currencyFormatter.format(amount)} / {currencyFormatter.format(max)}</div>
            </Card.Title>
        </Card.Body>
    </Card>
  )
}
