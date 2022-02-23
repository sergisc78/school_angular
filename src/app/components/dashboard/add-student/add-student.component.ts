import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentsService } from '../service/students.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {


  createStudent: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title = "Add Student";


  constructor(private fb: FormBuilder,
    private _studentService: StudentsService,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute) {


    this.createStudent = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      grade: ['', Validators.required],
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.dataInpunts();
  }

  editUpdate() {
    this.submitted = true;
    if (this.createStudent.invalid) {
      return;
    }
    if (this.id === null) {
      this.addStudent();
    } else {
      this.editStudent(this.id);
    }
  }

  addStudent() {
    const student: any = {
      name: this.createStudent.value.name,
      lastName: this.createStudent.value.lastName,
      grade: this.createStudent.value.grade,
      dateCreation: new Date(),
      dateUpdate: new Date()
    }
    this.loading = true;
    this.submitted = true;

    this._studentService.addStudent(student).then(() => {
      this.toastr.success('Student added succesfully', 'Student added',
        { positionClass: 'toast-bottom-right' });
      this.router.navigate(['/dashboard/listStudents']);
    }).catch(error => {
      this.toastr.error('Something went wrong', 'Student no added',
        { positionClass: 'toast-bottom-right' });
      this.loading = false;
    });

  }

  editStudent(id: string) { //SAVE CHANGES
    const student: any = {
      name: this.createStudent.value.name,
      lastName: this.createStudent.value.lastName,
      grade: this.createStudent.value.grade,
      dateCreaction: new Date()
    }
    this.loading = true;
    this._studentService.updateStudent(id, student).then(() => {
      this.toastr.success("Student updated successfully", "Update student",
        { positionClass: "toast-bottom-right" });
      this.router.navigate(['/dashboard/listStudents'])
    });
  }


  dataInpunts() {
    if (this.id !== null) {
      this.loading = true;
      this._studentService.editStudent(this.id).subscribe(data => {
        this.loading = false;
        this.title = "Edit student";
        this.createStudent.setValue({
          name: data.payload.data()['name'],
          lastName: data.payload.data()['lastName'],
          grade: data.payload.data()['grade']
        });
      });
    }
  }

}
