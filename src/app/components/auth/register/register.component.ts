import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  ngOnInit(): void {
  }

  async onRegister(): Promise<any> {
    //console.log(this.registerForm.value);
    const { email, password } = this.registerForm.value;
    try {
      const user = await this.authService.register(email, password);
      if (user) {
        //Redirect to
        this.router.navigate(['dashboard']);
      }
    } catch (error) {
      console.log(error);
    }

  }
}
