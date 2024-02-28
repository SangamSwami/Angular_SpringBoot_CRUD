import { Component, OnInit } from '@angular/core';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  getId: any = { id: 0, name: '', emailId: '' };
  newStudent: Student = { id: 0, name: '', emailId: '' };
  remove: any = { id: 0 }; 
  updateNewStudent: Student = { id : 0, name : '', emailId : '' };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    console.log("Hello Sangam!!!");
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (data) => {
        this.students = data;
        console.log("Students loaded successfully");
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  getById(studentId: number): void {
    this.studentService.getStudentById(studentId).subscribe(
      (data) => {
        this.getId = data; 
        console.log("The student details of " + studentId + " are ", this.getId);
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }

  saveStudent(): void {
    console.log(this.newStudent);
    this.studentService.addStudent(this.newStudent).subscribe(
      (data) => {
        console.log('Student added successfully:', data);
        this.loadStudents();
        this.newStudent = { id: 0, name: '', emailId: '' };
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }

  deleteStudent(): void {
    this.studentService.deleteStudents(this.remove.id).subscribe(
      () => {
        console.log("Student deleted successfully");
        this.loadStudents();
        this.remove = { id : null };
      },
      error => {
        console.error("Error deleting student:", error);
      }
    );
  }

  updateStudent(): void {
    this.studentService.updateStudents(this.updateNewStudent).subscribe(
      (data) => {      
         console.log('Student Updated successfully:', data);
          this.loadStudents();
          this.updateNewStudent = { id: 0, name: '', emailId: '' };
      }
    );
  }
}
