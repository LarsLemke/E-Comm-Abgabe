import { KiService } from './../services/ki.service';
import { Register } from './../models/register-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Beruf } from '../models/beruf-model';

import { registerLocaleData } from '@angular/common';
import { KI } from '../models/ki-model';

@Component({
  selector: 'app-ki-page',
  templateUrl: './ki-page.component.html',
  styleUrls: ['./ki-page.component.css'],
})
export class KiPageComponent implements OnInit {
  done: boolean = false;
  gesundheitFormGroup: FormGroup;
  number: number = 0;
  value = 0;
  allKIBogen: KI[] = {} as KI[];
  constructor(
    private _formBuilder: FormBuilder,
    private kiservice: KiService
  ) {}

  ngOnInit(): void {
    //laden aller Bögen
    this.getAllBogejn();
  }
  formatLabel(value: number | null) {
    return value;
  }

  getAllBogejn() {
    this.kiservice.getAll().subscribe((kis) => {
      this.allKIBogen = kis;
      console.log(kis);

      this.setForm(0);
    });
  }
  setForm(i: number) {
    this.gesundheitFormGroup = this._formBuilder.group({
      silderComputerCtrl: [this.allKIBogen[i].computer],
      silderBewegungCtrl: [this.allKIBogen[i].bewegung],
      silderAutoCtrl: [this.allKIBogen[i].auto],
      silderHebenCtrl: [this.allKIBogen[i].heben],
      silderSitzenCtrl: [this.allKIBogen[i].sitzen],
      schmerzenRückenCtrl: [this.allKIBogen[i].schmerzenRuecken, ,],
      schmerzenNackenCtrl: [this.allKIBogen[i].schmerzenNacken, ,],
      schmerzenHandgelenkCtrl: [this.allKIBogen[i].schmerzenHandgelenk, ,],
      schmerzenKnieCtrl: [this.allKIBogen[i].schmerzenKnie, ,],
      schmerzenHüfteCtrl: [this.allKIBogen[i].schmerzenHuefte, ,],
      schmerzenSchulterCtrl: [this.allKIBogen[i].schmerzenSchulter, ,],
      schmerzenFußgelenkeCtrl: [this.allKIBogen[i].schmerzenFussgelenke, ,],
      toggelBeweglichketCtrl: [this.allKIBogen[i].toggelBeweglichket, ,],
      schmerzenBrennenCtrl: [this.allKIBogen[i].schmerzenBrennen, ,],
      schmerzenKribbelnCtrl: [this.allKIBogen[i].schmerzenKribbeln, ,],
      schmerzenTaubheitCtrl: [this.allKIBogen[i].schmerzenTaubheit, ,],
      schmerzenÜberempfindlichkeitCtrl: [
        this.allKIBogen[i].schmerzenUeberempfindlichkeit,
        ,
      ],
      schmerzenNadelnCtrl: [this.allKIBogen[i].schmerzenNadeln, ,],
      toggelkraftCtrl: [this.allKIBogen[i].toggelkraft],
      schmerzenArbeitenCtrl: [this.allKIBogen[i].schmerzenArbeiten, ,],
      schmerzenLaufenCtrl: [this.allKIBogen[i].schmerzenLaufen, ,],
      schmerzenBückenCtrl: [this.allKIBogen[i].schmerzenBuecken, ,],
      schmerzenStressCtrl: [this.allKIBogen[i].schmerzenStress, ,],
      schmerzenWetterCtrl: [this.allKIBogen[i].schmerzenWetter, ,],
      schmerzenSpringenCtrl: [this.allKIBogen[i].schmerzenSpringen, ,],
      BeineCtrl: [true, Validators.required],
      RueckenCtrl: [true, Validators.required],
      OberkoerperCtrl: [true, Validators.required],
    });
    if (this.allKIBogen[i].Beine) {
      this.done = true;
    } else {
      this.done = false;
    }
  }
  goto() {
    if (this.allKIBogen.length > this.value) {
      this.number = this.value;
      this.setForm(this.number);
    }
  }
  skip() {
    if (this.allKIBogen.length > this.number) {
      this.number++;
      this.setForm(this.number);
    }
  }
  speichern() {
    if (
      this.gesundheitFormGroup.get('BeineCtrl').touched ||
      this.gesundheitFormGroup.get('RueckenCtrl').touched ||
      this.gesundheitFormGroup.get('OberkoerperCtrl').touched
    ) {
      this.kiservice
        .updateID(
          this.allKIBogen[this.number]._id,
          this.gesundheitFormGroup.get('BeineCtrl').value,
          this.gesundheitFormGroup.get('RueckenCtrl').value,
          this.gesundheitFormGroup.get('OberkoerperCtrl').value
        )
        .subscribe((re) => {
          if (re) {
            if (this.allKIBogen.length > this.number) {
              this.number++;
              this.setForm(this.number);
            }
          }
        });
    }
  }
}
