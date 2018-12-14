// #docplaster
import { Component } from '@angular/core';
// #docregion rxjs-imports
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// #enddocregion rxjs-imports
// #docregion activated-route-import
import { ActivatedRoute } from '@angular/router';
// #enddocregion activated-route-import

// #docregion product-imports
import { ProductService } from '../product.service';
import { Product } from '../product';
// #enddocregion product-imports

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
// #docregion product, flags
export class ProductDetailsComponent {
// #enddocregion flags
  product$: Observable<Product>;
// #enddocregion product
// #docregion flags
  showForm = false;
  purchased = false;
// #enddocregion flags

// #docregion product-details
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.product$ = this.route.paramMap
      .pipe(
        switchMap(params => this.productService.getOne(+params.get('productId')))
      );
  }
// #enddocregion product-details

// #docregion buy
  onBuy() {
    this.showForm = true;
  }
// #enddocregion buy

// #docregion on-submit
  onSubmit(formData: any, product: Product) {
    this.showForm = false;
    this.purchased = true;

    // Do something with form and customer data
  }
// #enddocregion on-submit
// #docregion product, product-details, flags
}
// #enddocregion product, product-details, flags
