import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductDetailsComponent } from './productDetails/productDetails.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'HomePage' }
  },
  {
    path: 'search',
    component: SearchComponent,
    data: { animation: 'SearchPage' }
  },
  {
    path: 'category/:categoryName',
    component: CategoriesComponent,
    data: { animation: 'CategoryPage' }
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    data: { animation: 'ProductPage' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
