import { Component } from '@angular/core';


import { Router } from '@angular/router';
import { RecordService } from '../record.service';
import { NgForm, NgModel } from '@angular/forms';



@Component({
  selector: 'app-post-record',
  templateUrl: './post-record.component.html',
  styleUrls: ['./post-record.component.css'],
  providers: [RecordService]
})
export class PostRecordComponent {

  error: string | undefined


  constructor(private recordService: RecordService, private router: Router){}


  postRecord(form: NgForm){

    const data = form.value;
    console.log(data)
    if (form.valid) {
    
      this.recordService.postRecord(data).subscribe({
        next: (response) => console.log('Your Record has succesfully added'),
        error: ({ error }) => this.error = error.error,
        complete: () => this.router.navigate(['/catalog'])
      })
    } else {
      console.log('invalid')
      return
    }

  }

}
