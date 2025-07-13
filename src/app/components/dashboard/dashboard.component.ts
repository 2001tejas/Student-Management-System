import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { student } from '../../interfaces/student';
import { ApiservicesService } from '../../services/apiservices.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  studentList: student[] = [];

  constructor(private api: ApiservicesService) { }

  chartType: ChartType = 'bar';
  chartTypes: ChartType[] = ['pie', 'bar', 'doughnut', 'line', 'polarArea', 'radar'];
  chartData: any;
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true }
    }
  };

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.api.getStudents().subscribe((data: student[]) => {
      this.studentList = data;

      const classCounts: { [key: string]: number } = {};

      data.forEach(student => {
        const cls = student.class.toString();
        classCounts[cls] = (classCounts[cls] || 0) + 1;
      });

      // Sort class labels numerically
      const sortedClasses = Object.keys(classCounts).sort((a, b) => Number(a) - Number(b));

      this.chartData = {
        labels: sortedClasses,
        datasets: [
          {
            label: 'Students per Class',
            data: sortedClasses.map(cls => classCounts[cls]),
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#009688'],
          }
        ]
      };
    });

  }

}
