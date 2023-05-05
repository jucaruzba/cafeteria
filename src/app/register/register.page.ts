import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.class';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User('', '');
  
  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit() {
  }

  async onRegistrer(){
    const user =await this.authSvc.onLogin(this.user);
    if(user){
      console.log('Login existoso');
      this.router.navigateByUrl('/admin');
    }
  }

}
