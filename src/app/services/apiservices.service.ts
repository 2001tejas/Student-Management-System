import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/student";

  getStudentList(): Observable<student[]> {
    return this.http.get<student[]>(this.url);
  }

  getStudents(): Observable<student[]> {
    return this.http.get<student[]>(this.url);
  }

  saveStudent(data: student): Observable<student> {
    return this.http.post<student>(this.url, data);
  }

  deleteStudent(id: any): Observable<student> {
    return this.http.delete<student>(this.url + "/" + id)
  }

  getSelectedStudent(id: any): Observable<student> {
    return this.http.get<student>(this.url + "/" + id)
  }

  updateSelectedStudents(data: student): Observable<student> {
    return this.http.put<student>(this.url + "/" + data.id, data)
  }
}
