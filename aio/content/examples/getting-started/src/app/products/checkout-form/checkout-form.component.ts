import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent {
  @Output() submit = new EventEmitter();

  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onSubmit(customerData: any) {
    this.submit.emit(customerData);
  }
}