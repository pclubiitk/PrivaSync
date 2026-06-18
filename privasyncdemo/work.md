# PrivAsync Frontend Iteration - 1
## Objective

Build the  frontend UI for the PrivAsync Federated Learning Platform using Next.js and shadcn/ui.

### Important Notes

* Backend integration is NOT part of this iteration.
* Use mock data wherever required.
* Follow the common design language.
* Use reusable shadcn/ui components.


---

# Common Guidelines

## Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui

## Branch Naming

```bash
feature/<feature-name>
```

Examples:

```bash
feature/auth-ui
feature/user-dashboard
feature/admin-dashboard
feature/user-training
```

---

# Task 1 - Authentication Module

## Members



## Deliverables

### Login Page

* Email input
* Password input
* Remember me checkbox


### Signup Page

#### Step 1

* Name
* Email
* Organization
* Password
* Confirm Password

#### Step 2

* OTP Verification


### Additional Requirements

* Form validation
* Responsive design
* Error state UI
* Success state UI

---

# Task 2 - User Dashboard

## Members



## Deliverables

### Dashboard Overview

* Recent training jobs
* Activity timeline
* Recent notifications

### Additional Requirements

* Mock data
* Responsive design

---

# Task 3 - Admin Dashboard

## Members



## Deliverables

### Admin Overview

* Total users
* Active users
* Active training sessions
* Global system statistics
* Dashboard charts

### Additional Requirements

* Mock analytics data
* Responsive layout

---

# Task 4 - User Model Training Module

## Members



## Deliverables

### Training Configuration

* Dataset selection /upload


### Training UI

* Create training job
* View training progress
* View training history

### Additional Requirements

* Progress simulation using mock data

---

# Task 5 - Admin Training Monitoring & Model Distribution

## Members



## Deliverables

### Training Monitoring

* Active training sessions
* Round progress tracking
* Participant tracking

### Model Distribution

* Distribution history
* Round summaries
* Status indicators

### Additional Requirements


* Progress bars
* Mock data

---

# Task 6 - Global Infrastructure

## Members



## Deliverables

### Context Setup

```txt
contexts/
├── AuthContext
├── LoaderContext
```



# Task 7 - Notification

## Members



## Deliverables

### Notification Module

* Notification list
* Notification filters
* Notification badge

### Additional Requirements

* Toast notifications
* Mock notification data

---

# Task 8 - Landing Page

## Members



## Deliverables

### Sections

* A HackMD style page where user can type and our model will predict the next word in real-time.

### Additional Requirements

* Modern UI
* Responsive design

---

# Task 9  - Global Layout & Navigation
### Layout Setup

```txt
layouts/
├── DashboardLayout
├── AdminLayout
```

### Shared Navigation

* Navbar
* Sidebar
* Mobile navigation

### Additional Requirements

* Clean provider architecture
* Reusable layout components

---


# Task 10 - Dockerfile for frontend 



# Design Rules

## Theme


## Components

Use shadcn/ui components wherever possible.

Examples:

* Button
* Input
* Card
* Table
* Badge
* Dialog
* Tabs
* Select
* Progress
* Toast

---


