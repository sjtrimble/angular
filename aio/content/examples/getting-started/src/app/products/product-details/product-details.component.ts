import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product$: Observable<Product>;
  showForm = false;
  purchased = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.product$ = this.route.paramMap
      .pipe(
        switchMap(params => this.productService.getOne(+params.get('productId')))
      );
  }

  onBuy() {
    this.showForm = true;
  }

  onSubmit(formData: any, product: Product) {
    this.showForm = false;
    this.purchased = true;

    console.log('Submitted', formData, product);
  }
}