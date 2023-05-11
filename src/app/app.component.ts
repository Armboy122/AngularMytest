import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'simple-profile-app';

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.getLoggedOutUser();
  }
  cheeklogin(): boolean {
    if (this.authService.getLoggedInUser() === null) {
      return true;
    }
    return false;
  }
  cheekUser(): boolean {
    const loggedInUser = this.authService.getLoggedInUser();
    if (loggedInUser?.user.role === 'A') {
      return true;
    }
    return false;
  }
}
