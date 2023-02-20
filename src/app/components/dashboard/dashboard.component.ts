import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Student } from '../../student';
import { StudentService } from '../../student.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  title = 'iDropApp';
  public students: Student[] = [];
  public deleteStudent: Student;
  public editStudent: Student;
  public pageSlice: Student[] = [];
  public isLoading: boolean = false;
  public userName = sessionStorage.getItem('username').toUpperCase();

  
  constructor (private studentService: StudentService) {}
  ngOnInit(): void {
    this.getStudents(); 
  }

  public onSearchStudents(key: string): void {
    const results: Student[] = [];
    for (const student of this.students) {
      if (student.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || "0".concat(String(student.phoneNumber)).indexOf(key.toLowerCase()) !== -1)
        {
        results.push(student);
        }
    }
    this.pageSlice = results;
    if (results.length === 0 || !key) {
      this.getStudents();
    }
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
    this.isLoading = true;
    
    // console.log(this.isLoading);
    setTimeout(() => {
    
      this.studentService.getStudents().subscribe((res)=>{
        try{
          this.students = res;
          if(this.students.length > 6){
            this.pageSlice = this.students.slice(0, 6);
          }else{
            this.pageSlice = this.students;
          }
          this.isLoading = false;
        }catch(e){
          console.log(e);
          this.isLoading = false;
        }
      });
    }, 2000); 
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
