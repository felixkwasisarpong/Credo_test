
import { Component, AfterContentChecked, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  title = 'SignUp';
  register: any;
  power:any;
  show: boolean = false;
 
  get name() {
    return this.register.get("name");
  }

  get email() {
    return this.register.get("email");
  }

  get date() {
    return this.register.get("date");
  }
  get phone() {
    return this.register.get("phone");
  }


  constructor(public fb: FormBuilder) {
    this.register = this.fb.group({
      email: ['', {
        validators: [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        ],
        updateOn: 'change'
      }],
      name: ['', {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ],

        updateOn: 'change'
      }],
      date: ['', {
        validators: [
          Validators.required,
        ],
      }],
      phone: ['', {
        validators: [
          Validators.required,
          Validators.pattern(/^(\+\d{1}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{2}[\s.-]\d{2}$/)
        ],
        updateOn: 'change'
      }],
      password: ['', {
        validators: [
          Validators.required,
        ],
        updateOn: 'change'
      }],
    })

  }
  ngAfterContentChecked(): void {
    
  }

  onStrengthChanged(strength:number) {
    console.log('password strength = ', strength);
    switch (true) {
      case isNaN(strength):
        this.power = "Not a Strength";
        break;
      case (strength <= 20):
        this.power = "Weak Password"
        break;
      case (strength <= 80):
        this.power = "Moderate Password"
        break;
      default:
        this.power = "Strong Password"
        break;

    };
    return this.power;
  }

}




