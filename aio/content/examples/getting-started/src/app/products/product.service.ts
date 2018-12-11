import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<{ products: Product[] }>('/assets/products.json')
      .pipe(map(data => data.products));
  }

  getOne(productId: number) {
    return this.getAll()
      .pipe(
        map(products => products.find(product => product.id === productId))
      );
  }
}