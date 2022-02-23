import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  createContact: FormGroup;
  submitted = false;
  loading = false;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private fb: FormBuilder,
    private _contactservice: ContactService,
    private toastr: ToastrService,
    private router: Router) {

    this.createContact = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      message: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]

    })
  }

  ngOnInit(): void {
    this.submitContactForm();

  }

  submitContactForm() {

    if (this.createContact.valid) {
      const contact: any = {
        name: this.createContact.value.name,
        email: this.createContact.value.email,
        message: this.createContact.value.message,
        dateCreation: new Date(),
      }

      this.loading = true;
      this.submitted = true;

      this._contactservice.submitContactForm(contact).then(() => {
        this.toastr.success("Message sent successfully", "Message sent",
          { positionClass: 'toast-bottom-right' });
        this.router.navigate(['/']);
      }).catch(error => {
        this.toastr.error("Something went wrong", "Message sent",
          { positionClass: 'toast-bottom-right' });
        this.loading = false;
        this.onResetContactForm();
      });
    }


  }

  onResetContactForm() {
    this.createContact.reset();
  }

}
