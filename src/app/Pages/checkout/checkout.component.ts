import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ProductTools } from 'src/app/ProductTools';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  protected matcher = new MyErrorStateMatcher();
  protected cardNumberControl = new FormControl('', [Validators.required, Validators.pattern('^([0-9]{4}-){3}[0-9]{4}$')]);
  protected expiryDateControl = new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/(2[3-9])$')]);
  protected cvvControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')]);
  protected nameFormControl = new FormControl('', [Validators.required, Validators.pattern('^([A-Z]{1}[a-z]{2,20})\\s{1}([A-Z]{1}[a-z]{2,30})$')]);
  private resultCorrect: boolean = false;

  constructor(private router: Router) { }

  setAnswerTrue(answer: boolean): void {
    this.resultCorrect = answer
  }

  checkForm() {
    if(
      ! this.resultCorrect ||
      this.nameFormControl.errors ||
      this.cvvControl.errors ||
      this.expiryDateControl.errors ||
      this.cardNumberControl.errors
    ) {
      return
    }

    alert('Your payment was successfull. Have a good day!')

    ProductTools.emptyCollection('cart')
    
    this.router.navigate(['/index'])
  }
}
