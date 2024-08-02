# Invoice Module

This repository contains the source code for a React-based web application for an invoice module feature of a Point of Sales System.

## Features

The application implements the following features:

**Add invoice with autocomplete for product input:**

- [x] Mandatory invoice data: date, customer name, salesperson name, notes (optional), and multiple products sold.
- [x] Autocomplete product suggestions as the user types. Each product suggestion includes product name, product picture, stock, and price.
- [x] POST API called using `fetch` or `axios` to save the invoice to the database.
- [ ] Form validation to ensure all required fields are filled.
- [ ] Error messages displayed for invalid inputs.
- [ ] Success notification upon successful submission

**Invoice card with pagination:**

- [x] Displays a list of invoices with pagination.
- [x] Each invoice card shows the customer name, salesperson name, total amount paid, and notes.
- [ ] Invoice data is queried from the backend using a GET API with lazy loading.

**Time-series graph:**

- [ ] Displays a graph to project revenue from invoices for daily, weekly, and monthly periods.
- [ ] Enables user to pan and zoom to specific periods.
- [ ] Auto scrolls when new data is pushed.

## Project Structure

- **backend/**: Contains the backend code for the invoice module.
- **client/**: Contains the frontend code for the invoice module.

## Prerequisites

- React.js
- Redux
- Node.js
- npm and yarn
- MySQL database

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/endriyanira/invoice-module.git
   cd invoice-module
   ```

2. **Install dependencies for backend:**

   ```bash
   cd backend
   npm install
   ```

3. **Install dependencies for frontend:**

   ```bash
   cd ../client
   yarn install
   ```

## Running the Application

1. **Backend:**

   - Ensure your database is running and update the database configuration in the backend.
   - Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. **Frontend:**

   - Start the frontend server:

   ```bash
   cd client
   npm start
   ```

## Usage

- Configure database credentials in the `config.js` file.
- Access the application at `http://localhost:3000` for the frontend.
- API endpoints can be accessed via the backend server running at `http://localhost:5000`.
- You can update the backend server running port at `backend/bin/www` file.

## Contributing

Feel free to open issues or submit pull requests if you find any bugs or have new features to suggest.

## Author

Endriyani Rahayu
