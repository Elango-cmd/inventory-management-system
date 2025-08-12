import { Component, OnInit } from '@angular/core';
import { InventoryProduct } from '../../../models/inventory-product';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryProductService } from '../../../services/inventory-product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail  implements OnInit {

  product?: InventoryProduct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: InventoryProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProduct(id);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (data: InventoryProduct) => {
        this.product = data;
      },
      error: (err) => {
        console.error('Error loading product:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}