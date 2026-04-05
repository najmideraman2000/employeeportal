# Employee Portal Full-Stack Application

## Overview
This is a full-stack Employee Portal application built as a comprehensive mini-project. It allows organizations to manage their employee directory with full CRUD capabilities, while automatically maintaining a system audit history of all database interactions. 

The application is fully containerized using Docker and utilizes a Multi-Stage Build architecture for both the Spring Boot backend and the React Vite frontend, ensuring consistent environments from local development to production.

## Tech Stack Architecture
**Backend:**
* Java 17
* Spring Boot 4.x (Spring Web, Spring Data JPA, Validation)
* PostgreSQL 15
* Springdoc OpenAPI 3.0.0 (Swagger Documentation)

**Frontend:**
* React (Vite)
* React Router DOM (State & Navigation Management)
* Axios (HTTP Client)
* Nginx (Static File Serving & Routing)

**Infrastructure:**
* Docker & Docker Compose (Monorepo architecture)

---

## Key Features
Beyond standard CRUD requirements, this application implements several enterprise-level best practices:

1. **Automated Audit Logging:** A dedicated `employee_history` table automatically logs a timestamped record every time an employee is Created, Updated, or Deleted.
2. **JPA Auditing:** All employee records automatically track their exact creation and last-modified timestamps at the database level.
3. **Global Exception Handling:** A `@ControllerAdvice` layer catches backend errors and validation failures, returning clean, standardized JSON responses rather than raw stack traces.
4. **Strict Request Validation:** The API strictly validates incoming payloads (e.g., ensuring Malaysian phone numbers are exactly 10-11 digits) before touching the database layer.
5. **Auto-Generated Documentation:** A fully interactive Swagger UI is generated at runtime based on the Java controller annotations.

---

## Project Structure
This repository uses a Monorepo pattern to keep the frontend, backend, and infrastructure strictly aligned.

```text
/employeeportal
 ├── /be-employeeportal      (Spring Boot Backend)
 │    ├── src/main/java/...
 │    ├── pom.xml
 │    └── Dockerfile         (Multi-stage Maven to Alpine JRE)
 ├── /fe-employeeportal      (React Vite Frontend)
 │    ├── src/...
 │    ├── package.json
 │    ├── nginx.conf         (React Router configuration)
 │    └── Dockerfile         (Multi-stage Node build to Nginx)
 └── docker-compose.yml      (Master infrastructure configuration)
```

---

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
* Docker Desktop (or Docker Engine)
* Git

### Installation & Execution
Because the application is fully Dockerized, you do not need to install Java, Node.js, or PostgreSQL on your local machine to run it.

1. Clone this repository to your local machine.
2. Open your terminal and navigate to the root directory of the project (the folder containing the master docker-compose file).
3. Build and start the infrastructure by running this command:
```bash
   docker-compose up --build -d
```
   
To stop the application cleanly without deleting your data, run:
```bash
   docker-compose stop
```
   
To completely tear down the application and wipe the database volume, run:
```bash
   docker-compose down -v
```

---

## Application Access Points

Once the Docker containers are running, you can access the different layers of the application here:

* **React Web UI:** http://localhost:5173
* **Swagger API Documentation:** http://localhost:8080/swagger-ui.html
* **Raw REST API Base URL:** http://localhost:8080/api/v1/employees

---

## REST API Endpoints

The backend exposes the following endpoints. You can test these directly through the Swagger UI link provided above.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/employees` | Fetches all employees, sorted alphabetically by name. |
| GET | `/api/v1/employees/{id}` | Fetches a single employee by their unique ID. |
| POST | `/api/v1/employees` | Creates a new employee. |
| PUT | `/api/v1/employees/{id}` | Updates an existing employee's name or contact number. |
| DELETE | `/api/v1/employees/{id}` | Deletes an employee from the system. |
| GET | `/api/v1/employees/history` | Fetches the complete system audit log, sorted by newest first. |
