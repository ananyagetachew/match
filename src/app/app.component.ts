import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isCollapsed = false;
  constructor(public _router: Router, private authService: AuthService) {}
  
  logout() {
    this.authService.logout();
    this._router.navigate(["/login"]);
  }
}
