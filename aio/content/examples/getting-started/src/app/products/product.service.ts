// #docplaster
// #docregion
import { Injectable } from '@angular/core';
// #docregion httpclient
import { HttpClient } from '@angular/common/http';
// #enddocregion httpclient
// #docregion rxjs-import
import { map } from 'rxjs/operators';
// #enddocregion rxjs-import

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
// #docregion httpclient-inject
  constructor(private http: HttpClient) { }
// #enddocregion httpclient-inject

// #docregion httpclient-get-all
  getAll() {
    return this.http.get<{ products: Product[] }>('/assets/products.json')
      .pipe(map(data => data.products));
  }
// #enddocregion httpclient-get-all

// #docregion httpclient-get-one
  getOne(productId: number) {
    return this.getAll()
      .pipe(
        map(products => products.find(product => product.id === productId))
      );
  }
// #enddocregion httpclient-get-one
}
