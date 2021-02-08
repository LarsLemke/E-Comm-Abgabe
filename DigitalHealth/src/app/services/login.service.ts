import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public login: Observable<boolean>;

  subject = new Subject();

  constructor(private router: Router) {
    this.subject.next(true);
  }
  changeLoginStatus(boo: boolean) {
    if (boo) {
      this.router.navigateByUrl('/');
    }
    this.subject.next(boo);
  }
}
