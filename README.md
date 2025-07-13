
# Student Management System (Angular + JSON Server)

A simple yet elegant Student Management System built with Angular. This application allows you to add, edit, view, and delete student records. It features a clean UI, responsive design, and interactive dashboard charts.


## Features

🔐 Login page with simple email/password authentication

📋 Student list view

➕ Add student form

✏️ Edit student data

🗑️ Delete student entries

📊 Dashboard with dynamic charts using ng2-charts

📡 JSON Server as a backend to simulate RESTful APIs

🎨 Beautiful UI with Bootstrap 5


## Tech Stack

**Client:** Angular 17+, TypeScript, Bootstrap 5,ng2-charts (Chart.js)

**Server:** JSON Server (Mock API)


## Installation

Install student-management-angular with npm

```bash
  git clone https://github.com/2001tejas/Student-Management-System
  cd student-management-angular
```

Install dependencies

```bash
npm install
```

Run JSON Server
Make sure you have JSON Server installed globally:

```bash
npm install -g json-server
```

Then run the server:

```bash
npx json-server db.json
```

This will run the API at: http://localhost:3000/student


Start Angular app

```bash
ng serve
```

Open in browser: http://localhost:4200
