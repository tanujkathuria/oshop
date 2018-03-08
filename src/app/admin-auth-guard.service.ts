import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database';

@Injectable()
export class AdminAuthGuardService implements CanActivate
{
  constructor(private router:Router,private authService:AuthService,private userService : UserService) 
  { 

  }

      
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> 
  {

    return this.authService.user$.map(
      user=>{
        if(user.email == 'tanujkathuria.kathuria@gmail.com' )
        {
          console.log(user);
          if(user.email)
            return true;
        }
        this.router.navigate(['/login'],{queryParams:{returnURL: state.url}});
        return false;
        })
    
  }
 



}
