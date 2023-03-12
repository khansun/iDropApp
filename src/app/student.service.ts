import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from "./student";


@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private apiURL = environment.apiBaseUrl;
    private httpOptions:object;

    constructor (private http: HttpClient) {
        this.httpOptions= { headers: new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token')) };
    }
    
    
    public getStudents(): Observable<Student[]> {
         
        return this.http.get<Student[]>(`${this.apiURL}/all`, this.httpOptions);
    }

    public addStudent(student: Student): Observable<Student> {
        console.log(student);
        return this.http.post<Student>(`${this.apiURL}/add`, student, this.httpOptions);
    }

    public updateStudent(student: Student): Observable<Student> {
        console.log(student);
        return this.http.put<Student>(`${this.apiURL}/update`, student, this.httpOptions);
    }

    public deleteStudent(id: number): Observable<Student> {
        return this.http.delete<Student>(`${this.apiURL}/delete/${id}`, this.httpOptions);
    }
}
