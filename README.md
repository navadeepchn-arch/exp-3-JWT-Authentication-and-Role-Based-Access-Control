# Full Stack Development — Experiment 3

## JWT Authentication and Role-Based Access Control

A React-based authentication and authorization system demonstrating JWT-based authentication, Role-Based Access Control (RBAC), protected routes, conditional navigation, and role-aware user interfaces.

## Live Demo

**Vercel Deployment:**  
https://exp-3-omega.vercel.app/login

**GitHub Repository:**  
https://github.com/navadeepchn-arch/exp-3-JWT-Authentication-and-Role-Based-Access-Control

---

## Aim

To implement JWT-based authentication and Role-Based Access Control (RBAC) in a React application using Redux Toolkit and React Router, providing secure authentication, role-based authorization, protected routes, and dynamic user interfaces.

---

## Objectives

- Implement a login interface with credential validation.
- Generate and manage a JWT-like authentication token.
- Store authentication tokens using browser storage.
- Decode JWT payload information.
- Maintain authentication state using Redux Toolkit.
- Implement token-based stateless session management.
- Define Admin, Editor, and Viewer roles.
- Implement Role-Based Access Control.
- Protect routes according to user roles.
- Restrict unauthorized users from accessing protected pages.
- Dynamically display navigation options according to user permissions.
- Provide a dedicated unauthorized access page.
- Demonstrate JWT session information through a token inspection interface.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Vite | Development and build tool |
| Redux Toolkit | Authentication state management |
| React Redux | Connecting Redux with React |
| React Router DOM | Routing and protected navigation |
| JavaScript | Application logic |
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| LocalStorage | Authentication token persistence |
| Vercel | Deployment |

---

## System Overview

The application implements two major security concepts:

**JWT Authentication**

Authentication verifies the user's credentials and creates a token representing the authenticated session.

**Role-Based Access Control**

Authorization determines which pages and features the authenticated user can access based on their assigned role.

The application supports three roles:

| Role | Access Level |
|---|---|
| Admin | Full access |
| Editor | Content management access |
| Viewer | Read-only access |


## System Architecture

The application follows a component-based React architecture with Redux Toolkit for centralized authentication state and React Router for protected navigation.

                         ┌───────────────────────┐
                         │         USER          │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │      LOGIN PAGE       │
                         │       Login.jsx       │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │ Credential Validation │
                         │     mockUsers.js      │
                         └───────────┬───────────┘
                                     │
                         ┌───────────┴───────────┐
                         │                       │
                     INVALID                    VALID
                         │                       │
                         ▼                       ▼
                  ┌─────────────┐       ┌─────────────────┐
                  │ Login Error │       │   JWT Creation  │
                  └─────────────┘       │      jwt.js     │
                                        └────────┬────────┘
                                                 │
                                                 ▼
                                        ┌─────────────────┐
                                        │   LocalStorage  │
                                        │    authToken    │
                                        └────────┬────────┘
                                                 │
                                                 ▼
                                        ┌─────────────────┐
                                        │   Redux Store   │
                                        │   authSlice.js  │
                                        └────────┬────────┘
                                                 │
                                                 ▼
                                        ┌─────────────────┐
                                        │ ProtectedRoute  │
                                        │ Authentication  │
                                        │ + Authorization │
                                        └────────┬────────┘
                                                 │
                                                 ▼
                                        ┌─────────────────┐
                                        │    Role Check   │
                                        └────────┬────────┘
                                                 │
                         ┌───────────────────────┼───────────────────────┐
                         │                       │                       │
                         ▼                       ▼                       ▼
                    ┌─────────┐             ┌─────────┐             ┌─────────┐
                    │  ADMIN  │             │  EDITOR │             │  VIEWER │
                    └────┬────┘             └────┬────┘             └────┬────┘
                         │                       │                       │
                         ▼                       ▼                       ▼
                    Full Access            Content Access            Read Access
