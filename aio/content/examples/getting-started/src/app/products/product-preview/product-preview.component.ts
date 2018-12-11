// #docplaster
// #docregion
// #docregion core-imports
import { Component, OnInit, Input } from '@angular/core';
// #enddocregion core-imports
// #docregion product-imports
import { Product } from '../product';
// #enddocregion product-imports

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent implements OnInit {
// #docregion inputs-outputs
  @Input() product: Product;
// #enddocregion inputs-outputs
  ngOnInit() {}
}
