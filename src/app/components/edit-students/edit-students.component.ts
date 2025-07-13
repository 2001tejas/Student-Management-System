import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../../services/apiservices.service';
import { student } from '../../interfaces/student';
import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { routes } from '../../app.routes';

@Component({
  selector: 'app-edit-students',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-students.component.html',
  styleUrl: './edit-students.component.css'
})
export class EditStudentsComponent {
  // students: student[] = [];
  studentlist: student | undefined;

  constructor(private route: ActivatedRoute, private api: ApiservicesService, private router: Router) { }

  ngOnInit() {
    const studentId = this.route.snapshot.paramMap.get('id');
    this.api.getSelectedStudent(studentId).subscribe((data: student) => {
      this.studentlist = data;
    })
  }

  updateStudent(data: student) {
    this.api.updateSelectedStudents(data).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }
}

