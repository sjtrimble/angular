import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: { [productId: number]: number } = { };

  constructor(private productsService: ProductsService) {}

  all() {
    return this.productsService.all()
      .pipe(map(products => {
        const ids = Object.keys(this.items);

        return ids.map(id => {
          const product = products.find(prod => prod.id === +id);
          const quantity = this.items[id];

          return { id, product, quantity };
        });
    }));
  }

  add(id: number) {
    if (this.items[id]) {
      this.items[id]++;
    } else {
      this.items[id] = 1;
    }
  }

  remove(id: number) {
    if (this.items[id]) {
      this.items[id]--;
    }
  }

  update(id: number, quantity: number) {
    if (quantity >= 0) {
      this.items[id] = quantity;
    }
  }
}
