import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AccountService } from 'src/app/services/account.service';

export const checkPasswordMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return (password && confirmPassword && password.value != confirmPassword.value) && confirmPassword.value !== '' ? { passNoMatch: true } : null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  constructor(private router:Router,
    private fb:FormBuilder,
    private accountService : AccountService) {}

  ngOnInit() {}

  registerForm = this.fb.group({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]{8,}')]),
    confirmPassword: new FormControl('', [Validators.required])
  },
  {
    validators: checkPasswordMatch
  })

  backToLogin() {
    this.router.navigate(['/']);
  }

  submitForm(){
    this.accountService.register(this.registerForm.value);
  }
}
