let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");

addBtn.addEventListener("click", addNewExpense);

function addNewExpense() {
  const category = categorySelect.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (category === "") {
    alert("Please select a category");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }
  if (date === "") {
    alert("Please select a date");
    return;
  }

  const expense = { category, amount, date };
  expenses.push(expense);

  totalAmount += amount;
  totalAmountCell.textContent = totalAmount;

  addExpenseRow(expense);

  clearInputs();
}

function addExpenseRow(expense) {
  const newRow = expensesTableBody.insertRow();

  const categoryCell = newRow.insertCell();
  const amountCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const editCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.addEventListener("click", function () {
    editExpense(expense, newRow);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", function () {
    deleteExpense(expense, newRow);
  });

  categoryCell.textContent = expense.category;
  amountCell.textContent = expense.amount;
  dateCell.textContent = expense.date;
  editCell.appendChild(editBtn);
  deleteCell.appendChild(deleteBtn);
}

function editExpense(expense, row) {
  const categoryCell = row.cells[0];
  const amountCell = row.cells[1];
  const dateCell = row.cells[2];

  categorySelect.value = expense.category;
  amountInput.value = expense.amount;
  dateInput.value = expense.date;

  addBtn.textContent = "Update";
  addBtn.onclick = function () {
    expense.category = categorySelect.value;
    expense.amount = Number(amountInput.value);
    expense.date = dateInput.value;

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;

    totalAmount = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    totalAmountCell.textContent = totalAmount;

    addBtn.textContent = "Add";
    addBtn.onclick = addNewExpense;

    // Remove the entire row after updating
    expensesTableBody.removeChild(row);

    clearInputs();
  };
}

function deleteExpense(expense, row) {
  expenses.splice(expenses.indexOf(expense), 1);
  totalAmount -= expense.amount;
  totalAmountCell.textContent = totalAmount;
  expensesTableBody.removeChild(row);
}

function clearInputs() {
  categorySelect.value = "";
  amountInput.value = "";
  dateInput.value = "";
}

totalAmountCell.textContent = totalAmount;
