const API = "http://localhost:8080";

let incomeExpenseChart;
let analyticsChart;

/* =============================
   GLOBAL DATA (FILTER SUPPORT)
============================= */
let ALL_INCOMES = [];
let ALL_EXPENSES = [];

/* =============================
   LOAD DASHBOARD
============================= */

async function checkAuth() {
  const r = await fetch(`${API}/api/auth/me`, {
    credentials: "include"
  });

  if (!r.ok) {
    location.replace("login.html");
  }
}

// /* ================= AUTH ================= */
// async function checkAuth() {
//   const r = await fetch(`${API}/api/report/pnl`, { credentials: "include" });
//   if (!r.ok) location.href = "auth.html";
// }
async function loadDashboard() {
  ALL_INCOMES = await (await fetch(`${API}/api/income/all`, {
    credentials: "include"
  })).json();

  ALL_EXPENSES = await (await fetch(`${API}/api/expenses/all`, {
    credentials: "include"
  })).json();

  const totalIncome = ALL_INCOMES.reduce((s, i) => s + Number(i.amount), 0);
  const totalExpense = ALL_EXPENSES.reduce((s, e) => s + Number(e.amount), 0);

  document.getElementById("totalIncome").innerText = "₹ " + totalIncome;
  document.getElementById("totalExpense").innerText = "₹ " + totalExpense;
  document.getElementById("pnl").innerText = "₹ " + (totalIncome - totalExpense);
  document.getElementById("totalRecords").innerText =
    ALL_INCOMES.length + ALL_EXPENSES.length;

  loadIncome(ALL_INCOMES);
  loadExpense(ALL_EXPENSES);

  renderIncomeExpenseChart(totalIncome, totalExpense);
  renderAnalyticsChart(totalIncome, totalExpense);
}

/* =============================
   TABLE LOADERS
============================= */
function loadIncome(list) {
  const t = document.getElementById("incomeTable");
  if (!t) return;

  t.innerHTML = "";
  list.forEach(i => {
    t.innerHTML += `
      <tr>
        <td>${i.incomeDescription || "-"}</td>
        <td>${i.source}</td>
        <td>₹${i.amount}</td>
        <td>
          <button onclick="deleteIncome(${i.id})">Delete</button>
        </td>
      </tr>`;
  });
}

function loadExpense(list) {
  const t = document.getElementById("expenseTable");
  if (!t) return;

  t.innerHTML = "";
  list.forEach(e => {
    t.innerHTML += `
      <tr>
        <td>${e.expenseDescription || "-"}</td>
        <td>${e.category}</td>
        <td>₹${e.amount}</td>
        <td>
          <button onclick="deleteExpense(${e.id})">Delete</button>
        </td>
      </tr>`;
  });
}

/* =============================
   CHARTS
============================= */
function renderIncomeExpenseChart(income, expense) {
  const ctx = document.getElementById("incomeExpenseChart");
  if (!ctx) return;

  if (incomeExpenseChart) incomeExpenseChart.destroy();

  incomeExpenseChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        label: "Amount (₹)",
        data: [income, expense],
        backgroundColor: ["#22d3ee", "#f87171"]
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}

function renderAnalyticsChart(income, expense) {
  const ctx = document.getElementById("analyticsChart");
  if (!ctx) return;

  if (analyticsChart) analyticsChart.destroy();

  analyticsChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["#6366f1", "#f472b6"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } }
    }
  });
}

/* =============================
   FILTER (NO API CALL)
============================= */
function filterExpense(category) {
  if (!category) {
    loadExpense(ALL_EXPENSES);
    return;
  }
  loadExpense(ALL_EXPENSES.filter(e => e.category === category));
}

function filterIncome(source) {
  if (!source) {
    loadIncome(ALL_INCOMES);
    return;
  }
  loadIncome(ALL_INCOMES.filter(i => i.source === source));
}

/* =============================
   MODAL FIX (IMPORTANT PART)
============================= */
function openExpenseModal() {
  const modal = document.getElementById("expenseModal");
  if (!modal) return;

  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  document.body.style.overflow = "hidden";
}

function closeExpenseModal() {
  const modal = document.getElementById("expenseModal");
  if (!modal) return;

  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function openIncomeModal() {
  const modal = document.getElementById("incomeModal");
  if (!modal) return;

  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  document.body.style.overflow = "hidden";
}

function closeIncomeModal() {
  const modal = document.getElementById("incomeModal");
  if (!modal) return;

  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

/* =============================
   ADD EXPENSE
============================= */
async function addExpense() {
  const expense = {
    expenseDescription: document.getElementById("expDesc").value,
    category: document.getElementById("expCategory").value,
    amount: document.getElementById("expAmount").value,
    expenseDate: new Date().toISOString().split("T")[0]
  };

  await fetch(`${API}/api/expenses/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(expense)
  });

  closeExpenseModal();
  loadDashboard();
}

/* =============================
   ADD INCOME
============================= */
async function addIncome() {
  const income = {
    incomeDescription: document.getElementById("incDesc").value,
    source: document.getElementById("incSource").value,
    amount: document.getElementById("incAmount").value,
    incomeDate: new Date().toISOString().split("T")[0]
  };

  await fetch(`${API}/api/income/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(income)
  });

  closeIncomeModal();
  loadDashboard();
}

/* =============================
   DELETE
============================= */
async function deleteIncome(id) {
  await fetch(`${API}/api/income/delete/${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  loadDashboard();
}

async function deleteExpense(id) {
  await fetch(`${API}/api/expenses/delete/${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  loadDashboard();
}

/* =============================
   LOGOUT
============================= */
function logout() {
  fetch(`${API}/logout`, {
    method: "POST",
    credentials: "include"
  }).then(() => window.location.href = "index.html");
}

/* INIT */
window.onload = async () => {
  await checkAuth();
  loadDashboard();
};
