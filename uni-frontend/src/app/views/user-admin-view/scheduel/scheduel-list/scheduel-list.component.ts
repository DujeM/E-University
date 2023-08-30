import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services';
import { EventsService } from 'src/app/core/services/events.service';
import { PeriodsService } from 'src/app/core/services/periods.service';
import { Days } from 'src/app/shared/enums/days.enum';
import { Event } from 'src/app/shared/models/event.model';
import { Period } from 'src/app/shared/models/period.model';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { startOfWeek, endOfWeek, format, addWeeks, compareAsc, isWithinInterval, getDay, addDays } from 'date-fns'
import { faChevronCircleLeft, faChevronCircleRight }  from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduel-list',
  templateUrl: './scheduel-list.component.html',
  styleUrls: ['./scheduel-list.component.scss']
})
export class ScheduelListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  events: Event[] = [];
  periods: Period[] = [];
  scheduel: any[][] = [];
  days = Object.keys(Days).filter((d) => !isNaN(Number(d)));
  daysValues = Object.values(Days).filter((d) => isNaN(Number(d)));
  eventPreviewInProgress = false;
  deleteInProgress = false;
  cancelInProgress = false;
  displayEvent!: Event;
  faXmark = faXmark;
  currentDate = new Date();
  startOfTheWeek: string = '';
  endOfTheWeek: string = ''; 
  faChevronLeft = faChevronCircleLeft;
  faChevronRight = faChevronCircleRight;
  
  constructor(
    private eventsService: EventsService, 
    public authService: AuthenticationService,
    private periodsService: PeriodsService,
    private router: Router
    ) {
      this.startOfTheWeek = format(startOfWeek(this.currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd');
      this.endOfTheWeek = format(endOfWeek(this.currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd');
    }

  ngOnInit() {
    this.periodsService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.periods = res;
    });

    this.eventsService.getPersonal(this.authService.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.events = res;
      this.renderScheduel();
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  checkDisplayedEvent(e: Event) {
    if (e.canceledDates && e.canceledDates.includes(this.getCurrentEventDay(e.day))) {
      return false;
    }

    if (e.recurring && compareAsc(new Date(e.startDate), new Date(this.getCurrentEventDay(e.day))) === -1) {
      return true;
    }

    if (isWithinInterval(new Date(e.startDate), { start: new Date(this.startOfTheWeek), end: new Date(this.endOfTheWeek)})) {
      return true;
    }

    return false;
  }

  initScheduel() {
    this.periods.forEach((row, i) => {
      this.scheduel[i] = [];
      this.days.forEach((col, j) => {
          this.scheduel[i][j] = null;
      });
    });
  }

  renderScheduel() {
    this.initScheduel();

    this.events.forEach(e => {
      this.periods.forEach((row, i) => {
        this.days.forEach((col, j) => {
          if (
            e.period.order === row.order &&
            new Date(e.startDate).getDay() === j + 1
          ) {
            if (this.checkDisplayedEvent(e)) {
              this.scheduel[i][j] = e;
            }
          }
        });
      });
    });
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
    this.startOfTheWeek = format(startOfWeek(this.currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd');
    this.endOfTheWeek = format(endOfWeek(this.currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd');
    this.renderScheduel();
  }

  getCurrentEventDay(customDay?: number) {
    return format(addDays(new Date(this.startOfTheWeek), !customDay ? this.displayEvent.day - 1 : customDay - 1), 'yyyy-MM-dd');
  }

  confirmDelete(event: boolean) {
    if (!event) {
      this.deleteInProgress = false;
      this.cancelInProgress = false;
      return;
    } 

    if (this.cancelInProgress) {
      this.eventsService
        .edit({
          ...this.displayEvent,
          canceledDates: this.displayEvent.canceledDates
            ? [...this.displayEvent.canceledDates, this.getCurrentEventDay()]
            : [this.getCurrentEventDay()],
        })
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => {
          this.cancelInProgress = false;
          this.ngOnInit();
        });
      return;
    }

    this.eventsService.delete(this.displayEvent.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.deleteInProgress = false;
        this.ngOnInit();
      });
  }
}
