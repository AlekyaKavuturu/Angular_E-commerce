import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import {
  Product
} from '../shared/product-list/product-list.component';

interface Category {
  name: string;
  image: string;
  route: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  searchSuggestions: string[] = [
    'rice',
    'fruits',
    'vegetables',
    'milk',
    'banana'
  ];

  rollingSuggestions: string[] = [
    ...this.searchSuggestions,
    this.searchSuggestions[0]
  ];

  currentSuggestionIndex = 0;
  enableSearchTransition = true;

  private intervalId:
    ReturnType<typeof setInterval> | undefined;

  categories: Category[] = [
    {
      name: 'Fresh Vegetables',
      image: 'assets/images/vegetables.png',
      route: 'vegetables'
    },
    {
      name: 'Fresh Fruits',
      image: 'assets/images/fruits.png',
      route: 'fruits'
    },
    {
      name: 'Dairy, Bread and Eggs',
      image: 'assets/images/dairy.png',
      route: 'dairy'
    },
    {
      name: 'Snacks and Drinks',
      image: 'assets/images/snacks.png',
      route: 'snacks'
    }
  ];

  offeredProducts: Product[] = [
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.enableSearchTransition = true;
      this.currentSuggestionIndex++;

      if (
        this.currentSuggestionIndex ===
        this.rollingSuggestions.length - 1
      ) {
        setTimeout(() => {
          this.enableSearchTransition = false;
          this.currentSuggestionIndex = 0;
        }, 360);
      }
    }, 1800);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  goToSearch(): void {
    this.router.navigate(['/search']);
  }

  goToCategory(categoryRoute: string): void {
    this.router.navigate(['/category', categoryRoute]);
  }
}
