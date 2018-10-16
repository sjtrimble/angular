import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent implements OnInit {
// #docregion inputs-outputs
  @Input() product: Product;
  @Output() buy = new EventEmitter();
// #enddocregion inputs-outputs

  constructor() { }

  ngOnInit() {
  }

  buyProduct(id: number) {
    this.buy.emit(id);
  }

}