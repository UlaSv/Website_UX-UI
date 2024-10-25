import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    RadioButtonModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
      gender: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      birthdate: new FormControl(',', Validators.required),
      address: new FormGroup({
        street: new FormControl('', Validators.required),
        streetNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
        postalCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
        city: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
      }),
  });
  countries = [
    { name: 'Lithuania', code: 'LT' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Finland', code: 'FIN' },
    { name: 'Sweden', code: 'SWE' },
    { name: 'Iceland', code: 'IS' },
  ];
  maxDate: Date = new Date();
  get gender() {
    return this.registerForm.get('gender');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get birthdate() {
    return this.registerForm.get('birthdate');
  }

  get address() {
    return this.registerForm.get('address') as FormGroup;
  }

  get street() {
    return this.address.get('street');
  }

  get streetNumber() {
    return this.address.get('streetNumber');
  }

  get postalCode() {
    return this.address.get('postalCode');
  }

  get city() {
    return this.address.get('city');
  }

  get country() {
    return this.address.get('country');
  }
}