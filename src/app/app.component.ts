import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentService } from './student.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'iDropApp';
  public students: Student[] = [];
  constructor (private studentService: StudentService) {}
  ngOnInit(): void {
    this.getStudents();
  }
  public getStudents(): void {
    this.studentService.getStudents().subscribe(
      (response: Student[]) => {
        this.students = response;
      },
      (error: Error) => {
        console.log(error.message);
      }
    );
  }
}
