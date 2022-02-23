import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { observable } from 'rxjs';
import { TeachersService } from '../service/teachers.service';



@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.css']
})
export class ListTeachersComponent implements OnInit {

  teachers: any[] = [];


  constructor(private _teachersService: TeachersService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers() {
    this._teachersService.getTeacher().subscribe(data => {
      this.teachers = [];
      data.forEach((element: any) => {
        this.teachers.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  deleteTeacher(id: string) {
    this._teachersService.deleteTeacher(id).then(() => {
      this.toastr.success("Teacher deleted successfully", "Delete Teacher",
        { positionClass: "toast-bottom-right" });
    }).catch(error => {
      this.toastr.error("Something went wrong", "Delete Teacher",
        { positionClass: "toast-bottom-right" });
    });

  }

  editTeacher(id:string){
    this.router.navigate(['/editTeacher/id']);

  }

}
