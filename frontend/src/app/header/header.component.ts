import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthenticationService) {}

  logout() {
    this.authService.logout();
  }

  isUser() {
    return this.authService.getRoles().indexOf("USER") != -1;
  }

}
