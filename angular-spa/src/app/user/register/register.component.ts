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
    const data = {username:'kaloian', email:'kokoko@ko.ko', imageUrl: 'http://adafaefae', phone: 123456356, password:'asdasdf', repassword:'asdasdf'}

    const newUser = this.userService.register(data).subscribe(response => {
      // Store the response in localStorage
      // localStorage.setItem('token', response.token);
   
      console.log(response)
    }


    )
  
    this.router.navigate(['/']);
  }

}
