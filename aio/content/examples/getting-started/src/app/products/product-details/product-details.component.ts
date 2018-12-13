// #docplaster
import { Component } from '@angular/core';
// #docregion rxjs-imports
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// #enddocregion rxjs-imports
// #docregion activate-route-import
import { ActivatedRoute } from '@angular/router';
// #enddocregion activated-route-import

// #docregion product-imports
import { ProductService } from '../product.service';
import { Product } from '../product';
// #enddocregion product-imports

// #docregion product-details
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product$: Observable<Product>;
// #enddocregion product-details  
  showForm = false;
  purchased = false;

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

  onBuy() {
    this.showForm = true;
  }

  onSubmit(formData: any, product: Product) {
    this.showForm = false;
    this.purchased = true;

    console.log('Submitted', formData, product);
  }
// #docregion product-details  
}
// #enddocregion product-details
