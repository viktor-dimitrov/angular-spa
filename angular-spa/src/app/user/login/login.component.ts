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

constructor(private userService: UserService, private router: Router){}

  login(form: NgForm) :void {
    const data = form.value; 
    
    if(form.valid){

       this.userService.login(data); 
        // this.router.navigate(['/']);
    }
 
  }

}
