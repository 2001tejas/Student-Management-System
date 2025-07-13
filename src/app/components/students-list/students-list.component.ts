import { Component } from '@angular/core';
import { ApiservicesService } from '../../services/apiservices.service';
import { student } from '../../interfaces/student';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent {

  studentList: student[] = [];             // Full list from API
  studentListFiltered: student[] = [];     // Filtered list for display
  className: number | null = null;
  searchField: string = 'name';
  searchValue: string = '';
  sortField: keyof student | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';


  constructor(private api: ApiservicesService, private router: Router) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.api.getStudentList().subscribe((data: student[]) => {
      this.studentList = data;
      this.studentListFiltered = data; // Initially show all
    });
  }

  delete(id: any) {
    this.api.deleteStudent(id).subscribe(() => {
      this.getStudents();
    });
  }

  edit(id: any) {
    if (id) {
      this.router.navigate(['/edit', id]);
    }
  }

  searchStudents() {
    const field = this.searchField;
    const value = this.searchValue.trim().toLowerCase();

    if (!value) {
      this.studentListFiltered = this.studentList;
      return;
    }

    this.studentListFiltered = this.studentList.filter((student) => {
      const target = String(student[field as keyof student]).toLowerCase();
      return target.includes(value);
    });

    if (this.sortField) {
      this.sortStudents();
    }
  }

  highlightText(text: string, match: string): string {
    if (!match) return text;
    const regex = new RegExp(`(${match})`, 'gi');
    return text.replace(regex, `<mark>$1</mark>`);
  }

  resetFilter() {
    this.searchField = 'name';
    this.searchValue = '';
    this.studentListFiltered = this.studentList;
  }

  sortBy(field: keyof student) {
    if (this.sortField === field) {
      // Toggle sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortStudents();
  }

  // sortStudents() {
  //   this.studentListFiltered = [...this.studentListFiltered].sort((a, b) => {
  //     const field = this.sortField!;
  //     const valA = String(a[field]).toLowerCase();
  //     const valB = String(b[field]).toLowerCase();

  //     if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
  //     if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
  //     return 0;
  //   });
  // }

  sortStudents() {
    const field = this.sortField as keyof student;

    this.studentListFiltered = [...this.studentListFiltered].sort((a, b) => {
      const valA = String(a[field]).toLowerCase();
      const valB = String(b[field]).toLowerCase();

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }


  exportToCSV() {
    const headers = ['ID', 'Name', 'Class', 'Age'];
    const rows = this.studentListFiltered.map(student => [
      student.id,
      student.name,
      student.class,
      student.age
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';

    rows.forEach(rowArray => {
      csvContent += rowArray.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'students_list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
