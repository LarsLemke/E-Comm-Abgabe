import { KiService } from './../services/ki.service';
import { LoginService } from './../services/login.service';
import { AccountService } from './../services/account.service';
import { ExistingMail } from './../shared/customValidator/checkMail';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../models/account-model';
import { Beruf } from '../models/beruf-model';
import { Health } from '../models/healt-model';
import { Payment } from '../models/payment-model';
import { Register } from '../models/register-model';
import { User } from '../models/user-model';
import { UserServiceService } from '../services/user-service.service';

import { samePassword } from '../shared/customValidator/samePassword';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit, AfterViewChecked {
  isLinear = false;
  accountFormGroup: FormGroup;
  berufFormGroup: FormGroup;
  gesundheitFormGroup: FormGroup;
  paymentFormGroup: FormGroup;
  register = {} as Register;
  mailexists: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private userservice: UserServiceService,
    private accountService: AccountService,
    private router: Router,
    private loginService: LoginService,
    private kiService: KiService
  ) {}
  ngAfterViewChecked() {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.accountFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      eMailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', Validators.required],
      passwordBestätigungCtrl: ['', [samePassword]],
    });
    this.berufFormGroup = this._formBuilder.group({
      silderComputerCtrl: [0, Validators.required],
      silderBewegungCtrl: [0, Validators.required],
      silderAutoCtrl: [0, Validators.required],
      silderHebenCtrl: [0, Validators.required],
      silderSitzenCtrl: [0, Validators.required],
    });
    this.gesundheitFormGroup = this._formBuilder.group({
      schmerzenRückenCtrl: [0, Validators.required],
      schmerzenNackenCtrl: [0, Validators.required],
      schmerzenHandgelenkCtrl: [0, Validators.required],
      schmerzenKnieCtrl: [0, Validators.required],
      schmerzenHüfteCtrl: [0, Validators.required],
      schmerzenSchulterCtrl: [0, Validators.required],
      schmerzenFußgelenkeCtrl: [0, Validators.required],
      toggelBeweglichketCtrl: [0, Validators.required],
      schmerzenBrennenCtrl: [false, Validators.required],
      schmerzenKribbelnCtrl: [false, Validators.required],
      schmerzenTaubheitCtrl: [false, Validators.required],
      schmerzenÜberempfindlichkeitCtrl: [false, Validators.required],
      schmerzenNadelnCtrl: [false, Validators.required],
      toggelkraftCtrl: [false, Validators.required],
      schmerzenArbeitenCtrl: [false, Validators.required],
      schmerzenLaufenCtrl: [false, Validators.required],
      schmerzenBückenCtrl: [false, Validators.required],
      schmerzenStressCtrl: [false, Validators.required],
      schmerzenWetterCtrl: [false, Validators.required],
      schmerzenSpringenCtrl: [false, Validators.required],
    });
    this.paymentFormGroup = this._formBuilder.group({
      paymentCtrl: [''],
    });
  }

  goForward(stepper: MatStepper) {
    console.log(this.accountFormGroup.get('eMailCtrl').value);

    this.accountService
      .accountCheck(this.accountFormGroup.get('eMailCtrl').value)
      .subscribe((mailexisting) => {
        console.log(mailexisting);

        if (mailexisting) {
          this.mailexists = true;
        } else {
          this.mailexists = false;
          stepper.next();
        }
      });
  }

  saveRegister() {
    const register: Register = {} as Register;
    //alle müssen aufeinmal valid sein
    if (
      this.berufFormGroup.valid &&
      this.gesundheitFormGroup.valid &&
      this.accountFormGroup.valid &&
      this.paymentFormGroup.valid
    ) {
      const user: User = this.getUser();

      const acc: Account = this.getAccount();

      const beruf: Beruf = this.getBeruf();

      const gesundheit: Health = this.getGesundheit();

      const payment: Payment = this.getPayment();

      register.account = acc;
      register.beruf = beruf;
      register.user = user;
      register.health = gesundheit;
      register.payment = payment;

      register.account.playlist = this.playlist;
      //  this.paypalservice
      // .triggerPayPalSubscription(price, 'Das ist eine schöne Beschreibung')
      // .subscribe((url) => {
      //   window.open(url.url, '_blank');
      //   console.log('paypal link' + url.url);
      // });

      this.userservice.registerUser(register).subscribe((register) => {
        if (register) {
          this.userservice.setLocalStorage(user);
          this.accountService.setLocalStorage(user.email);
          this.loginService.changeLoginStatus(false);
          this.router.navigateByUrl('/profile');
        }
      });
    }
  }

  private playlist;
  getPlaylist() {
    console.log('register get playlist');

    const gesundheit: Health = this.getGesundheit();
    const beruf: Beruf = this.getBeruf();
    this.kiService
      .createUebergabeCSV(beruf, gesundheit)
      .subscribe((UebergabeCSV) => {
        console.log('CSV erstellt');

        if (UebergabeCSV) {
          this.kiService.getRecPlaylist().subscribe((playlist) => {
            this.playlist = playlist + '';
            console.log(playlist);
          });
        }
      });
  }
  getPayment(): Payment {
    const pay: Payment = {} as Payment;
    return pay;
  }
  getGesundheit(): Health {
    const health: Health = {} as Health;

    health.schmerzenRuecken = this.gesundheitFormGroup.get(
      'schmerzenRückenCtrl'
    ).value;
    health.schmerzenNacken = this.gesundheitFormGroup.get(
      'schmerzenNackenCtrl'
    ).value;
    health.schmerzenHandgelenk = this.gesundheitFormGroup.get(
      'schmerzenHandgelenkCtrl'
    ).value;
    health.schmerzenKnie = this.gesundheitFormGroup.get(
      'schmerzenKnieCtrl'
    ).value;
    health.schmerzenHuefte = this.gesundheitFormGroup.get(
      'schmerzenHüfteCtrl'
    ).value;
    health.schmerzenSchulter = this.gesundheitFormGroup.get(
      'schmerzenSchulterCtrl'
    ).value;
    health.schmerzenFussgelenke = this.gesundheitFormGroup.get(
      'schmerzenFußgelenkeCtrl'
    ).value;
    health.toggelBeweglichket = this.gesundheitFormGroup.get(
      'toggelBeweglichketCtrl'
    ).value;
    health.schmerzenHuefte = this.gesundheitFormGroup.get(
      'schmerzenHüfteCtrl'
    ).value;
    health.schmerzenBrennen = this.gesundheitFormGroup.get(
      'schmerzenBrennenCtrl'
    ).value;
    health.schmerzenKribbeln = this.gesundheitFormGroup.get(
      'schmerzenKribbelnCtrl'
    ).value;
    health.schmerzenTaubheit = this.gesundheitFormGroup.get(
      'schmerzenTaubheitCtrl'
    ).value;
    health.schmerzenUeberempfindlichkeit = this.gesundheitFormGroup.get(
      'schmerzenÜberempfindlichkeitCtrl'
    ).value;
    health.schmerzenNadeln = this.gesundheitFormGroup.get(
      'schmerzenNadelnCtrl'
    ).value;
    health.toggelkraft = this.gesundheitFormGroup.get('toggelkraftCtrl').value;
    // health.schmerzenFeld = this.gesundheitFormGroup.get(
    //   'schmerzenFeldCtrl'
    // ).value;
    health.toggelkraft = this.gesundheitFormGroup.get(
      'schmerzenArbeitenCtrl'
    ).value;
    health.schmerzenLaufen = this.gesundheitFormGroup.get(
      'schmerzenLaufenCtrl'
    ).value;
    health.schmerzenBuecken = this.gesundheitFormGroup.get(
      'schmerzenBückenCtrl'
    ).value;
    health.schmerzenStress = this.gesundheitFormGroup.get(
      'schmerzenStressCtrl'
    ).value;
    health.schmerzenWetter = this.gesundheitFormGroup.get(
      'schmerzenWetterCtrl'
    ).value;
    health.schmerzenSpringen = this.gesundheitFormGroup.get(
      'schmerzenSpringenCtrl'
    ).value;

    return health;
  }
  getBeruf(): Beruf {
    const beruf: Beruf = {} as Beruf;
    beruf.computer = this.berufFormGroup.get('silderComputerCtrl').value;
    beruf.bewegung = this.berufFormGroup.get('silderBewegungCtrl').value;
    beruf.auto = this.berufFormGroup.get('silderAutoCtrl').value;
    beruf.heben = this.berufFormGroup.get('silderHebenCtrl').value;
    beruf.sitzen = this.berufFormGroup.get('silderSitzenCtrl').value;
    return beruf;
  }
  getAccount(): Account {
    const account: Account = {} as Account;
    account.email = this.accountFormGroup.get('eMailCtrl').value;
    account.name = this.accountFormGroup.get('nameCtrl').value;
    account.lastName = this.accountFormGroup.get('lastNameCtrl').value;
    account.history = '';

    return account;
  }
  getUser(): User {
    const user: User = {} as User;
    user.email = this.accountFormGroup.get('eMailCtrl').value;
    user.password = this.accountFormGroup.get('passwordCtrl').value;
    return user;
  }

  //für den Thumbnail der Slider
  formatLabel(value: number | null) {
    return value;
  }
}
