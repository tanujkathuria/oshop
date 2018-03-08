import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/Map';

@Injectable()
export class AuthGuardService implements CanActivate  
{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> 
  {
   return this.authService.user$.map(
      user=>{
        if(user)return true;
        this.router.navigate(['/login'],{queryParams:{returnURL: state.url}});
        return false;
        })

  }

  constructor(private authService:AuthService,private router:Router) { }

}
