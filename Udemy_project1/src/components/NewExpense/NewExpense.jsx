import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";
import Joyride from "react-joyride";

export default function NewExpense(props) {
  const [showForm, setShowForm] = useState(false);
  const [runTour, setRunTour] = useState(false);
  const tourSteps = [
    {
      target: ".new-expense__actions", // The CSS selector for the element you want to highlight
      content: "Let's begin our journey", // The message for the step
      placement: "center", // You can choose the placement of the tooltip (top, bottom, left, right, auto)
    },
    // Add more steps if needed
  ];

  // ... your existing code ...

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setShowForm(false);
  };

  const showFormHandler = () => {
    setShowForm(true);
    setRunTour(true);
  };

  const hideFormHandler = () => {
    setShowForm(false);
  };

  return (
    <div className="new-expense">
      {!showForm && (
        <button onClick={showFormHandler} className="new-expense__actions">
          Add New Expense
        </button>
      )}
      {showForm && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancelExpenseData={hideFormHandler}
        />
      )}
      <Joyride
        steps={tourSteps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        disableOverlay
        disableBeacon
        callback={(data) => {
          if (data.status === "finished") {
            setRunTour(false); // Stop the tour when it's finished
          }
        }}
      />
    </div>
  );
}
