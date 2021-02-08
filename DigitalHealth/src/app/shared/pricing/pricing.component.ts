import { Router } from '@angular/router';
import { PaypalService } from './../../services/paypal.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SseHandlerService } from 'src/app/services/sse-handler.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent implements OnInit {
  @Output() saveRegister = new EventEmitter();
  constructor(
    private paypalservice: PaypalService,
    private dialog: MatDialog,
    private sseHandler: SseHandlerService,
    private rout: Router
  ) {}

  price: number;
  descr: string;

  ngOnInit(): void {
    this.sseHandler.returnAsObservable().subscribe((data) => {
      console.log(data);
      if (data.includes('succses')) {
        console.log('succses');
        //register
        //login
        this.saveRegister.emit();
        // this.sseHandler.stopExchangeUpdates();
      }
    });
  }

  openDialogWithTemplateRef(
    templateRef: TemplateRef<any>,
    price: number,
    descr: string
  ) {
    this.price = price;
    this.descr = descr;
    this.dialog.open(templateRef);
  }

  paypalAction() {
    // console.log('paypal action');

    this.paypalservice
      .triggerPayPalSubscription(this.price, 'Das ist eine schöne Beschreibung')
      .subscribe((url) => {
        window.open(url.url, '_blank', 'width=600,height=400');
        // console.log('paypal link' + url.url);
      });
    this.sseHandler.GetExchangeData();
  }
}
