import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  description;
  price: string;
  categories: string[];
}

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