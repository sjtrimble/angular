// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
// #docregion rxjs-import
import { Observable } from 'rxjs';
// #enddocregion rxjs-import

// #docregion product-imports
import { ProductService } from '../product.service';
import { Product } from '../product';
// #enddocregion product-imports

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
// #docregion products-observable
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();
  }
// #enddocregion products-observable

  ngOnInit() {

  }
// #docregion products-observable
}
// #enddocregion products-observable

