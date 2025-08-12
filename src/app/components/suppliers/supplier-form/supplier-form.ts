import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventorySupplierService } from '../../../services/inventory-supplier';
import { InventorySupplier } from '../../../models/inventory-supplier';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.html',
  styleUrls: ['./supplier-form.css'],
   imports: [ReactiveFormsModule, RouterModule]
})
export class SupplierFormComponent implements OnInit {

  supplierForm!: FormGroup;
  isEditMode: boolean = false;
  supplierId?: number;

  constructor(
    private fb: FormBuilder,
    private supplierService: InventorySupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Create the form
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['']
    });

    // Check if we are editing
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.supplierId = Number(idParam);
      this.isEditMode = true;
      this.loadSupplier(this.supplierId);
    }
  }

  loadSupplier(id: number): void {
    this.supplierService.getSupplierById(id).subscribe({
      next: (supplier: InventorySupplier) => {
        this.supplierForm.patchValue(supplier);
      },
      error: (err) => {
        console.error('Error fetching supplier:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) {
      return;
    }

    const supplier: InventorySupplier = this.supplierForm.value;

    if (this.isEditMode && this.supplierId) {
      // Update mode
      this.supplierService.updateSupplier(this.supplierId, supplier).subscribe({
        next: () => this.router.navigate(['/suppliers']),
        error: (err) => console.error('Error updating supplier', err)
      });
    } else {
      // Create mode
      this.supplierService.createSupplier(supplier).subscribe({
        next: () => this.router.navigate(['/suppliers']),
        error: (err) => console.error('Error creating supplier', err)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/suppliers']);
  }
}
