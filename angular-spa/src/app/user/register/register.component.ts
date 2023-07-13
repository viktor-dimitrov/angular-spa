import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/types/user';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {



  constructor(private userService: UserService, private router: Router){}


  register(): void {
    const data = {username:'kaloian', email:'abv@abv.bg', imageUrl: 'http://adafaefae', phone: 123456356, password:'123456', repassword:'123456'}

    this.userService.register(data)
     this.router.navigate(['/']);
  }




}
