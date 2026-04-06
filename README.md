🧐 Overview & Approach
The goal of this project was to create a centralized hub for personal financial data that remains performant and visually engaging.

Core Philosophy:
Data-Driven Visualization: Using dynamic charts to turn raw numbers into actionable insights.

Component-Based Architecture: Built with a modular approach to ensure scalability and ease of maintenance. Each UI element (charts, transaction cards, sidebars) is treated as an independent unit.

User-Centric Design: Focused on a "mobile-first" responsive layout, ensuring that the dashboard is accessible on desktops, tablets, and smartphones.

State Management: Efficient handling of financial data to ensure real-time updates across different dashboard widgets.

✨ Key Features
Financial Overview Cards: At-a-glance views of total balance, monthly income, and total expenses.

Interactive Analytics: Visual representations of spending patterns using interactive charts (Line/Bar/Pie) to identify trends over time.

Transaction History: A detailed, searchable log of recent financial activities with categorization.

Category Breakdown: Insight into which sectors (e.g., Food, Rent, Entertainment) consume the most budget.

Responsive Navigation: A sleek sidebar and header system optimized for all screen sizes.

Dark/Light Mode Support: Optimized UI for different lighting environments to reduce eye strain.

🛠️ Tech Stack
Frontend: React.js / Vite (for fast builds and optimized performance)

Styling: Tailwind CSS (for utility-first, responsive styling)

Charts: Recharts / Chart.js (for high-performance data visualization)

Icons: Lucide-react / React-icons

Deployment: Netlify

⚙️ Setup Instructions
To run this project locally, follow these steps:

Prerequisites
Ensure you have Node.js (v14 or higher) and npm installed.

1. Clone the Repository
   Bash
   git clone https://github.com/Anirban-1490/finance-dashboard.git
   cd finance-dashboard
2. Install Dependencies
   Bash
   npm install
3. Run the Development Server
   Bash
   npm run dev
   The application will be available at http://localhost:5173 (or the port specified in your terminal).
