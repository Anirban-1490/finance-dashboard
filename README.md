### Approach

This Assignment features a simple financial dashboard

1. Using dynamic charts to turn raw numbers into proper insights.

2. Built with a modular approach to ensure scalability and ease of maintenance. Mnay component is premade from shadcn which also provides a easy way for me to customize the component if need

3. Focused on a "mobile-first" responsive layout, ensuring that the dashboard is accessible on desktops, tablets, and smartphones. Usage of Tailwind Css helped ease this feature and made responsive design easy

4. To Handle financial data or the RBAC a State management library Zustand is used to make it easier to sync data accross components and present a smooth experience

### Features

1. <b>Summary Cards</b>: At-a-glance views of total balance, monthly income, and total expenses.

2. <b>Analytics</b>: Visual representations of spending patterns using interactive charts to identify trends over time.

3. <b>Transaction History</b>: A detailed log of recent financial activities with categorization.

4. <b>Category Breakdown</b>: Insight into which category (e.g. Services, Shopping..) consume the most budget.

5. <b>Responsive Navigation</b>: A sleek sidebar and header system optimized for all screen sizes.

6. <b>Dark/Light Mode Support</b>: Optimized UI for different lighting environments.
7. <b>RBAC </b>: Roll based authentication added, so only logged in user can modify its transactions and data

### Tech Stack

Frontend: React.js / Vite (for fast builds and optimized performance)

Styling: Tailwind CSS (for utility-first, responsive styling)

Component/Charts: ShadCn/Recharts

Icons: Lucide-react

Deployment: Netlify

### Setup Instructions

To run this project locally, follow these steps:

Prerequisites
Ensure you have Node.js (v14 or higher) and npm installed.

1. Clone the Repository

   ````
   git clone https://github.com/Anirban-1490/finance-dashboard.git
   cd finance-dashboard```
   ````

2. Install Dependencies

   `npm install`

3. Run the Development Server

   `npm run dev`

   The application will be available at http://localhost:5173 (or the port specified in your terminal).
