import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppUser } from './models/app-user';

@Injectable()
export class AuthService {

  user$:Observable<firebase.User>;
  constructor(private afAuth:AngularFireAuth,private route:ActivatedRoute,
    private router:Router,private userService: UserService) 
  { 
    this.user$=afAuth.authState;
  }

  loginWithGoogle():boolean
  {
    let flag=false;
    let returnURL= this.route.snapshot.queryParamMap.get('returnURL')||'/';
    localStorage.setItem('returnURL',returnURL);
    console.log(localStorage.getItem('returnURL'))
     this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
     this.afAuth.auth.getRedirectResult().then(result => {
      if (result.user) {
        this.router.navigateByUrl(localStorage.getItem('returnURL'));
        flag = true;
      }
      
     });
     console.log('login with google'+flag)
    return flag;
  }
  logout()
  {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }

  /*get appUserAdmin$():boolean{
      this.user$.subscribe(
      user=>{
        console.log(user.uid);
        this.userService.get(user.uid).valueChanges().subscribe(
          x=> {
            let a:AppUser=<AppUser>x;
            console.log(a.isAdmin);
            return a.isAdmin;
          }
        );
        })
        return false;
  }*/

}
