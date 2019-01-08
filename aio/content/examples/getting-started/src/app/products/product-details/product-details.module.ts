import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ProductDetailsComponent }
    ])
  ],
  declarations: [
    ProductDetailsComponent,
  ]
})
export class ProductDetailsModule { }
