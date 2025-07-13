import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { student } from '../../interfaces/student';
import { ApiservicesService } from '../../services/apiservices.service';
import { Router } from '@angular/router';
// import { StudentsListComponent } from '../students-list/students-list.component';


@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  constructor(private http: ApiservicesService, private router: Router) { }

  addStudent(data: student) {
    this.http.saveStudent(data).subscribe((data: student) => {
      this.router.navigate(['/list']); // replace with your target route
    })

  }
}