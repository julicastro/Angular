import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bidbay';
  showHeaderAndFooter = false;

  constructor(public spinnerService: SpinnerService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/register' || event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/reset-pass') {
          this.showHeaderAndFooter = false;
        } else {
          this.showHeaderAndFooter = true;
        }
      }
    });
  }
}
