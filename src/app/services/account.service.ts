import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const URL = environment.API;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor( private http:HttpClient, private router:Router ) { }

  register(userCredentials : any){

    this.http.post(`${URL}/api/account/register`, userCredentials).subscribe({
      next: resp => {
        this.router.navigate(['/']);
      },
      error: error => {
        //console.error(error);
        this.router.navigate(['/']);
      }
    })
  }

  loginUser(userCredentials : any){
    return this.http.post(`${URL}/api/account/login`, userCredentials);
  }

  checkToken(){
    let token = localStorage.getItem('token');
    if(!token){
      this.router.navigateByUrl('/');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    this.http.get(`${URL}/api/account/user`, {headers}).subscribe({
      next: (resp:any) => {
        if(!resp.ok){
          this.router.navigate(['/']);
        }
      },
      error: error => {
        this.router.navigate(['/']);
      }
    })
  }
}
