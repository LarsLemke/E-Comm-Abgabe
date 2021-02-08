import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { SseService } from './sse.service';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SseHandlerService {
  url = environment.production ? environment.prod_url : environment.dev_url;
  constructor(private http: HttpClient, private router: Router) {}
  evs: EventSource;
  private subj = new BehaviorSubject([]);
  returnAsObservable() {
    return this.subj.asObservable();
  }
  GetExchangeData() {
    const subject = this.subj;
    if (typeof EventSource !== 'undefined') {
      this.evs = new EventSource(this.url + '/payment/getStockUpdate');
      // this.evs.onopen = function (e) {
      //   console.log('Opening connection.Ready State is ' + this.readyState);
      // };
      // this.evs.onmessage = function (e) {
      //   console.log('Message Received.Ready State is ' + this.readyState);
      //   subject.next(JSON.parse(e.data));
      // };
      this.evs.addEventListener('paypal', function (e: any) {
        // console.log(
        //   'Timestamp event Received.Ready State is ' + this.readyState
        // );

        //lint error -.-
        subject.next(e.data);
      });

      this.evs.onerror = function (e) {
        console.log(e);
        if (this.readyState == 0) {
          console.log('Reconnecting…');
        }
      };
    }
  }

  stopExchangeUpdates() {
    this.evs.close();
  }
}
//   constructor(private _zone: NgZone, private _sseService: SseService) {}

//   getServerSentEvent(url: string) {
//     return new Observable((observer) => {
//       const eventSource = this._sseService.getEventSource(url);
//       eventSource.onmessage = (event) => {
//         this._zone.run(() => {
//           observer.next();
//         });
//       };
//       eventSource.onerror = (error) => {
//         this._zone.run(() => {
//           observer.error(error);
//         });
//       };
//     });
//   }
// }
