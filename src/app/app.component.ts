import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { student } from './interfaces/student';
import { ApiservicesService } from './services/apiservices.service';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgChartsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'student-management';
  showNavbar = true;

  constructor(private api: ApiservicesService, private router: Router, private auth: AuthService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = !event.urlAfterRedirects.includes('/login');
      });
  }

// logout() {
//   this.auth.logout();
// }

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.router.navigate(['/login']);
}

isLoginPage(): boolean {
  return this.router.url.includes('/login');
}

}
