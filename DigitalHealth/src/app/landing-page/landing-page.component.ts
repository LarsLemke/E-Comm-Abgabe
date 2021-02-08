import { MailService } from './../services/mail.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private mailservice: MailService
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      message: '',
    });
  }
  myIndex = 0;
  slideIndex = 1;
  timeOut;
  items;
  checkoutForm;

  ngOnInit(): void {
    this.showDivs(this.slideIndex);
  }

  onSubmit() {
    // Process checkout data here
    console.log(
      this.checkoutForm.get('name').value +
        this.checkoutForm.get('message').value
    );

    this.mailservice
      .sendKontakt(
        this.checkoutForm.get('name').value,
        this.checkoutForm.get('message').value
      )
      .subscribe(() => {
        this.checkoutForm.reset();
      });
  }
  ngAfterViewInit() {
    this.carousel();
  }

  carousel() {
    var i;
    var x = document.getElementsByClassName(
      'mySlides'
    ) as HTMLCollectionOf<HTMLElement>;
    var dots = document.getElementsByClassName(
      'demo'
    ) as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';
      if (dots[i].className) {
        dots[i].className = dots[i].className.replace(' w3-teal', '');
      }
    }
    this.myIndex++;
    if (this.myIndex > x.length) {
      this.myIndex = 1;
    }
    var changeme = x[this.myIndex - 1] as HTMLElement;

    changeme.style.display = 'block';
    dots[this.myIndex - 1].className += ' w3-teal';
    this.timeOut = setTimeout(() => {
      this.carousel();
    }, 7500);
  }
  onFaq() {
    this.router.navigateByUrl('/faq');
  }
  ngOnDestroy() {
    clearTimeout(this.timeOut);
  }
  onRegister() {
    this.router.navigateByUrl('/register');
  }
  plusDivs(n: number) {
    this.showDivs((this.slideIndex += n));
  }
  currentDiv(n: number) {
    this.showDivs((this.slideIndex = n));
  }
  showDivs(n: number) {
    var i;
    var x = document.getElementsByClassName(
      'mySlides'
    ) as HTMLCollectionOf<HTMLElement>;
    var dots = document.getElementsByClassName(
      'demo'
    ) as HTMLCollectionOf<HTMLElement>;
    if (n > x.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' w3-teal', '');
    }
    x[this.slideIndex - 1].style.display = 'block';
    dots[this.slideIndex - 1].className += ' w3-teal';
  }
  w3_open() {
    var x = document.getElementById('mySidebar');
    x.style.width = '300px';
    x.style.paddingTop = '10%';
    x.style.display = 'block';
  }
  w3_close() {
    document.getElementById('mySidebar').style.display = 'none';
  }
  openNav() {
    var x = document.getElementById('navDemo');
    if (x.className.indexOf('w3-show') == -1) {
      x.className += ' w3-show';
    } else {
      x.className = x.className.replace(' w3-show', '');
    }
  }
}
