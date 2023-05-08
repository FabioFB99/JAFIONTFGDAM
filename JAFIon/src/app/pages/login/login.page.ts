import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      await this.authService.signIn(email, password);
    } catch (error) {
      console.log(error);
    }
  }
}
