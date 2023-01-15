import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentService } from './student.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'iDropApp';
  public students: Student[] = [];
  public deleteStudent: Student;
  
  constructor (private studentService: StudentService) {}
  ngOnInit(): void {
    this.getStudents();
    
  }
  public getStudents(): void {
    this.studentService.getStudents().subscribe((res)=>{
      try{
        this.students = res;
      }catch(e){
        console.log(e);
      }
    })
  }
  public onDeleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenStudentModal(student: Student, mode: string): void {
    const container = document.getElementById("student-container");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addStudentModal');
    }
    else if(mode === 'edit'){
      button.setAttribute('data-target', '#updateStudentModal');
    }
    else if(mode === 'delete'){
      this.deleteStudent = student;
      button.setAttribute('data-target', '#deleteStudentModal');
    }
    container.appendChild(button);
    button.click();
    console.log(student, mode);

  }
}
