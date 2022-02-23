import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private firestore: AngularFirestore) { }

  addStudent(student: any): Promise<any> {
    return this.firestore.collection('student').add(student);
  }

  getStudents(): Observable<any> {
    return this.firestore.collection('student', ref => ref.orderBy('dateCreation', 'asc')).snapshotChanges()
  }
  deleteStudent(id:string):Promise<any>{
    return this.firestore.collection('student').doc(id).delete();

  }
  editStudent(id:string):Observable<any>{
    return this.firestore.collection('student').doc(id).snapshotChanges();
  }
  updateStudent(id:string,data:any):Promise<any>{
    return this.firestore.collection('student').doc(id).update(data);
  }
}

