import { environment } from './../../environments/environment.prod';
import { User } from './../models/user-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Register } from '../models/register-model';
import { Router } from '@angular/router';

@Injectable()
export class UserServiceService {
  url = environment.production ? environment.prod_url : environment.dev_url;

  private currentUserSubject: BehaviorSubject<User>;
  private currentRegisterSubject: BehaviorSubject<Register>;

  public currentUser: Observable<User>;
  public currentRegister: Observable<Register>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentRegisterSubject = new BehaviorSubject<Register>(
      JSON.parse(localStorage.getItem('registerForm'))
    );
    this.currentRegister = this.currentRegisterSubject.asObservable();
  }

  loginUserCheck(user: User): Observable<boolean> {
    return this.http.post<boolean>(this.url + '/user/login', { user });
  }

  registerUser(register: Register): Observable<boolean> {
    return this.http.post<boolean>(this.url + '/user/register', { register });
  }

  getUserData(user: User): Observable<User> {
    return this.http.get<User>(this.url + '/user/' + user.email);
  }

  logout() {
    //localStorage.removeItem('currentUser');
    localStorage.clear();
    this.currentUserSubject.next(null);
    console.log(this.currentUser);

    this.router.navigate(['/']);
  }

  setLocalStorage(user: User) {
    this.getUserData(user).subscribe((user) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    });
  }
  public currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  addRegistertoLocalStore(register: Register) {
    localStorage.setItem('registerForm', JSON.stringify(register));
    this.currentRegisterSubject.next(register);
  }

  public currentRegisterValue(): Register {
    return this.currentRegisterSubject.value;
  }
}
