import { Component, OnInit } from '@angular/core';
import { InventoryUser } from '../../../models/inventory-user';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryUserService } from '../../../services/inventory-user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail implements OnInit {

  user?: InventoryUser;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: InventoryUserService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadUser(id);
    } else {
      this.errorMessage = 'Invalid user ID';
      this.loading = false;
    }
  }

  loadUser(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error loading user details';
        console.error(err);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}