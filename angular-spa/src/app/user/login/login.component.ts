import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/validators/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailDomains = DEFAULT_EMAIL_DOMAINS;
  error: string | undefined;
  isLoading: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  login(form: NgForm): void {
    const data = form.value;

    if(data.email== ''|| data.password == '') {
      this.error = 'All fields are required';
      return
    } else {
      this.error = undefined;
    }

    if (form.valid) {
      this.isLoading = true;
      this.userService.login(data).subscribe({
        next: (response) => this.userService.setLsUser(response),
        error: ({ error }) => {
          this.isLoading = false;
          this.error = error.error
        },
        complete: () => {
          this.isLoading = false;
          this.router.navigate(['/catalog']);
        }
      })

    }

  }

}
