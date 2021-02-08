import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardGuard implements CanActivate {
  constructor(
    private authService: UserServiceService,
    private router: Router
  ) {}

  /**
   * Can activate authentication guard that blocks access to user profiles
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.currentUserValue();

    if (user != null) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
