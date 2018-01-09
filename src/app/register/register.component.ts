import { Component } from '@angular/core';

@Component({
  selector: 'homepage',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nav_flag = false;
  nav_state(){
    if(this.nav_flag == false){
      this.nav_flag = true;
    }else{
      this.nav_flag = false;
    }
  }
}
