import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface Product {
  id: number;
  name: string;
  quantity: string;
  price: number;
  oldPrice: number;
  offer: string;
  image: string;
  category: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() emptyMessage = 'No products found.';

  constructor(private router: Router) {}

  goToProduct(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}