import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { returnURL } from '../models/returnURL';

@Injectable()
export class PaypalService {
  url = environment.production ? environment.prod_url : environment.dev_url;
  constructor(private http: HttpClient) {}

  triggerPayPalSubscription(
    price: number,
    description: string
  ): Observable<returnURL> {
    console.log(description);

    return this.http.post<returnURL>(this.url + '/payment/subscription', {
      price,
      description,
    });
  }
}
