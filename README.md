📊 CashBuzz – Smart Expense Tracker
CashBuzz is a modern, secure, and animated expense tracking web application that helps users manage income and expenses, visualize spending patterns, and stay logged in securely using Google OAuth — all inside a clean, responsive dashboard.

🚀 Live Features Overview
<img width="1050" height="576" alt="image" src="https://github.com/user-attachments/assets/b76be0d6-31fa-4dbf-baa8-035bdb428b99" />
<img width="1059" height="580" alt="image" src="https://github.com/user-attachments/assets/be858ff0-fe4a-473f-aab5-40354b6ee0e2" />

🔐 Authentication & Security
Google OAuth 2.0 Login
<img width="1057" height="574" alt="image" src="https://github.com/user-attachments/assets/002ced8e-389f-4f25-8ef1-89cca7a2f76a" />

Session‑based authentication (Spring Security)

Protected APIs (user stays logged in until logout)

Secure handling of secrets using environment variables

💻 Frontend Features
Modern landing page with background video

Smooth scroll animations (AOS)

Clean typography (Poppins + DM Sans)

Fully responsive UI (desktop & mobile)

Animated buttons, cards & hover effects

Dashboard with:
<img width="1038" height="582" alt="image" src="https://github.com/user-attachments/assets/8ff537e4-32fd-48ba-a1dd-1ff8dc5724f1" />

Total Income

Total Expenses

Profit / Loss

Record count

Charts & analytics (Chart.js)

Add / Delete:

Income

Expenses

Filter by category & source

Logout functionality

⚙️ Backend Features
RESTful APIs using Spring Boot

Google OAuth integration

User auto‑creation on first Google login

Secure session management

CRUD APIs for:

Income

Expense

Filtering, sorting & reporting APIs

Clean layered architecture (Controller → Service → Repository)

JPA + Hibernate

MySQL / PostgreSQL support (configurable)

🛠️ Tech Stack
Frontend
HTML5

CSS3 (Animations & Responsive Design)

JavaScript (ES6)

Chart.js

AOS (Animate On Scroll)

Backend
Java 17

Spring Boot

Spring Security

OAuth2 Client (Google)

Spring Data JPA

Hibernate

Database
MySQL (Local)

Can be switched to PostgreSQL (Production)

Tools & DevOps
Git & GitHub

IntelliJ IDEA / VS Code

Maven

Environment Variables for secrets

📂 Project Structure
CashBuzz
│
├── src/main/java/com/example/CashBuzz
│   ├── config          # Security & CORS config
│   ├── controller      # REST Controllers
│   ├── entity          # JPA Entities
│   ├── repository      # JPA Repositories
│   ├── service         # Business Logic
│   └── enums           # Expense & Income enums
│
├── src/main/resources
│   ├── application.properties
│
├── frontend
│   ├── index.html
│   ├── dashboard.html
│   ├── style.css
│   ├── dashboard.css
│   └── dashboard.js
│
└── pom.xml


👩‍💻 Author
Kiran Jaiswal
Built with ❤️ and real‑world practices
