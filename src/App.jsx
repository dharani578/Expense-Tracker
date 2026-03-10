import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);

  const addExpense = () => {
    if (!name || !amount || !date) return;

    if (editId) {
      setExpenses(
        expenses.map((exp) =>
          exp.id === editId ? { ...exp, name, amount, category, date } : exp,
        ),
      );
      setEditId(null);
    } else {
      const newExpense = {
        id: Date.now(),
        name,
        amount,
        category,
        date,
      };
      setExpenses([...expenses, newExpense]);
    }

    setName("");
    setAmount("");
    setDate("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const editExpense = (exp) => {
    setName(exp.name);
    setAmount(exp.amount);
    setCategory(exp.category);
    setDate(exp.date);
    setEditId(exp.id);
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((exp) => exp.category === filter);

  const total = filteredExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0,
  );

  return (
    <div className="page">
      <div className="container">
        <h1>Expense Tracker</h1>

        <div className="form">
          <input
            type="text"
            placeholder="Expense Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Moives ticket</option>
            <option>Shopping</option>
            <option>Travel</option>
            <option>Healthcare</option>
            <option>Currentbill</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="addBtn" onClick={addExpense}>
            Add Expense
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Expense Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.map((exp) => (
              <tr key={exp.id} className="fade-row">
                <td>{exp.name}</td>
                <td>${exp.amount}</td>
                <td>{exp.category}</td>
                <td>{exp.date}</td>
                <td>
                  <button onClick={() => editExpense(exp)}>Edit</button>
                  <button onClick={() => deleteExpense(exp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="total">Total: ${total.toFixed(2)}</h3>

        <div className="filter">
          Filter by Category:
          <select onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Travel</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
