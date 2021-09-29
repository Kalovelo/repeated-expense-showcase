import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

interface Expense {
  transaction_description: string;
  transaction_amount: number;
  transaction_date: Date;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function sortByTimeReducer(expenseA: Expense, expenseB: Expense) {
  const dateA = new Date(expenseA.transaction_date);
  const dateB = new Date(expenseB.transaction_date);
  return dateA < dateB ? 1 : -1;
}

const App = () => {
  console.log(process.env.REACT_APP_API_URL);

  const [expenses, setExpenses] = React.useState<Expense[]>([]);

  React.useEffect(() => {
    api.get('/transactions/repeating_expenses').then((response) => {
      const expenses = response.data.map((expense: Expense) => {
        const formattedExpense: Expense = { ...expense };
        formattedExpense.transaction_date = new Date(expense.transaction_date);
        return formattedExpense;
      });

      expenses.sort(sortByTimeReducer);
      setExpenses(expenses);
    });
  }, []);

  return (
    <div
      className="App"
      style={{
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#eee',
      }}
    >
      <TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
        <Table sx={{ minWidth: 650, width: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense: Expense) => (
              <TableRow>
                <TableCell>{expense.transaction_description}</TableCell>
                <TableCell>{expense.transaction_amount}</TableCell>
                <TableCell>{expense.transaction_date.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default React.memo(App);
