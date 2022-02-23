import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private firestore: AngularFirestore) { }

  addTeacher(teacher: any): Promise<any> {
    return this.firestore.collection('teacher').add(teacher);
  }

  getTeacher(): Observable<any> {
    return this.firestore.collection('teacher', ref => ref.orderBy('dateCreation', 'asc')).snapshotChanges();
  }

  deleteTeacher(id: string): Promise<any> {
    return this.firestore.collection('teacher').doc(id).delete();
  }

  editTeacher(id: string): Observable<any> {
    return this.firestore.collection('teacher').doc(id).snapshotChanges();
  }

  updateTeacher(id: string, data: any): Promise<any> {
    return this.firestore.collection('teacher').doc(id).update(data);

  }
}
