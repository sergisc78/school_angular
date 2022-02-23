import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogged = false;
  public user: any;
  //public user$:Observable<any>=this.authService.auth.user;

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit(): Promise<any> {

    this.user = await this.authService.getCurrentUser();
    if (this.user) {
      this.isLogged = true;

    }
  }

  async onLogout(): Promise<any> {

    try {
      await this.authService.logout();
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);

    }
  }
}
