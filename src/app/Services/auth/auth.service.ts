/**
 * Title: Services/auth/auth.service.ts
 * Author: Nathaniel Liebhart
 * Description: bcrs
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from '../user.service';
import { User } from '../../Models/user.model';

import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  jwtHelper: JwtHelperService = new JwtHelperService();

  currentUser: User = new User();

  constructor(private userService: UserService, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(usernameAndPassword) {
    return this.userService.login(usernameAndPassword).pipe(
      map((res) => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        // console log to see what is in the decodedUser
        console.log(decodedUser);
        return this.loggedIn;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token: string) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin' ? (this.isAdmin = true) : (this.isAdmin = false);
    delete decodedUser.role;
  }
}
