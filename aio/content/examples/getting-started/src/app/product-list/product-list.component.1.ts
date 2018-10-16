import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products = [
    { name: 'Pixel 3 XL', price: '799' },
    { name: 'Pixel 3', price: '699' },
  ];

  @Output() buy = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}