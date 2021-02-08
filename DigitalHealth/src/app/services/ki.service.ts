import { Health } from './../models/healt-model';
import { Beruf } from './../models/beruf-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { KI } from '../models/ki-model';

@Injectable()
export class KiService {
  url = environment.production ? environment.prod_url : environment.dev_url;
  constructor(private http: HttpClient) {}

  getAll(): Observable<KI[]> {
    return this.http.get<KI[]>(this.url + '/ki');
  }
  updateID(
    id: String,
    Beine: number,
    Ruecken: number,
    Oberkoerper: number
  ): Observable<boolean> {
    return this.http.post<boolean>(this.url + '/ki', {
      id,
      Beine,
      Ruecken,
      Oberkoerper,
    });
  }
  getRecPlaylist(): Observable<number> {
    return this.http.post<number>(this.url + '/getPlaylist', {});
  }
  createUebergabeCSV(beruf: Beruf, gesundheit: Health): Observable<number> {
    return this.http.post<number>(this.url + '/ki/createUbergabeCSV', {
      beruf,
      gesundheit,
    });
  }
}
