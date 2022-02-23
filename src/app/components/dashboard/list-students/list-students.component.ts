import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { StudentsService } from '../service/students.service';


@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {


  students: any[] = [];

  constructor(private _studentService: StudentsService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this._studentService.getStudents().subscribe(data => {
      this.students = [];
      data.forEach((element: any) => {
        this.students.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  deleteStudent(id: string) {
    this._studentService.deleteStudent(id).then(() => {
      this.toastr.success("Student deleted successfully", "Delete Student",
        { positionClass: "toast-bottom-right" });
    }).catch(error => {
      this.toastr.error("Something went wrong", "Delete Student",
        { positionClass: "toast-bottom-right" });
    });

  }

  editStudent(id: string) {
    this.router.navigate(['/editStudent/id']);

  }

}


