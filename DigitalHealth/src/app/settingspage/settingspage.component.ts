import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { samePassword } from '../shared/customValidator/samePassword';

@Component({
  selector: 'app-settingspage',
  templateUrl: './settingspage.component.html',
  styleUrls: ['./settingspage.component.css'],
})
export class SettingspageComponent implements OnInit {
  accountFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.accountFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      eMailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', Validators.required],
      passwordBestätigungCtrl: ['', [samePassword]],
    });
  }
}
