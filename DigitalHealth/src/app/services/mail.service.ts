import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class MailService {
  url = environment.production ? environment.prod_url : environment.dev_url;
  // environment.production ? environment.prod_url : environment.dev_url;
  constructor(private http: HttpClient) {}

  sendall(): Observable<boolean> {
    return this.http.get<boolean>(this.url + '/mails/sendall/');
  }
  sendKontakt(mail, message): Observable<boolean> {
    return this.http.post<boolean>(this.url + '/mails/kontakt', {
      mail,
      message,
    });
  }
}
