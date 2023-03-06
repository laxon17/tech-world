import { Component, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input() messageBody: string = '';

  protected emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  protected nameFormControl = new FormControl('', [Validators.required, Validators.pattern('^([A-Z]{1}[a-z]{2,20})\\s{1}([A-Z]{1}[a-z]{2,30})$')]);
  protected matcher = new MyErrorStateMatcher();
  protected hasMessageError: boolean = false;
  protected messageError: string = '';

  constructor(private router: Router) { }

  checkMessage(): boolean {
      if(this.messageBody.length < 5 || this.messageBody.length > 250) {
        this.hasMessageError = true;
        this.messageError = 'Message field should be between 5 and 250 characters long!'
        return false
      }

      this.hasMessageError = false;
      this.messageError = ''

      return true
  }

  checkForm(): void {
    if(! this.checkMessage() || this.nameFormControl.errors || this.emailFormControl.errors) {
      return
    }

    alert('You contacted us successfully! You will hear from us soon. Have a good day!')

    this.router.navigate(['/index'])
  }
}
