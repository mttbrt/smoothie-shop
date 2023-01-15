import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private authService: AuthenticationService) {}

  logout() {
    this.authService.logout();
  }

  hasRole(role: string) {
    return this.authService.getRoles().indexOf(role) >= 0;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
