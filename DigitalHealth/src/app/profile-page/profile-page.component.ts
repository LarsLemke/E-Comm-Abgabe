import { VideoEndedDialogComponent } from './../shared/video-ended-dialog/video-ended-dialog.component';
import { Account } from './../models/account-model';
import { AccountService } from './../services/account.service';
import { VideoServiceService } from './../services/video-service.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';
import { Video } from '../models/video-model';
import { User } from '../models/user-model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private videoservice: VideoServiceService,
    private sanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private userservice: UserServiceService,
    private accountService: AccountService,
    public dialog: MatDialog,
    private ngZone: NgZone
  ) {}
  videos: Video[] = {} as Video[];
  videoList: String[] = new Array();
  catFormGroup: any;
  public admin = false;
  public name = 'Dummy User';
  public titel = '';
  public recomendetVideo = '';
  public id: string = '5f9e9921a721861fa056ace7';
  public videoUrl: SafeResourceUrl = '';
  public account: Account;
  private user: User;
  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public video: any;
  public player: any;
  public player2: any;
  public reframed: Boolean = false;
  private playlist: number = 0;
  public ober = 0;

  private listl = 0;
  loaded: Boolean = false;

  img1: string = '';
  img2: string = '';
  // public beschreibung =
  //   'Das ist eine sehr ausführliche beschreibung die sagt wann man diese Übung machen soll oder warum se Vorgeschlagen ist';

  ngOnInit(): void {
    this.user = this.userservice.currentUserValue();
    this.account = this.accountService.currentAccValue();
    this.playlist = +this.account.playlist;
    this.videoservice.getPlaylist(this.account.playlist).subscribe((vids) => {
      this.videos = vids;
      this.createVideolist();
      this.listl = this.videoList.length;
      var splitted = this.account.history.split(',');
      if (this.account.history == '') {
        this.ober = ((splitted.length - 1) / this.listl) * 100;
      } else {
        this.ober = (splitted.length / this.listl) * 100;
      }
      this.video = this.videoList.pop();
      this.img1 =
        'https://img.youtube.com/vi/' +
        this.videoList[this.videoList.length - 1] +
        '/mqdefault.jpg';
      this.img2 =
        'https://img.youtube.com/vi/' +
        this.videoList[this.videoList.length - 2] +
        '/mqdefault.jpg';
      this.init(this.video);
      this.loaded = true;
    });
    if (this.user.admin) {
      this.admin = true;
    }
    //set Form

    this.catFormGroup = this._formBuilder.group({
      urlCtrl: ['', Validators.required],
      rueckenCtrl: ['', Validators.required],
      nackenCtrl: ['', Validators.required],
      handgelenkeCtrl: ['', Validators.required],
      huefteCtrl: ['', Validators.required],
      schulterCtrl: ['', Validators.required],
      fussgelenkeCtrl: ['', Validators.required],
      knieCtrl: ['', Validators.required],
      titelCtrl: ['', Validators.required],
    });
  }

  //liste alle nicht gesehenden videos erstellen
  createVideolist() {
    if (this.account.history != '') {
      var splitted = this.account.history.split(',');
    } else {
      this.videos.forEach((element) => {
        this.videoList.push(element.url);
      });
      return;
    }

    this.videos.forEach((element) => {
      if (!splitted.some((r) => r.indexOf(element.url) >= 0)) {
        this.videoList.push(element.url);
      }
    });

    if (this.videoList.length < 1) {
      this.videos.forEach((element) => {
        this.videoList.push(element.url);
      });
    }
  }

  init(id: string) {
    if (window['YT']) {
      this.startVideo(id);
      return;
    }

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window['onYouTubeIframeAPIReady'] = () => this.startVideo(id);
  }

  startVideo(id: string) {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      videoId: id,
      playerVars: {
        autoplay: 0,
        modestbranding: 0,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 1,
        playsinline: 0,
      },
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),

        onError: this.onPlayerError.bind(this),
        onReady: this.onPlayerReady.bind(this),
      },
    });
  }

  updateNext(item: number) {
    //update history
    this.video = this.videoList.pop();

    if (item == 1) {
      this.player.loadVideoById(this.video);
      this.img1 = this.img2;
      this.img2 =
        'https://img.youtube.com/vi/' +
        this.videoList[this.videoList.length - 2] +
        '/mqdefault.jpg';
    } else {
      this.player.loadVideoById(this.videoList.pop());
      this.img2 =
        'https://img.youtube.com/vi/' +
        this.videoList[this.videoList.length - 1] +
        '/mqdefault.jpg';
      this.videoList.push(this.video);
    }
  }

  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event) {
    // event.target.playVideo();
  }
  onPlayerStateChange(event) {
    console.log(event);
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime());
        }
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        }
        break;
      case window['YT'].PlayerState.ENDED:
        this.videoEnded();
        break;
    }
  }
  videoEnded() {
    //lastwatched
    var newHistory;
    if (this.account.history != '') {
      newHistory = this.account.history;
      newHistory += ',' + this.video;
    } else {
      newHistory += this.video;
    }
    this.accountService.edithistory(newHistory).subscribe((resp) => {
      this.account.history = newHistory;
      var splitted = this.account.history.split(',');
      this.ober = (splitted.length / this.listl) * 100;
      this.openDialog();
    });
  }

  openDialog() {
    this.ngZone.run(() => {
      this.dialog
        .open(VideoEndedDialogComponent, {})
        .afterClosed()
        .subscribe((response) => {
          if (response) {
            this.updateNext(1);
            this.player.loadVideoById(this.video);
          }
        });
    });
  }

  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }
}
