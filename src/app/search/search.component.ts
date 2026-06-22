import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Product
} from '../shared/product-list/product-list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent
  implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('searchInput')
  searchInput!: ElementRef<HTMLInputElement>;

  searchQuery = '';

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

  private resetTimeoutId:
    ReturnType<typeof setTimeout> | undefined;

  pastSearches: string[] = [
    'Green Chilli',
    'Banana',
    'Fresh Apple'
  ];

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
    this.route.queryParamMap.subscribe(params => {
      this.searchQuery = params.get('q') || '';
    });

    this.startRollingSuggestions();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  get filteredProducts(): Product[] {
    const query = this.searchQuery.trim().toLowerCase();

    if (!query) {
      return this.products;
    }

    return this.products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }

  startRollingSuggestions(): void {
    this.intervalId = setInterval(() => {
      this.enableSearchTransition = true;
      this.currentSuggestionIndex++;

      const lastIndex = this.rollingSuggestions.length - 1;

      if (this.currentSuggestionIndex === lastIndex) {
        this.resetTimeoutId = setTimeout(() => {
          this.enableSearchTransition = false;
          this.currentSuggestionIndex = 0;
        }, 360);
      }
    }, 1800);
  }

  goBack(): void {
    this.location.back();
  }

  updateSearch(): void {
    const query = this.searchQuery.trim();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: query ? { q: query } : {},
      replaceUrl: true
    });
  }

  usePastSearch(search: string): void {
    this.searchQuery = search;
    this.updateSearch();
    this.searchInput.nativeElement.focus();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.updateSearch();
    this.searchInput.nativeElement.focus();
  }
}