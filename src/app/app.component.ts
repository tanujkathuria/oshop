import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
constructor(private userService:UserService,private authService:AuthService,router:Router){

  authService.user$.subscribe(user=>{
  if(user)
  {
  userService.save(user);
  let returnURL=localStorage.getItem('returnURL');
  console.log(returnURL);
  if(returnURL){
    localStorage.removeItem('returnURL');
    router.navigateByUrl(returnURL);
  } 

}

  }

  )

}


}
