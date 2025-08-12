import { Component, OnInit } from '@angular/core';
import { InventorySupplier } from '../../../models/inventory-supplier';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  imports: [CommonModule,RouterModule],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css'
})
export class SupplierList implements OnInit{
suppliers: InventorySupplier[] = [];

  constructor(private supplierService: InventorySupplier) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe({
      next: (data: InventorySupplier[]) => {
        this.suppliers = data;
      },
      error: (err: any) => {
        console.error('Error fetching suppliers', err);
      }
    });
  }

  deleteSupplier(id: number): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => {
          this.suppliers = this.suppliers.filter(s => s.supplierId !== id);
        },
        error: (err: any) => {
          console.error('Error deleting supplier', err);
        }
      });
    }
  }
}
