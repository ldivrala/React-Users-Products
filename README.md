# **React Users & Products Dashboard**

A simple React application to display and filter user and product data fetched from [dummyjson.com](https://dummyjson.com/). Features reusable components, pagination, and a custom UI with the Neutra Text font.

## **Features**
- **Pages**: `/users` and `/products` with dynamic tables.
- **Filters**: Search, page size, and field-specific filters (e.g., Title, Category).
- **API**: Uses Axios to fetch data from `dummyjson.com`.
- **State Management**: Context API for global state.
- **Styling**: Custom CSS with a color palette (#322625, #ebebeb, #c0e3e5, #fdc936).

## **Setup**
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd react-users-products
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the App**:
   ```bash
   npm start
   ```
   - Opens at `http://localhost:3000`.

## **Usage**
- Navigate to `/users` to view and filter user data.
- Navigate to `/products` to view and filter product data with tabs (ALL, Laptops).
- Use the search bar and filters to refine the displayed data.

## **Project Structure**
```
src/
├── components/        # Table, Filter, Pagination
├── context/           # DataContext for state
├── pages/             # Users.js, Products.js
├── styles/            # CSS files
├── api.js             # Axios API calls
└── App.js             # Main app with routing
```