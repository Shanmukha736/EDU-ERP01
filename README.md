# EDU-ERP01: Advanced Educational Resource Planning System

A production-ready, full-stack Educational ERP system built with **Spring Boot 3**, **React + Vite**, and **MySQL**. This platform provides a seamless workflow for Teachers, Students, and Administrators with high-end UI/UX and secure authentication.

## 🚀 Key Features

### 🔐 1. Secure Authentication & Authorization
- **JWT-Based Security**: Fully implemented stateless authentication using JSON Web Tokens.
- **Role-Based Access Control (RBAC)**: Distinct permissions for `STUDENT`, `TEACHER`, and `ADMIN`.
- **Protected Routes**: Frontend routes are guarded by a custom `ProtectedRoute` component that validates roles and tokens.
- **Auto-Session Management**: Tokens are stored in `localStorage` with automatic attachment to Axios requests via interceptors.

### 📚 2. Assignment Management (Teacher-Student Workflow)
- **Teacher Portal**:
    - Create assignments with titles, descriptions, due dates, and optional file attachments.
    - View all created assignments.
    - Monitor real-time student submissions.
    - **Grading System**: Provide numeric grades (0-100) and personalized feedback.
- **Student Portal**:
    - View all available assignments with status indicators (Pending/Submitted/Graded).
    - Upload work directly to the server.
    - View instructor grades and feedback instantly once published.

### 🧑‍🏫 3. Academic & Institutional Management
- **Real Student Data**: Removed all hard-coded mock data. Every student, teacher, and record is pulled directly from the MySQL database.
- **Attendance Tracking**: Teachers can mark daily attendance (Present/Absent/Late) for registered students.
- **Student Directory**: A comprehensive list of all registered users with status monitoring.
- **Teacher Dashboard**: Real-time stats on students taught, assignments created, and upcoming schedules.

### 🎨 4. Premium UI/UX Design
- **Modern Aesthetics**: A "Latte-Inspired" premium color palette using HSL tailored colors.
- **Responsive Layouts**: Fully adaptive designs for various screen sizes.
- **Micro-Animations**: Smooth transitions, hover effects, and loading states using Lucide-React icons.
- **Interactive Backgrounds**: Particle-based grid background that reacts to mouse movement.

## 🛠️ Technology Stack

- **Backend**: Java 17+, Spring Boot 3.x, Spring Security, Spring Data JPA, Hibernate.
- **Frontend**: React 18, Vite, Axios, Tailwind CSS, Lucide React, React Router 6.
- **Database**: MySQL 8.x.
- **Security**: JWT (jjwt library), BCrypt Password Encoding.

## ⚙️ Setup & Installation

### Backend Setup
1. Navigate to the `backend` folder.
2. Update `src/main/resources/application.properties` with your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/fsad
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure
```text
EDU-ERP01/
├── backend/                # Spring Boot Backend
│   ├── src/main/java/      # Source code (Controllers, Services, Config)
│   ├── src/main/resources/ # Configuration & Properties
│   └── uploads/            # Local storage for assignment files
├── frontend/               # React Frontend
│   ├── src/pages/          # Feature-based pages (Student, Teacher, Admin)
│   ├── src/services/       # API integration & Interceptors
│   ├── src/context/        # Auth & State management
│   └── src/components/     # Reusable UI components
└── README.md
```

## 🛡️ Security Implementation
- **CORS Config**: Configured to allow communication between `localhost:5173` and `localhost:8080`.
- **Stateless Session**: Spring Security is configured to be stateless (`SessionCreationPolicy.STATELESS`) to leverage JWT.
- **Exception Handling**: Global exception handler to manage API errors gracefully.

---
*Developed as part of the FSAD SEM-4 Project.*
