# Smart Job Tracker Dashboard 📊

A React-based SaaS productivity tool that helps job seekers centrally track applications, monitor interview schedules, and analyze their job search progress.

## 👨‍🎓 Student Details
- **Name:** Kushagra Aggarwal
- **Roll Number:** 25BCS10163
- **Student Mail ID:** kushagra.25bcs10163@sst.scaler.com
- **Submitted to:** Mrinal Bhattacharya Sir
- **Deployed Link:** https://smart-job-tracker-dashboard.vercel.app/

## 📌 Project Overview
The Smart Job Tracker Dashboard is designed to solve the problem of managing dozens of job applications across multiple platforms. Most job seekers use spreadsheets or notes, which lack automation, filtering, analytics, and proper organization.

This dashboard allows users to:
- Track all job applications in a centralized location.
- Monitor interview progress and set reminders.
- Search, filter, and sort applications dynamically.
- View real-time analytics of their job search pipeline.

## 🚀 Features
- ✅ **Add & Manage Applications:** Comprehensive form with validation (Company, Role, Salary, Status, etc.).
- ✅ **Job Pipeline Tabs:** Categorized views for Applied, Interview Scheduled, Offer Received, and Rejected stages.
- ✅ **Search & Filtering:** Dynamic search with debounce functionality and multi-criteria filters.
- ✅ **Sorting:** Sort applications by Date, Salary, or Company Name.
- ✅ **Dashboard Analytics:** Visualized stats (Pie charts, Monthly graphs) using Recharts.
- ✅ **Bookmark System:** Save important job listings for quick access.
- ✅ **Responsive UI:** Fully responsive design for mobile and desktop.

## 🛠️ Technologies Used
- React (Vite)
- React Router DOM
- Axios
- Recharts
- react-hook-form & yup
- Framer Motion
- react-icons & react-toastify
- date-fns

## 🌐 API Used
- **Mock Job Data API:** `https://dummyjson.com/products`
- **Company Logo API:** `https://logo.clearbit.com/{domain}`

## 🧠 React Concepts Used
This project demonstrates several core and advanced React principles:
- **useState & useEffect**: For managing UI states (search query, filters) and API data fetching.
- **Context API**: Global state management via `ApplicationContext` (addApplication, deleteApplication, updateApplication).
- **Custom Hooks**:
  - `useApplications`: Handles CRUD operations efficiently.
  - `useDebounce`: Improves search performance by limiting real-time re-renders.
  - `useLocalStorage`: Persists application data across browser sessions.
- **React Router DOM**: Modular routing for Dashboard (`/dashboard`), Applications (`/applications`), and Analytics (`/analytics`).
- **Component-based Architecture**: Reusable and atomic UI pieces (Navbar, JobCard, Charts) for better maintainability.

## 📂 Project Structure
```text
src/
├── components/
│   ├── Charts.jsx
│   ├── EmptyState.jsx
│   ├── Filters.jsx
│   ├── Footer.jsx
│   ├── JobCard.jsx
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   └── StatsCard.jsx
├── pages/
│   ├── AddApplication.jsx
│   ├── Analytics.jsx
│   ├── Applications.jsx
│   ├── Dashboard.jsx
│   └── EditApplication.jsx
├── context/
│   └── ApplicationContext.jsx
├── hooks/
│   ├── useApplications.js
│   ├── useDebounce.js
│   └── useLocalStorage.js
├── services/
│   └── api.js
└── utils/
    └── helpers.js
```

## 🗂️ Component Breakdown
| Component | Responsibility |
| --- | --- |
| **App.jsx** | Main entry point; handles routing and context providers. |
| **Dashboard.jsx** | Displays high-level analytics and summary statistics. |
| **Applications.jsx** | Lists all job applications with search, filter, and tabs. |
| **AddApplication.jsx** | Validated form to create new job entries. |
| **EditApplication.jsx** | Form to update existing job information. |
| **Analytics.jsx** | Detailed visual representation of application data. |
| **Navbar.jsx** | Top navigation bar for app links. |
| **JobCard.jsx** | Displays summary of a single job application. |
| **Charts.jsx** | Reusable Recharts logic for data visualization. |
| **Filters.jsx** | UI elements for filtering applications by status/platform. |
| **SearchBar.jsx** | Search input with debounce support. |
| **StatsCard.jsx** | Simple card for displaying single metrics (e.g., Total Apps). |
| **EmptyState.jsx** | Fallback UI when no records are found. |
| **Footer.jsx** | Simple footer displayed at the bottom of the dashboard. |
