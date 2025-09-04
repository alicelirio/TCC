import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { AdminDashboard } from '../pages/AdminDashboard';
import { SupplierDashboard } from '../pages/SupplierDashboard';
import { Cart } from '../pages/Cart';
import { PrivateRoute } from './PrivateRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/admin" 
        element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/fornecedor" 
        element={
          <PrivateRoute role="fornecedor">
            <SupplierDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/cart" 
        element={
          <PrivateRoute role="cliente">
            <Cart />
          </PrivateRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
