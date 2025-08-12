import { Component, OnInit } from '@angular/core';
import { InventoryUser } from '../../../models/inventory-user';
import { InventoryUserService } from '../../../services/inventory-user';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList  implements OnInit {

  users: InventoryUser[] = [];
  loading = true;

  constructor(
    private userService: InventoryUserService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading users', err);
        this.loading = false;
      }
    });
  }

  viewUser(id?: number): void {
    if (id) {
      this.router.navigate(['/users', id]);
    }
  }

  editUser(id?: number): void {
    if (id) {
      this.router.navigate(['/users/edit', id]);
    }
  }

  deleteUser(id?: number): void {
    if (id && confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Error deleting user', err)
      });
    }
  }
}{

}
