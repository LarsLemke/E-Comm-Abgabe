import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Video } from 'src/app/models/video-model';

@Component({
  selector: 'app-next-videos',
  templateUrl: './next-videos.component.html',
  styleUrls: ['./next-videos.component.css'],
})
export class NextVideosComponent implements OnInit {
  @Input() videos: Video[] = {} as Video[];
  @Output() newMainVideo = new EventEmitter<String>();

  constructor() {}

  ngOnInit(): void {}

  changeMainVideo(neues: String) {
    this.newMainVideo.emit(neues);
  }
}
