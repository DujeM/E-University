import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/shared/models/course.model';
import { UploadTask, Storage } from '@angular/fire/storage';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { PostsService } from 'src/app/core/services/posts.service';
import { faFile, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/core/services';

@Component({
  selector: "app-course-details",
  templateUrl: "./course-details.component.html",
  styleUrls: ["./course-details.component.scss"],
})
export class CourseDetailsComponent {
  private ngUnsubscribe = new Subject<void>();
  faFile = faFile;
  faXmark = faXmark;
  course!: Course;
  deleteInProgress = false;
  uploadInProgress = false;

  createPostInProgress = false;
  createPostForm!: FormGroup;
  title!: FormControl;
  description!: FormControl;
  fileUrl!: FormControl;
  fileName!: FormControl;
  uploadedFile!: Blob;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router,
    private fb: FormBuilder,
    private storage: Storage,
    private postsService: PostsService,
    public authService: AuthenticationService
  ) {
    if (route.snapshot.params["id"]) {
      this.getCourseDetails(route.snapshot.params["id"]);
    }
    this.initForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm() {
    this.title = new FormControl("", [Validators.required]);
    this.description = new FormControl("", [Validators.required]);
    this.fileUrl = new FormControl("");
    this.fileName = new FormControl("");

    this.createPostForm = this.fb.group({
      title: this.title,
      description: this.description,
      fileUrl: this.fileUrl,
      fileName: this.fileName,
    });
  }

  getCourseDetails(id: string) {
    this.coursesService
      .get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        this.course = res;
      });
  }

  createPost() {
    if (!this.createPostForm.valid) {
      return;
    }

    this.postsService
      .create({ ...this.createPostForm.value, course: this.course })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        this.createPostInProgress = false;
        this.getCourseDetails(this.course.id);
      });
  }

  onDrop(file: any) {
    this.uploadInProgress = true;
    var reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) {
        this.uploadInProgress = false;
        return;
      }
      this.uploadedFile = new Blob([reader.result]);
      this.startUpload(file.target.files[0]);
    };
    reader.readAsDataURL(file.target.files[0]);
  }

  startUpload(file: File) {
    if (!file) return;

    const path = `${file.name}`;
    const fileRef = ref(this.storage, path);

    uploadBytes(fileRef, this.uploadedFile)
      .then((res) => {
        getDownloadURL(fileRef).then((url) => {
          this.fileUrl.setValue(url);
          this.fileName.setValue(file.name);
          this.uploadInProgress = false;
        });
      })
      .catch((err) => {
        this.uploadInProgress = false;
        console.error(err);
      });
  }
}
