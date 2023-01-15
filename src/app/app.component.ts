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
  public editStudent: Student;
  public pageSlice: Student[] = [];
  
  constructor (private studentService: StudentService) {}
  ngOnInit(): void {
    this.getStudents(); 
  }

  public onPaginateChange(event): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.students.length) {
      endIndex = this.students.length;
    }
    this.pageSlice = this.students.slice(startIndex, endIndex);
  }
  public getStudents(): void {
    this.studentService.getStudents().subscribe((res)=>{
      try{
        this.students = res;
        if(this.students.length > 6){
          this.pageSlice = this.students.slice(0, 6);
        }else{
          this.pageSlice = this.students;
        }
      }catch(e){
        console.log(e);
      }
    })
  }
  public onDeleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(
      (response: Student) => {
        //console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddStudent(addForm: NgForm): void {
    document.getElementById('add-student-form').click();
    this.studentService.addStudent(addForm.value).subscribe(
      (response: Student) => {
        //console.log(response);
        this.getStudents();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
 

  public onUpdateStudent(student: Student): void {
    this.studentService.updateStudent(student).subscribe(
      (response: Student) => {
        //console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
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
      this.editStudent = student;
      button.setAttribute('data-target', '#editStudentModal');
    }
    else if(mode === 'delete'){
      this.deleteStudent = student;
      button.setAttribute('data-target', '#deleteStudentModal');
    }
    container.appendChild(button);
    button.click();
    //console.log(student, mode);

  }
}
