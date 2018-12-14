// #docplaster
// #docregion
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// #docregion reactive-forms-module
import { ReactiveFormsModule } from '@angular/forms';
// #enddocregion reactive-forms-module
// #docregion router-module
import { RouterModule } from '@angular/router';
// #enddocregion router-module

// #docregion components
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
// #enddocregion components

// #docregion reactive-module-imports, router-module-imports, declarations
@NgModule({
// #enddocregion declarations
  imports: [
// #enddocregion reactive-module-imports, router-module-imports
    CommonModule,
// #docregion reactive-module-imports
    // Other imports...
    ReactiveFormsModule,
// #enddocregion reactive-module-imports
// #docregion router-module-imports
    // Other imports...
    RouterModule.forChild([
      { path: ':productId', component: ProductDetailsComponent }
    ])
  ],
// #enddocregion router-module-imports
// #docregion declarations
  declarations: [
    ProductDetailsComponent,
    CheckoutFormComponent
  ]
// #docregion reactive-module-imports, router-module-imports
})
export class ProductsModule { }
// #enddocregion reactive-module-imports, router-module-imports, declarations
