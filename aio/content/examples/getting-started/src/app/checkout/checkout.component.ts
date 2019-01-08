import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CartService, CartItem } from '../cart.service';
import { Product } from '../products/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  items: CartItem[];
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder, private cartService: CartService) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cartService.all()
      .subscribe(items => this.items = items);
  }

  submit(customerData: any) {
    const checkoutData = {
      customer: customerData,
      items: this.items
    };
    
    // Do something with the checkout data here
    console.log(checkoutData);
  }  

}
