import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeachersService } from '../service/teachers.service';


@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  createTeacher: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title = "Add teacher";


  constructor(private fb: FormBuilder,
    private _teacherService: TeachersService,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute) {

    this.createTeacher = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      subject: ['', Validators.required],
      salary: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.dataInputs();
  }

  editUpdate() {
    this.submitted = true;
    if (this.createTeacher.invalid) {
      return;
    }
    if (this.id === null) {
      this.addTeacher();
    } else {
      this.editTeacher(this.id);
    }

  }

  addTeacher() {
    const teacher: any = {
      name: this.createTeacher.value.name,
      lastName: this.createTeacher.value.lastName,
      subject: this.createTeacher.value.subject,
      salary: this.createTeacher.value.salary,
      dateCreation: new Date(),
      dateUpdate: new Date(),

    }
    this.loading = true;
    this.submitted = true;

    this._teacherService.addTeacher(teacher).then(() => {
      this.toastr.success('Teacher added succesfully', 'Teacher added',
        { positionClass: 'toast-bottom-right' });
      this.router.navigate(['/dashboard/listTeachers']);
    }).catch(error => {
      this.toastr.error('Something went wrong', 'Teacher no added',
        { positionClass: 'toast-bottom-right' });
      this.loading = false;

    });

  }

  editTeacher(id: string) { // SAVE CHANGES
    const teacher: any = {
      name: this.createTeacher.value.name,
      lastName: this.createTeacher.value.lastName,
      subject: this.createTeacher.value.subject,
      salary: this.createTeacher.value.salary,
      dateCreation: new Date()
    }
    this.loading = true;
    this._teacherService.updateTeacher(id, teacher).then(() => {
      this.loading = false;
      this.toastr.success("Teacher updated successfully", "Update teacher",
        { positionClass: "toast-bottom-right" });
      this.router.navigate(['/dashboard/listTeachers']);
    });
  }

  dataInputs() { // SHOW VALUES IN INPUTS TO UPDATE
    if (this.id != null) {
      this.loading = true;
      this._teacherService.editTeacher(this.id).subscribe(data => {
        this.loading = false;
        this.title = "Edit teacher";
        this.createTeacher.patchValue({
          name: data.payload.data()['name'],
          lastName: data.payload.data()['lastName'],
          subject: data.payload.data()['subject'],
          salary: data.payload.data()['salary'],
        });
      });
    }
  }


}



