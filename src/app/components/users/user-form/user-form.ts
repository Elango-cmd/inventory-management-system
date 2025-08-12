import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryUser } from '../../../models/inventory-user';
import { InventoryUserService } from '../../../services/inventory-user';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm implements OnInit {
  userForm!: FormGroup;
  isEditMode = false;
  userId?: number;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: InventoryUserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', this.isEditMode ? [] : [Validators.required]],  // required only if creating
      role: ['', Validators.required]
    });

    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.isEditMode = true;
      this.loadUser(this.userId);
      // Password might be optional in edit mode or handled differently (depending on requirements)
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  loadUser(id: number): void {
    this.loading = true;
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error loading user data';
        console.error(err);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }
    this.loading = true;
    const userData: InventoryUser = this.userForm.value;

    if (this.isEditMode && this.userId) {
      this.userService.updateUser(this.userId, userData).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (err) => {
          this.errorMessage = 'Error updating user';
          console.error(err);
          this.loading = false;
        }
      });
    } else {
      this.userService.createUser(userData).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (err) => {
          this.errorMessage = 'Error creating user';
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}