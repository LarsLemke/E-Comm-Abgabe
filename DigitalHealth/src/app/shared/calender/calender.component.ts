import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  viewDate: Date = new Date();

  // events: CalendarEvent<{ incrementsBadgeTotal: boolean }>[] = [
  //   {
  //     title: 'Increments badge total on the day cell',
  //     color: colors.yellow,
  //     start: new Date(),
  //     meta: {
  //       incrementsBadgeTotal: true,
  //     },
  //   },
  //   {
  //     title: 'Does not increment the badge total on the day cell',
  //     color: colors.blue,
  //     start: new Date(),
  //     meta: {
  //       incrementsBadgeTotal: false,
  //     },
  //   },
  // ];

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      day.badgeTotal = day.events.filter(
        (event) => event.meta.incrementsBadgeTotal
      ).length;
    });
  }
}
