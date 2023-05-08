import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  providers: [AuthService]
})
export class RegistrationPage implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }

  onRegister() {
    const { email, password } = this.registerForm.value;
    try {
      this.authService.signUp(email, password);
    } catch (error) {
      console.log(error);
    }
  }
}
