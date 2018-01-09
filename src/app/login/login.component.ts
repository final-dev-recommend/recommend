import { Component } from '@angular/core';

@Component({
  selector: 'homepage',
  templateUrl: './login.component.html',
  styleUrls: ['./loigin.component.css']
})
export class LoginComponent {
  nav_flag = false;
  nav_state(){
    if(this.nav_flag == false){
      this.nav_flag = true;
    }else{
      this.nav_flag = false;
    }
  }
}
