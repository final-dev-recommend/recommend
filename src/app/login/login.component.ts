import { Component } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name = '';
  password = '';

  constructor(private http:Http){}

    onSubmit(){
      let ps = new URLSearchParams();
      ps.set('name', this.name);
      ps.set('password', this.password);

      this.http.post('http://localhost:3000/api/login', { name: this.name }, {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      }).subscribe(
        params => console.log(params),
        error => console.log(error) 
      ) ;

    //   this.http.get('http://localhost:3000/api/login', {
    //     params: {name: this.name}
    //   }).subscribe(
    //       response => {
    //         this.result = response.text();
    //       },
    //       error => {
    //         this.result = '通信失敗:${error.statusText}';
    //       }
    //   )
    }
  nav_flag = false;
  nav_state(){
    if(this.nav_flag == false){
      this.nav_flag = true;
    }else{
      this.nav_flag = false;
    }
  }
}
