import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services';
import { EventsService } from 'src/app/core/services/events.service';
import { PeriodsService } from 'src/app/core/services/periods.service';
import { Days } from 'src/app/shared/enums/days.enum';
import { Event } from 'src/app/shared/models/event.model';
import { Period } from 'src/app/shared/models/period.model';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { startOfWeek, endOfWeek, format, addWeeks } from 'date-fns'
import { faChevronCircleLeft, faChevronCircleRight }  from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scheduel-list',
  templateUrl: './scheduel-list.component.html',
  styleUrls: ['./scheduel-list.component.scss']
})
export class ScheduelListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  events: Event[] = [];
  periods: Period[] = [];
  matrix: any[][] = [];
  days = Object.keys(Days).filter((d) => !isNaN(Number(d)));
  daysValues = Object.values(Days).filter((d) => isNaN(Number(d)));
  eventPreviewInProgress = false;
  displayEvent!: Event;
  faXmark = faXmark;
  currentDate = new Date();
  startOfTheWeek: string = '';
  endOfTheWeek: string = ''; 
  faChevronLeft = faChevronCircleLeft;
  faChevronRight = faChevronCircleRight;
  
  constructor(
    private eventsService: EventsService, 
    private authService: AuthenticationService,
    private periodsService: PeriodsService
    ) {
      this.startOfTheWeek = format(startOfWeek(this.currentDate, { weekStartsOn: 1 }), 'dd.MM.yyyy');
      this.endOfTheWeek = format(endOfWeek(this.currentDate, { weekStartsOn: 1 }), 'dd.MM.yyyy');

      console.log(this.startOfTheWeek)
      console.log(this.endOfTheWeek)
    }

  ngOnInit() {
    this.periodsService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.periods = res;
    });

    this.eventsService.getPersonal(this.authService.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.events = res;

      this.periods.forEach((row, i) => {
        this.matrix[i] = [];
        this.days.forEach((col, j) => {
            this.matrix[i][j] = null;
        });
      });

      this.events.forEach(e => {
        this.periods.forEach((row, i) => {
          this.days.forEach((col, j) => {
            if (e.period.order === row.order && new Date(e.startDate).getDay() === j + 1) {
              this.matrix[i][j] = e;
            }
          });
        });
      });

      console.log(this.matrix);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  previewEvent(e: Event) {
    if (!e) {
      return;
    }

    this.eventPreviewInProgress = true;
    this.displayEvent = e;
  }

  changeCurrentWeek(offset: number) {
    this.currentDate = addWeeks(this.currentDate, offset);
    this.startOfTheWeek = format(startOfWeek(this.currentDate, { weekStartsOn: 1 }), 'dd.MM.yyyy');
    this.endOfTheWeek = format(endOfWeek(this.currentDate, { weekStartsOn: 1 }), 'dd.MM.yyyy');
  }
}
