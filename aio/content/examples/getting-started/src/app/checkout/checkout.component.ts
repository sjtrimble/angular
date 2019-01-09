// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
// #docregion forms-imports
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// #enddocregion forms-imports

// #docregion cart-imports
import { CartService, CartItem } from '../cart.service';
// #enddocregion cart-imports

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
// #docregion cart-items
export class CheckoutComponent implements OnInit {
  items: CartItem[];
// #enddocregion cart-items

// #docregion checkout-form
  checkoutForm: FormGroup;
// #enddocregion checkout-form

// #docregion cart-service, formbuilder
  constructor(
    private fb: FormBuilder,
    private cartService: CartService
  ) {
// #enddocregion cart-service
// #docregion checkout-form-group
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
// #enddocregion checkout-form-group, formbuilder
// #docregion cart-service
  }
// #enddocregion cart-service

// #docregion on-init
  ngOnInit() {
    this.cartService.all()
      .subscribe(items => this.items = items);
  }
// #enddocregion on-init

// #docregion on-submit
  onSubmit(customerData: any) {
    const checkoutData = {
      customer: customerData,
      items: this.items
    };

    // Do something with the checkout data here
    console.log(checkoutData);
  }
// #enddocregion on-submit
// #docregion cart-items
}
// #enddocregion cart-items
