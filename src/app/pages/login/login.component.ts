import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  constructor(private router:Router, private fb:FormBuilder, private accountService:AccountService, private alertController: AlertController) { }

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.email, Validators.required]),
    password : new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]{8,}')])

  });

  ngOnInit() {}

  toRegister() {
    //console.log('toRegister');
    this.router.navigate(['/register']);
  }

  submitLoginForm(){
    this.accountService.loginUser(this.loginForm.value).subscribe({
      next: (resp:any) => {
        //console.log(resp);
        localStorage.setItem('token', resp['token']);
        this.router.navigate(['/home/tabs/tab1']);
      },
      error: async error => {
        //console.error(error);
        const alert = await this.alertController.create({
          header: 'Error',
          message: error.error,
          buttons: ['OK']
        })
        alert.present();
      }
    })
  }

}
