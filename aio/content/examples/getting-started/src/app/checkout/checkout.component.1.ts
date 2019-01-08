// #docplaster
// #docregion
// #docregion core-imports
import { Component, OnInit } from '@angular/core';
// #enddocregion core-imports
// #docregion forms-imports
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// #enddocregion forms-imports

import { CartService, CartItem } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
// #docregion checkout-form
export class CheckoutComponent {
// #enddocregion checkout-form  
  items: CartItem[];

// #docregion checkout-form
  checkoutForm: FormGroup;
// #enddocregion checkout-form

// #docregion formbuilder
  constructor(private fb: FormBuilder, private cartService: CartService) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
// #enddocregion formbuilder

// #docregion on-submit
  submit(customerData: any) {
    const checkoutData = {
      customer: customerData,
      items: this.items
    };
    
    // Do something with the checkout data here
    console.log(checkoutData);
  }  
// #enddocregion on-submit
// #docregion checkout-form
}
// #enddocregion checkout-form
