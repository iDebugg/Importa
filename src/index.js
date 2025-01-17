import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Orders from './Pages/Orders';
import Customers from './Pages/Customers';
import Payments from './Pages/Payments';
import ShippingAndLogistics from './Pages/ShippingAndLogistics';
import RecentOrders from './Components/RecentOrders';
import FAQs from './Pages/FAQs';
import AddProductForm from './Components/AddProductForm';
import Items from './Pages/Items';
import LoginForm from './Components/LoginForm';
import ProductDetails from './Components/ProductDetails';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/Orders",
    element: <Orders />,
  },
  {
    path: "/Customers",
    element: <Customers />,
  },
  {
    path: "/Payments",
    element: <Payments />,
  },
  {
    path: "/ShippingAndLogistics",
    element: <ShippingAndLogistics />,
  },
  {
    path: "/RecentOrders",
    element: <RecentOrders />,
  },
  {
    path: "/FAQs",
    element: <FAQs />,
  },
  {
    path: "/AddProductForm",
    element: <AddProductForm />,
  },
  {
    path: "/Items",
    element: <Items />,
  },
  {
    path: "/LoginForm",
    element: <LoginForm />,
  },
  {
    path: "/ProductDetails/:id",
    element: <ProductDetails />,
  },
  
  

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
