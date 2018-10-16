import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  @Output() buy = new EventEmitter();

  constructor(productsService: ProductsService, private cartService: CartService) {
    this.products$ = productsService.all();
  }

  ngOnInit() {
  }

  onBuy(id: number) {
    this.cartService.add(id);
  }
}