JWT Authentication Flow
┌──────────────┐
│ User Login   │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ Validate Credentials │
│    mockUsers.js      │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│    Generate JWT      │
│       jwt.js         │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Store Token in       │
│     LocalStorage     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Update Redux         │
│ Authentication State │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Access Protected     │
│       Routes         │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Decode JWT Payload   │
│ User + Role Claims   │
└──────────────────────┘
JWT Structure

The generated token follows the standard three-part JWT structure:

Header.Payload.Signature
Header

Contains token metadata:

Algorithm: HS256
Type: JWT
Payload

Contains user-related claims:

{
  "sub": 1,
  "username": "admin",
  "name": "Admin User",
  "role": "admin",
  "iat": "...",
  "exp": "..."
}

The payload contains:

User ID
Username
Name
Role
Issued-at timestamp
Expiration timestamp
Signature

The project uses a mock signature mechanism to demonstrate the JWT structure and authentication flow.

JWT Session Management

The authentication token is stored in browser localStorage.

The application performs the following process:

LocalStorage
     │
     ▼
Retrieve authToken
     │
     ▼
Check Token Expiration
     │
     ▼
Decode JWT Payload
     │
     ▼
Restore Redux Authentication State

When the user logs out:

Logout
  │
  ├── Clear Redux authentication state
  │
  └── Remove authToken from LocalStorage

The application also provides a JWT Session Details section that displays:

Token status
Algorithm
Token type
Subject ID
Username
Issued time
Expiration time
Role-Based Access Control

The application defines three roles with different permissions.

Admin

Full system access.

Dashboard
Profile
Content Management
Admin Panel
Editor

Content management access.

Dashboard
Profile
Content Management
Viewer

Read-oriented access.

Dashboard
Profile
RBAC Permission Matrix
Route / Feature	Admin	Editor	Viewer
Login	✓	✓	✓
Dashboard	✓	✓	✓
Profile	✓	✓	✓
Content Management	✓	✓	✗
Admin Panel	✓	✗	✗
Protected Route Architecture

The ProtectedRoute component performs both authentication and authorization checks.

                    User Requests Route
                           │
                           ▼
                   ┌─────────────────┐
                   │ Authenticated?  │
                   └───────┬─────────┘
                           │
                 ┌─────────┴─────────┐
                 │                   │
                NO                  YES
                 │                   │
                 ▼                   ▼
           ┌───────────┐     ┌───────────────┐
           │  /login   │     │ Check User    │
           └───────────┘     │     Role      │
                             └───────┬───────┘
                                     │
                           ┌─────────┴─────────┐
                           │                   │
                       Role Allowed        Role Denied
                           │                   │
                           ▼                   ▼
                    ┌────────────┐      ┌──────────────┐
                    │ Show Page  │      │ /unauthorized│
                    └────────────┘      │     403      │
                                        └──────────────┘
This prevents unauthorized users from accessing restricted pages even if they manually enter the URL.

Role-Based Navigation

The sidebar dynamically changes according to the authenticated user's role.

Admin
Dashboard
Content
Admin Panel
Profile
Editor
Dashboard
Content
Profile
Viewer
Dashboard
Profile

The application therefore implements both:

Conditional UI rendering
Route-level authorization
Application Pages
Login
Username and password authentication
Credential validation
Login error handling
Demo access buttons
JWT authentication information
Security-focused interface
Dashboard
User information
Current role
Authentication status
JWT session status
Role verification status
Protected route status
JWT token inspection
Decoded token information
Content Management

Available to Admin and Editor users.

Content statistics
Published content
Draft content
Content library
Role-based access information
Admin Panel

Available only to Admin users.

User management overview
Role information
Security status
Authentication status
Protected route status
Profile

Available to all authenticated users.

Account information
Username
Role
Account ID
Permission overview
Authentication status
Unauthorized

A dedicated 403 access-restricted page is displayed when a user attempts to access a route that is not permitted for their role.

Demo Credentials
Role	Username	Password
Admin	admin	admin123
Editor	editor	editor123
Viewer	viewer	viewer123

The Login page also provides quick-access buttons for each role.

