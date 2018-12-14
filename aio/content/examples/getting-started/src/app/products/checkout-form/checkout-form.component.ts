// #docplaster
// #docregion
// #docregion core-imports
import { Component, Output, EventEmitter } from '@angular/core';
// #enddocregion core-imports
// #docregion forms-imports
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// #enddocregion forms-imports

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent {
// #docregion submit
  @Output() submit = new EventEmitter();
// #enddocregion submit

// #docregion checkout-form
  checkoutForm: FormGroup;
// #enddocregion checkout-form

// #docregion formbuilder
  constructor(private fb: FormBuilder) {
    this.checkoutForm = fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
// #enddocregion formbuilder

// #docregion on-submit
  onSubmit(customerData: any) {
    this.submit.emit(customerData);
  }
// #enddocregion on-submit
}
