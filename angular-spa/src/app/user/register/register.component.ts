import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/validators/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  emailDomains = DEFAULT_EMAIL_DOMAINS;
  error: string | undefined

  constructor(private userService: UserService, private router: Router) { }


  register(form: NgForm): void {
    const data = {...form.value};

    if (form.valid && (data.password === data.repassword)) {

   
    if (form.valid && (form.value.password == form.value.repassword)) {
      this.userService.register(data).subscribe({
        next: (response) => this.userService.setLsUser(response),
        error: ({ error }) => this.error = error.error,
        complete: () => this.router.navigate(['/'])
      })
    } else {
      return
    }

    }


  }

}
