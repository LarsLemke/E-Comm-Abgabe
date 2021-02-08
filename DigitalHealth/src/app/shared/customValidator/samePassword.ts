import { AbstractControl } from '@angular/forms';

export function samePassword(control: AbstractControl) {
  if (control.parent) {
    const checkpassword = control.parent.get('passwordCtrl').value;
    if (control.value === checkpassword) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }
}
