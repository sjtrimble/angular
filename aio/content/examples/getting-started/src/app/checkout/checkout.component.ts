import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items$: Observable<any[]>;
  checkoutForm: FormGroup;

  constructor(private cartService: CartService, private fb: FormBuilder) {
    this.items$ = cartService.all();
    this.checkoutForm = fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  submit(customerData: any) {
    this.cartService.all().subscribe(items => {
      const checkoutData = {
        customer: customerData,
        items
      };
      
      // Do something with the checkout data here
      console.log(checkoutData);
    });
  }  

}
