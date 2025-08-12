import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventorySupplier } from '../../../models/inventory-supplier';
import { InventoryProductService } from '../../../services/inventory-product';
import { InventorySupplierService } from '../../../services/inventory-supplier';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryProduct } from '../../../models/inventory-product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})

export class ProductForm implements OnInit {

  productForm!: FormGroup;
  isEditMode = false;
  productId?: number;
  suppliers: InventorySupplier[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: InventoryProductService,
    private supplierService: InventorySupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Form setup
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      supplierId: ['', Validators.required]
    });

    // Load supplier list for dropdown
    this.supplierService.getAllSuppliers().subscribe({
      next: (data) => (this.suppliers = data),
      error: (err) => console.error('Error fetching suppliers:', err)
    });

    // Check for edit mode
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          supplierId: product.inventorySupplierDTO?.supplierId || ''
        });
      },
      error: (err) => console.error('Error loading product:', err)
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const product: InventoryProduct = {
      productId: this.isEditMode ? this.productId : undefined,
      name: this.productForm.value.name,
      quantity: this.productForm.value.quantity,
      price: this.productForm.value.price,
      inventorySupplierDTO: {
        supplierId: this.productForm.value.supplierId
      } as InventorySupplier
    };

    if (this.isEditMode) {
      this.productService.updateProduct(this.productId!, product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Error updating product:', err)
      });
    } else {
      this.productService.addProduct(product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Error creating product:', err)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
