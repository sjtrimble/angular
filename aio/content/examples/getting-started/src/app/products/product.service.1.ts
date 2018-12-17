// #docplaster
import { Injectable } from '@angular/core';
// #docregion rxjs-imports
import { Observable, of } from 'rxjs';
// #enddocregion rxjs-imports
// #docregion product-import
import { Product } from './product';
// #enddocregion product-import

// #docregion provider
// #docregion product-data
@Injectable({
  providedIn: 'root'
})
export class ProductService {
// #enddocregion product-data
/* tslint:disable:quotemark */
// #enddocregion provider
// #docregion product-data
  data = {
    "products": [
      {
        "id": 1,
        "name": "Pixel 3 XL",
        "price": "799",
        "description": "A large phone with one of the best screens",
        "categories": ["phones"]
      },
      {
        "id": 2,
        "name": "Pixel 3",
        "price": "699",
        "description": "A great phone with one of the best cameras",
        "categories": ["phones"]
      }
    ]
  };
// #enddocregion product-data
/* tslint:enable:quotemark */
// #docregion product-data
  getAll(): Observable<Product[]> {
    return of(this.data.products);
  }
  // #docregion provider
}
// #enddocregion product-data
// #enddocregion provider
// #docregion
