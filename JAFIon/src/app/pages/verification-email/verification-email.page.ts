import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-verification-email',
  templateUrl: './verification-email.page.html',
  styleUrls: ['./verification-email.page.scss'],
})
export class VerificationEmailPage implements OnInit {
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() {
  }
}
