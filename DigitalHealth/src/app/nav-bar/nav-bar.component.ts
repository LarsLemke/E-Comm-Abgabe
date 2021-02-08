import { LoginService } from './../services/login.service';
import { AccountService } from './../services/account.service';
import { User } from './../models/user-model';
import { UserServiceService } from './../services/user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterPageComponent } from './../register-page/register-page.component';
import { ProfilePageComponent } from './../profile-page/profile-page.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { servicesVersion } from 'typescript';
import { SseHandlerService } from '../services/sse-handler.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  loginFormGroup: FormGroup;
  user: User = {} as User;
  loginWrong = false;
  notLogedIn = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private userservice: UserServiceService,
    private accountService: AccountService,
    private sseHandler: SseHandlerService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.subject.subscribe((next) => {
      this.notLogedIn = next as boolean;
      if (this.notLogedIn) {
        this.router.navigateByUrl('/');
      }
    });
    if (this.userservice.currentUserValue()) {
      this.loginService.changeLoginStatus(true);
    }

    this.loginFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
    });
  }
  navigate() {
    this.router.navigateByUrl('/');
  }
  onSubmit() {
    if (this.loginFormGroup.valid) {
      this.user.email = this.loginFormGroup.get('nameCtrl').value;
      this.user.password = this.loginFormGroup.get('passwordCtrl').value;
      console.log(this.user);

      this.userservice.loginUserCheck(this.user).subscribe((user) => {
        if (user) {
          this.userservice.setLocalStorage(this.user);
          this.accountService.setLocalStorage(this.user.email);
          this.loginWrong = false;
          // this.notLogedIn = false;
          this.loginService.changeLoginStatus(false);
        } else {
          this.loginWrong = true;
        }
      });
    }
  }
  profile() {
    this.router.navigateByUrl('/profile');
  }
  onLogout() {
    this.loginService.changeLoginStatus(true);
    // this.notLogedIn = true;
    this.userservice.logout();
  }
  onRegister() {
    this.router.navigateByUrl('/register');
  }
  settings() {
    this.router.navigateByUrl('/settings');
  }

  w3_open() {
    var x = document.getElementById('mySidebar');
    x.style.width = '300px';
    x.style.paddingTop = '10%';
    x.style.display = 'block';
  }

  // Close side navigation
  w3_close() {
    document.getElementById('mySidebar').style.display = 'none';
  }

  // Used to toggle the menu on smaller screens when clicking on the menu button
  openNav() {
    var x = document.getElementById('navDemo');
    if (x.className.indexOf('w3-show') == -1) {
      x.className += ' w3-show';
    } else {
      x.className = x.className.replace(' w3-show', '');
    }
  }
}
