# FinanceFlow - Interactive Finance Dashboard

A clean, responsive, and interactive frontend finance dashboard built to track, visualize, and manage financial activity. This project was developed as a frontend engineering assignment, focusing on UI/UX design, state management, and component architecture.

## 🚀 Live Demo

* (Optional: If you deploy this to Vercel or Netlify, paste the link here)*

## ✨ Core Features & Functionality

* **Dashboard Overview:** Dynamic summary cards calculating Total Balance, Income, and Expenses in real-time.
* **Data Visualizations:** * *Cash Flow Trend:* A time-based Bar chart comparing income vs. expenses.
    *Spending Breakdown:* A categorical Doughnut chart visualizing expense distribution.
* **Transactions Management:** A searchable, filterable data table displaying all financial history.
* **Role-Based Access Control (RBAC) Simulation:**
    * **Viewer:** Read-only access to dashboard data and transactions.
    * **Admin:** Full access to add new transactions and delete existing ones. UI dynamically updates based on the active role.
* **Smart Insights:** Auto-calculated analytics showing the highest spending category, the largest single transaction, and the user's current savings rate.
* **Data Persistence:** Application state is preserved across page reloads using browser Local Storage.

## 🛠 Tech Stack & Architecture Choices

To ensure high performance, maintainability, and an excellent developer experience, the following stack was chosen:

* **Framework:** Next.js (App Router) & React - Chosen for fast rendering, easy routing, and modern React features.
* **Styling:** Tailwind CSS - Utilized for rapid, utility-first styling, ensuring a highly responsive and consistent design system across all screen sizes.
* **State Management:** Zustand - Selected over Redux or Context API for its zero-boilerplate, lightweight nature. It effortlessly handles the global transaction data and active user role.
* **Data Persistence:** Zustand's `persist` middleware - Automatically syncs the global store to `localStorage` to fulfill the optional data persistence enhancement without requiring a backend.
* **Charts:** Chart.js & react-chartjs-2 - Used for robust, responsive, and highly customizable data visualizations.
* **Icons:** Lucide React - Clean, consistent iconography.

## 📦 Getting Started

### Prerequisites

Ensure you have Node.js (v18+) and npm installed on your machine.

### Installation & Setup

1. **Clone the repository:**
   git clone <your-repository-url>
   cd finance-dashboard

2. **Install dependencies:**
   npm install

3. **Start the development server:**
   npm run dev

4. **View the application:**
   Open your browser and navigate to
   <http://localhost:3000>

## 🧠 Approach & Problem Solving

* **Data Handling:** Instead of complex API mocking, I generated a robust initial state of mock transactions. By tying this to Zustand and Local Storage, the app behaves identically to a fully integrated frontend, allowing seamless addition and deletion of data without server latency.
* **Component Modularity:** The UI is broken down into distinct, single-responsibility components (SummaryCards, DashboardCharts, InsightsSection, TransactionsTable). This makes the codebase scalable and easy to test.
* **Performance:** Used React's `useMemo` hook within the DashboardCharts component to prevent unnecessary recalculations of the charting datasets during re-renders.
* **Graceful Degradation:** The UI handles "empty states" gracefully. If an Admin deletes all transactions, the charts and tables display clean fallback states rather than breaking.

## 🔮 Future Enhancements

Given more time, I would expand this project by implementing:

1. **System Dark Mode:** Utilizing Tailwind's dark: variants.
2. **Export Functionality:** Adding a utility to download the transactions array as a CSV file.
3. **Pagination:** Implementing pagination on the transactions table for better performance with massive datasets.
