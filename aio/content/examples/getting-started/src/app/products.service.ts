import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  all() {
    return this.http.get<{ products: Product[] }>('/assets/products.json')
      .pipe(map(data => data.products));
  }

  getProduct(id: number) {
    return this.all().pipe(map(products => products.find(product => product.id === id)));
  }
}
