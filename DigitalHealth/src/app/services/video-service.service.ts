import { environment } from './../../environments/environment.prod';
import { Video } from './../models/video-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoServiceService {
  url = environment.production ? environment.prod_url : environment.dev_url;
  constructor(private http: HttpClient) {}

  addVideo(video: Video): Observable<boolean> {
    return this.http.post<boolean>(this.url + '/videos/add', { video });
  }

  getPlaylist(id): Observable<Video[]> {
    return this.http.get<Video[]>(this.url + '/videos/getPlaylist/' + id);
  }

  getvideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.url + '/videos/getall');
  }
  getRecomendetVideo(userId: String): Observable<Video> {
    return this.http.get<Video>(this.url + '/videos/getRecomendet/' + userId);
  }
  deleteVideo(video: Video): Observable<boolean> {
    return this.http.delete<boolean>(this.url + '/videos/delete/' + video._id);
  }
}
