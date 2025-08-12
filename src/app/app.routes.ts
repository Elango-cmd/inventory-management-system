
import { ProductList } from './components/products/product-list/product-list';
import { ProductForm } from './components/products/product-form/product-form';
import { ProductDetail } from './components/products/product-detail/product-detail';
import { SupplierList } from './components/suppliers/supplier-list/supplier-list';
import { SupplierFormComponent } from './components/suppliers/supplier-form/supplier-form';
import { UserList } from './components/users/user-list/user-list';
import { UserForm } from './components/users/user-form/user-form';
import { UserLogin } from './components/users/user-login/user-login';
import { AuthGuard } from './services/auth-guard';
import { Routes } from '@angular/router';
import { PageNotFound } from './components/page-not-found/page-not-found';

export const routes: Routes = [
  { path: 'login', component: UserLogin },

  // Product routes
  { path: 'products', component: ProductList, canActivate: [AuthGuard] },
  { path: 'products/add', component: ProductForm, canActivate: [AuthGuard] },
  { path: 'products/:id', component: ProductDetail, canActivate: [AuthGuard] },
  { path: 'products/:id/edit', component: ProductForm, canActivate: [AuthGuard] },

  // Supplier routes
  { path: 'suppliers', component: SupplierList, canActivate: [AuthGuard] },
  { path: 'suppliers/add', component: SupplierFormComponent, canActivate: [AuthGuard] },
  { path: 'suppliers/:id/edit', component: SupplierFormComponent, canActivate: [AuthGuard] },

  // User routes
  { path: 'users', component: UserList, canActivate: [AuthGuard] },
  { path: 'users/add', component: UserForm, canActivate: [AuthGuard] },
  { path: 'users/:id/edit', component: UserForm, canActivate: [AuthGuard] },

  // Default redirect
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Wildcard 404 page
  { path: '**', component: PageNotFound }
];
