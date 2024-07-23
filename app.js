document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expensesTable = document.querySelector("#expenses-table tbody");
  const totalExpensesElement = document.getElementById("total-expenses");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseCategoryInput = document.getElementById("expense-category");
  const expensesChartCtx = document
    .getElementById("expenses-chart")
    .getContext("2d");

  let totalExpenses = 0;
  const expenses = [];
  const expenseLabels = [];
  const expenseData = [];

  const expensesChart = new Chart(expensesChartCtx, {
    type: "line",
    data: {
      labels: expenseLabels,
      datasets: [
        {
          label: "Gastos",
          backgroundColor: "#00b4d8",
          borderColor: "#0077b6",
          data: expenseData,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      animation: {
        duration: 500,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Fecha",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Cantidad",
          },
        },
      },
    },
  });

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = expenseNameInput.value;
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategoryInput.value;
    const date = new Date().toLocaleString();

    totalExpenses += amount;
    totalExpensesElement.textContent = totalExpenses.toFixed(2);

    const expense = { name, amount, category, date };
    expenses.push(expense);

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${name}</td>
            <td>$${amount.toFixed(2)}</td>
            <td>${category}</td>
            <td>${date}</td>
            <td><button class="delete-btn">Eliminar</button></td>
        `;
    expensesTable.appendChild(row);

    expenseLabels.push(date);
    expenseData.push(amount);
    expensesChart.update();

    row.querySelector(".delete-btn").addEventListener("click", () => {
      expensesTable.removeChild(row);
      totalExpenses -= amount;
      totalExpensesElement.textContent = totalExpenses.toFixed(2);

      const index = expenses.indexOf(expense);
      if (index > -1) {
        expenses.splice(index, 1);
        expenseLabels.splice(index, 1);
        expenseData.splice(index, 1);
        expensesChart.update();
      }
    });

    expenseForm.reset();
  });
});
