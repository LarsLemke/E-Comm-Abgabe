import { UserServiceService } from './../../services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { PaypalService } from './../../services/paypal.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paypal-confimation',
  template: '',
  styleUrls: [],
})
export class PayPalConfirmationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userservice: UserServiceService
  ) {}

  ngOnInit(): void {
    console.log(this.route.params);
    console.log(this.userservice.currentRegisterValue());
  }
}
