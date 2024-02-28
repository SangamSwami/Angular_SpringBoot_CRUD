import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('http://localhost:8080/api/demo/getstudents');
  }
  getStudentById(studentId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`http://localhost:8080/api/demo/getstudent/${studentId}`);
  }
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>('http://localhost:8080/api/demo/add', student);
  }

  deleteStudents(studentId: number): Observable<Student> {
    return this.http.delete<Student>(`http://localhost:8080/api/demo/deletestudent/${studentId}`);
  }

  updateStudents(student : Student): Observable<Student>{
    return this.http.put<Student>('http://localhost:8080/api/demo/updateStudent', student)
  }
}
