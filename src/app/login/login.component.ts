import { Component } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name = "";
  password = "";

  constructor(private http:Http){}

  onSubmit(){

    let params = new URLSearchParams();
    params.set('name', this.name);
    params.set('password', this.password);

    console.log(this.name);
    console.log(this.password);

    this.http.post('http://localhost:3000/api/login', params, {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error)
      }
    );
  }
}