Project Structure
exp-3-JWT-Authentication-and-Role-Based-Access-Control/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   └── store.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── features/
│   │   └── auth/
│   │       ├── authSlice.js
│   │       ├── authSelectors.js
│   │       └── mockUsers.js
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Content.jsx
│   │   ├── Admin.jsx
│   │   ├── Profile.jsx
│   │   └── Unauthorized.jsx
│   │
│   ├── utils/
│   │   └── jwt.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
Key Files
File	Responsibility
main.jsx	Application entry point, Redux Provider and BrowserRouter setup
App.jsx	Application routing and RBAC configuration
store.js	Redux store configuration
authSlice.js	Authentication state, login, logout and token persistence
authSelectors.js	Authentication and role selectors
mockUsers.js	Mock credentials and role definitions
jwt.js	JWT creation, decoding and expiration checking
ProtectedRoute.jsx	Authentication and RBAC route protection
Login.jsx	Login interface and authentication flow
Navbar.jsx	User information and logout
Sidebar.jsx	Role-based navigation
Dashboard.jsx	Authentication and JWT session dashboard
Content.jsx	Content management interface
Admin.jsx	Administrative interface
Profile.jsx	User profile and permissions
Unauthorized.jsx	403 unauthorized access page
index.css	Application styling and responsive layout
Application Flow
                         ┌───────────────┐
                         │     LOGIN     │
                         └───────┬───────┘
                                 │
                                 ▼
                       ┌───────────────────┐
                       │ Validate Username │
                       │    + Password     │
                       └─────────┬─────────┘
                                 │
                        ┌────────┴────────┐
                        │                 │
                     INVALID             VALID
                        │                 │
                        ▼                 ▼
                 ┌────────────┐   ┌──────────────┐
                 │ Login Error│   │ Generate JWT │
                 └────────────┘   └──────┬───────┘
                                         │
                                         ▼
                                  ┌─────────────┐
                                  │ LocalStorage│
                                  └──────┬──────┘
                                         │
                                         ▼
                                  ┌─────────────┐
                                  │ Redux Store │
                                  └──────┬──────┘
                                         │
                                         ▼
                                  ┌─────────────┐
                                  │ Protected   │
                                  │   Routes    │
                                  └──────┬──────┘
                                         │
                                         ▼
                                  ┌─────────────┐
                                  │ Role Check  │
                                  └──────┬──────┘
                                         │
                    ┌────────────────────┼───────────────────┐
                    │                    │                   │
                    ▼                    ▼                   ▼
                 Admin                Editor              Viewer
                    │                    │                   │
                    ▼                    ▼                   ▼
               Full Access         Content Access       Read Access
Installation and Setup

Clone the repository:

git clone https://github.com/navadeepchn-arch/exp-3-JWT-Authentication-and-Role-Based-Access-Control.git

Navigate into the project:

cd exp-3-JWT-Authentication-and-Role-Based-Access-Control

Install dependencies:

npm install

Start the development server:

npm run dev

Build the application:

npm run build

Preview the production build:

npm run preview
Testing Scenarios
Test Case	Expected Result
Valid Admin login	Full application access
Valid Editor login	Dashboard, Profile and Content access
Valid Viewer login	Dashboard and Profile access
Invalid credentials	Login error displayed
Browser refresh	Authentication session persists
Logout	Token removed and redirected to Login
Viewer → /content	403 Unauthorized
Viewer → /admin	403 Unauthorized
Editor → /admin	403 Unauthorized
Admin → /admin	Admin Panel accessible
Security Demonstration

The project demonstrates:

Token-based authentication
JWT payload decoding
Token expiration checking
Authentication state management
Protected routes
Role-based authorization
Conditional navigation
Unauthorized access handling
Session persistence
Logout and token removal

Learning Outcomes
Gained practical knowledge of implementing JWT-based authentication in a React application.
Learned how to generate, store, decode, and manage JWT tokens for stateless user sessions.
Implemented Role-Based Access Control (RBAC) with Admin, Editor, and Viewer roles.
Learned to create protected routes and role-specific navigation using React Router.
Developed an understanding of permission-based UI rendering and unauthorized access handling in a full-stack application.
