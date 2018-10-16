import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products = [
    { name: 'Pixel 2 XL', price: '$4.99' },
    { name: 'Pixel 2', price: '$4.98' },
  ];
  @Output() buy = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}