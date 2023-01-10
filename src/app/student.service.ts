import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from "./student";

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private apiURL = environment.apiBaseUrl;
    constructor (private http: HttpClient) {}
    
    public getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.apiURL}/all`);
    }

    public addStudent(student: Student): Observable<Student> {
        return this.http.post<Student>(`${this.apiURL}/add`, student);
    }

    public updateStudent(student: Student): Observable<Student> {
        return this.http.put<Student>(`${this.apiURL}/update`, student);
    }

    public deleteStudent(id: number): Observable<Student> {
        return this.http.delete<Student>(`${this.apiURL}/delete/${id}`);
    }
}
