import { Component, OnInit } from '@angular/core';
import { InventorySupplier } from '../../../models/inventory-supplier';
import { InventorySupplierService } from '../../../services/inventory-supplier';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-detail',
  imports: [CommonModule],
  templateUrl: './supplier-detail.html',
  styleUrl: './supplier-detail.css'
})
export class SupplierDetail implements OnInit {

  supplier?: InventorySupplier;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: InventorySupplierService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadSupplier(id);
    }
  }

  loadSupplier(id: number): void {
    this.supplierService.getSupplierById(id).subscribe({
      next: (data) => {
        this.supplier = data;
      },
      error: (err) => {
        console.error('Error loading supplier:', err);
      }
    });
  }

  editSupplier(): void {
    if (this.supplier?.supplierId) {
      this.router.navigate(['/suppliers/edit', this.supplier.supplierId]);
    }
  }

  backToList(): void {
    this.router.navigate(['/suppliers']);
  }
}
