import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Product
} from '../shared/product-list/product-list.component';

@Component({
  selector: 'app-productDetails',
  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.css']
})
export class ProductDetailsComponent implements OnInit {
  quantity = 0;
  product: Product | undefined;

  products: Product[] = [
    {
      id: 1,
      name: 'Fresh Apple',
      quantity: '1 kg',
      price: 120,
      oldPrice: 160,
      offer: '25% OFF',
      image: 'assets/images/apple.png',
      category: 'fruits'
    },
    {
      id: 2,
      name: 'Robusta Banana',
      quantity: '6 pieces',
      price: 45,
      oldPrice: 60,
      offer: '20% OFF',
      image: 'assets/images/banana.png',
      category: 'fruits'
    },
    {
      id: 3,
      name: 'Green Chilli',
      quantity: '100 g',
      price: 20,
      oldPrice: 30,
      offer: '33% OFF',
      image: 'assets/images/chilli.png',
      category: 'vegetables'
    },
    {
      id: 4,
      name: 'Fresh Mango',
      quantity: '1 kg',
      price: 99,
      oldPrice: 140,
      offer: '29% OFF',
      image: 'assets/images/mango.png',
      category: 'fruits'
    },
    {
      id: 5,
      name: 'Fresh Tomato',
      quantity: '1 kg',
      price: 35,
      oldPrice: 50,
      offer: '30% OFF',
      image: 'assets/images/tomato.png',
      category: 'vegetables'
    }
  ];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = Number(params.get('id'));
      this.product = this.products.find(
        item => item.id === productId
      );
    });
  }

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  addProduct(): void {
    this.quantity = 1;
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
}
