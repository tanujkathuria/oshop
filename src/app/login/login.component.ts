import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private AuthService: AuthService) { }
  spinBar;

  ngOnInit() {
    this.spinBar=false;
  }
  login()
  {
   this.spinBar=true;
   let userLogin=this.AuthService.loginWithGoogle();
   if(userLogin){
     this.spinBar=false;
   }
  }


}
