import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StudiesService } from 'src/app/core/services/studies.service';
import { Study } from 'src/app/shared/models/study.model';

@Component({
  selector: 'app-study-details',
  templateUrl: './study-details.component.html',
  styleUrls: ['./study-details.component.scss']
})
export class StudyDetailsComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  study!: Study;
  deleteInProgress = false;

  constructor(private route: ActivatedRoute, private studiesService: StudiesService, private router: Router) {
    if (route.snapshot.params['id']) {
      this.getStudyDetails(route.snapshot.params['id']);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getStudyDetails(id: string) {
    this.studiesService.get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.study = res;
      });
  }

  confirmDelete(event: boolean) {
    if (!event) {
      this.deleteInProgress = false;
      return;
    }

    this.studiesService.delete(this.study.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.router.navigate(['..']);
      });
  }
}
