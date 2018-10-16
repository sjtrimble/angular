import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  storeName = 'Anything Store';
  products = [
    {product: 'Shoes', description: "A great pair of shoes"},
    {product: 'Pixel 2 XL', description: "A great phone with one of the best cameras"},
  ]
}
