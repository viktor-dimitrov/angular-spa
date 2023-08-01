import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecordService } from '../record.service';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-post-record',
  templateUrl: './post-record.component.html',
  styleUrls: ['./post-record.component.css'],
  providers: [RecordService]
})
export class PostRecordComponent {
  private recordSubscription: Subscription | undefined;
  error: string | undefined

  constructor(
    private recordService: RecordService,
    private router: Router,
    private userService: UserService
  ) { }

  postRecord(form: NgForm) {

    let data = { ...form.value };

    if (form.valid) {
      this.recordSubscription = this.recordService.postRecord(data).pipe(
        tap(() => {
          this.userService.me().subscribe({
            complete: () => { this.router.navigate(['/catalog']) }
          })
        })
      ).subscribe({
        error: ({ error }) => {
          this.error = error.error,
          this.router.navigate(['/pageNotFound'])
        }
      })
    } else {

      return
    }
  }

  ngOnDestroy(): void {
    if (this.recordSubscription) {
      this.recordSubscription.unsubscribe();
    }
  }

}
