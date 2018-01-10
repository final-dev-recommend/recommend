import { Component } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http:Http){}

  onSubmit(){
    let data = new FormData();

    this.http.post('http://localhost:3000/api/register', data)
    .subscribe(
      data => console.log(data),
      error => console.log(error) 
    ) 
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
