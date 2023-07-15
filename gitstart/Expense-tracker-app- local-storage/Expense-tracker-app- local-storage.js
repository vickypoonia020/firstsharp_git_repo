document.addEventListener("DOMContentLoaded", function () {
  const expenseForm = document.getElementById("expenseForm");
  const expenseTable = document.getElementById("expenseTable");
  const expenseNameInput = document.getElementById("expenseName");
  const expenseAmountInput = document.getElementById("expenseAmount");
  const updateExpenseBtn = document.getElementById("updateExpenseBtn");
  const cancelExpenseBtn = document.getElementById("cancelExpenseBtn");
  const clearExpensesBtn = document.getElementById("clearExpensesBtn");

  // Retrieve expenses from local storage or initialize as an empty array
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Flag to track if we are editing an expense or adding a new one
  let isEditing = false;
  let editIndex = null;

  // Function to add a new expense
  function addExpense(e) {
    e.preventDefault();

    if (isEditing) {
      // If editing, update the expense in the array
      expenses[editIndex].name = expenseNameInput.value;
      expenses[editIndex].amount = parseFloat(expenseAmountInput.value);
    } else {
      // If not editing, create a new expense object
      const name = expenseNameInput.value;
      const amount = parseFloat(expenseAmountInput.value);

      const expense = {
        name: name,
        amount: amount,
      };

      // Add the expense to the array
      expenses.push(expense);
    }

    // Clear the form fields
    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    // Reset the editing flag and index
    isEditing = false;
    editIndex = null;

    // Update the local storage with the updated expenses array
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Render the expense table
    renderExpenses();
  }

  // Function to delete an expense
  function deleteExpense(index) {
    // Remove the expense from the array
    expenses.splice(index, 1);

    // Update the local storage with the updated expenses array
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Render the expense table
    renderExpenses();
  }

  // Function to edit an expense
  function editExpense(index) {
    // Set the editing flag and index
    isEditing = true;
    editIndex = index;

    // Populate the form fields with the expense details
    expenseNameInput.value = expenses[index].name;
    expenseAmountInput.value = expenses[index].amount;

    // Show the update and cancel buttons, hide the add button
    updateExpenseBtn.style.display = "inline-block";
    cancelExpenseBtn.style.display = "inline-block";
    expenseForm.querySelector('button[type="submit"]').style.display = "none";
  }

  // Function to cancel editing and reset the form
  function cancelExpense() {
    isEditing = false;
    editIndex = null;
    expenseForm.reset();
    updateExpenseBtn.style.display = "none";
    cancelExpenseBtn.style.display = "none";
    expenseForm.querySelector('button[type="submit"]').style.display =
      "inline-block";
  }

  // Function to render the expense table
  function renderExpenses() {
    // Clear the existing table rows
    expenseTable.getElementsByTagName("tbody")[0].innerHTML = "";

    // Iterate over each expense and add a row to the table
    expenses.forEach(function (expense, index) {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${expense.name}</td>
          <td>${expense.amount}</td>
          <td>
            <button class="btn btn-sm btn-info editExpenseBtn">Edit</button>
            <button class="btn btn-sm btn-danger deleteExpenseBtn">Delete</button>
          </td>
        `;

      // Add event listener to the edit button
      const editExpenseBtn = row.querySelector(".editExpenseBtn");
      editExpenseBtn.addEventListener("click", function () {
        editExpense(index);
      });

      // Add event listener to the delete button
      const deleteExpenseBtn = row.querySelector(".deleteExpenseBtn");
      deleteExpenseBtn.addEventListener("click", function () {
        deleteExpense(index);
      });

      // Append the row to the table
      expenseTable.getElementsByTagName("tbody")[0].appendChild(row);
    });
  }

  // Event listener for form submission
  expenseForm.addEventListener("submit", addExpense);

  // Event listener for update button
  updateExpenseBtn.addEventListener("click", addExpense);

  // Event listener for cancel button
  cancelExpenseBtn.addEventListener("click", cancelExpense);

  // Event listener for clear expenses button
  clearExpensesBtn.addEventListener("click", function () {
    // Clear the expenses array
    expenses = [];

    // Update the local storage with the empty expenses array
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Render the expense table
    renderExpenses();
  });

  // Initial rendering of the expense table
  renderExpenses();
});
