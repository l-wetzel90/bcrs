import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../Models/user.model';

const apiUrl = 'http://localhost:5000/api/v1';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  // Register new user
  register(user: User): Observable<User> {
    return this.http.post<User>(`${apiUrl}/auth/register`, user);
  }

  // Log user in
  login(credentials): Observable<any> {
    return this.http.post<any>(`${apiUrl}/auth/login`, credentials);
  }

  // Get currently logged in user
  me(): Observable<User> {
    return this.http.get<User>(`${apiUrl}/auth/me`);
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${apiUrl}/users`);
  }

  // Create new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${apiUrl}/users`, user);
  }

  // Get user by id
  getUser(user: User): Observable<User> {
    return this.http.get<User>(`${apiUrl}/users/${user._id}`);
  }

  // Update user
  updateUser(user: User): Observable<string> {
    return this.http.put(`${apiUrl}/user/${user._id}`, user, { responseType: 'text' });
  }

  // Set user to disabled
  deleteUser(user: User): Observable<string> {
    return this.http.delete(`${apiUrl}/users/${user._id}`, { responseType: 'text' });
  }
}
