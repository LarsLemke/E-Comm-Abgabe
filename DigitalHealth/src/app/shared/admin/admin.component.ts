import { Router } from '@angular/router';
import { MailService } from './../../services/mail.service';
import { VideoServiceService } from './../../services/video-service.service';
import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video-model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  addFormGroup: any;
  sendstatus: boolean;
  constructor(
    private videosService: VideoServiceService,
    private mailService: MailService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}
  displayedColumns: string[] = [
    'url',
    'titel',
    'playlist',
    'ruecken',
    'nacken',
    'handgelenke',
    'knie',
    'huefte',
    'schulter',
    'fussgelenke',
    'delete',
  ];

  dataSource: Video[];
  video: Video;
  ngOnInit(): void {
    this.videosService.getvideos().subscribe((videos) => {
      this.dataSource = videos;
      console.log(this.dataSource);
    });

    this.addFormGroup = this._formBuilder.group({
      urlCtrl: ['', Validators.required],
      rueckenCtrl: ['', Validators.required],
      nackenCtrl: ['', Validators.required],
      handgelenkeCtrl: ['', Validators.required],
      huefteCtrl: ['', Validators.required],
      schulterCtrl: ['', Validators.required],
      fussgelenkeCtrl: ['', Validators.required],
      knieCtrl: ['', Validators.required],
      titelCtrl: ['', Validators.required],
      playlistCtrl: ['', Validators.required],
    });
  }
  gotoki() {
    this.router.navigateByUrl('ki');
  }
  onSubmit() {
    const video: Video = {} as Video;
    video.fussgelenke = +this.addFormGroup.get('fussgelenkeCtrl').value;
    video.knie = +this.addFormGroup.get('knieCtrl').value;
    video.schulter = +this.addFormGroup.get('schulterCtrl').value;
    video.huefte = +this.addFormGroup.get('huefteCtrl').value;
    video.nacken = +this.addFormGroup.get('nackenCtrl').value;
    video.ruecken = +this.addFormGroup.get('rueckenCtrl').value;
    video.handgelenke = +this.addFormGroup.get('handgelenkeCtrl').value;
    video.url = this.addFormGroup.get('urlCtrl').value;
    video.titel = this.addFormGroup.get('titelCtrl').value;
    video.playlist = this.addFormGroup.get('playlistCtrl').value;
    console.log(video);

    this.videosService.addVideo(video).subscribe((data) => {
      if (data) {
        this.videosService.getvideos().subscribe((videos) => {
          this.dataSource = videos;
          console.log(this.dataSource);
        });
      }
    });
  }

  sendall() {
    this.sendstatus = false;
    this.mailService.sendall().subscribe((send) => {
      this.sendstatus = send;
    });
  }
  onDelete(index: number) {
    console.log(this.dataSource[index]);

    this.videosService.deleteVideo(this.dataSource[index]).subscribe((data) => {
      if (data) {
        this.videosService.getvideos().subscribe((videos) => {
          this.dataSource = videos;
          console.log(this.dataSource);
        });
      }
    });
  }
}
