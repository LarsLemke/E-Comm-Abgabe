import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Account } from './../models/account-model';

@Injectable()
export class AccountService {
  private currentAccountSubject: BehaviorSubject<Account>;
  public currentAccount: Observable<Account>;

  url = environment.production ? environment.prod_url : environment.dev_url;
  constructor(private http: HttpClient, private router: Router) {
    this.currentAccountSubject = new BehaviorSubject<Account>(
      JSON.parse(localStorage.getItem('currentAcc'))
    );
    this.currentAccount = this.currentAccountSubject.asObservable();
  }

  getAccount(email: String): Observable<Account> {
    return this.http.post<Account>(this.url + '/user/getAccount/', { email });
  }
  accountCheck(email: string): Observable<boolean> {
    return this.http.post<boolean>(this.url + '/user/checkMail', { email });
  }
  edithistory(history): Observable<Account> {
    const email = this.currentAccValue().email;

    return this.http.post<Account>(this.url + '/user/editHistory/', {
      email,
      history,
    });
  }

  setLocalStorage(email: String) {
    this.getAccount(email).subscribe((acc) => {
      localStorage.setItem('currentAcc', JSON.stringify(acc));

      this.currentAccountSubject.next(acc);
      this.router.navigateByUrl('/profile');
    });
  }
  public currentAccValue(): Account {
    return this.currentAccountSubject.value;
  }
}
