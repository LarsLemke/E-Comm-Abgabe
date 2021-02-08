import { AccountService } from './../../services/account.service';
import { AbstractControl } from '@angular/forms';

export class ExistingMail {
  constructor(private accountService: AccountService) {}
  checkEmail(control: AbstractControl) {
    if (control.parent != undefined) {
      this.accountService
        .accountCheck(control.value)
        .subscribe((mailexisting) => {
          if (mailexisting) {
            return { invalidPassword: true };
          } else {
            return null;
          }
        });
    }
  }
}
