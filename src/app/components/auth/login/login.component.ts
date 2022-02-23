import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  async onLogin() {
    //console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authService.login(email, password);
      if (user) {
        //REDIRECT TO HOME
        this.loading = true;
        setTimeout(() => {
          this.router.navigate(['dashboard']);
          this.loading = false;
        }, 2000);
        
      }
    } catch (error) {
      console.log(error);

    }

  }
}
