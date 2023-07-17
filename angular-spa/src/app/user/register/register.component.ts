import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/validators/constants';

import { User } from 'src/app/types/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  emailDomains = DEFAULT_EMAIL_DOMAINS;

  constructor(private userService: UserService, private router: Router){}


  register(form: NgForm): void {
    const data = form.value;

    if(form.valid){

    
    this.userService.register(data)
     this.router.navigate(['/']);
    }

  }




}
