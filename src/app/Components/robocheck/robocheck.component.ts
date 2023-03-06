import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-robocheck',
  templateUrl: './robocheck.component.html',
  styleUrls: ['./robocheck.component.css']
})
export class RobocheckComponent {
  @Output() correctAnswer: EventEmitter<any> = new EventEmitter();

  protected matcher = new MyErrorStateMatcher();
  protected resultControl = new FormControl('', [Validators.required, Validators.pattern('^\\d{1,2}$')]);

  protected firstNumber: number = this.generateRandomNumber()
  protected lastNumber: number = this.generateRandomNumber()

  generateRandomNumber(): number {
    return Math.floor(Math.random() * (10 - 1) + 1)
  }

  checkResult(field: any) {
    let result = field.target.value

    if(this.firstNumber + this.lastNumber != result) {
      this.resultControl.setErrors({
        'result': true
      })

      this.correctAnswer.emit(false)
      return
    }

    this.correctAnswer.emit(true)
  }
}
