import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InventoryUserService } from '../../../services/inventory-user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-serive';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css'
})
export class UserLogin {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: InventoryUserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { userName, password } = this.loginForm.value;
    this.userService.loginUser(userName, password).subscribe({
      next: (user) => {
        this.authService.login(); // Mark as logged in
        this.router.navigate(['/products']); // Redirect after login
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
        console.error(err);
      }
    });
  }
}
