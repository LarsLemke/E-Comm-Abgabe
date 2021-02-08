import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  back() {
    this.router.navigateByUrl('/');
  }
}
