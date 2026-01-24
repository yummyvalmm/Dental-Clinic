---
name: data-seeder
description: Manage database seeding for development and testing, leveraging existing seeding scripts.
---

# Data Seeder Skill

This skill automates the population of the Dental Clinic database with dummy data for development, testing, and UI verification.

## Core Responsibilities

- **Seeding Execution**: Run `src/services/seedService.js` to populate appointments, services, and users.
- **Data Cleanup**: Clear development collections before seeding to ensure a clean state.
- **Verification of Seeds**: Verify that seeded data is correctly indexed and accessible via Firestore.

## Available Resources

- **Seed Script**: [seedService.js](file:///Users/macbookair/Documents/Dental/src/services/seedService.js)
- **Manual Trigger**: The `HistoryPage.jsx` contains a button to trigger seeding in development mode.

## Procedures

### 1. Triggering a Seed
1.  Ask the user for permission to modify Firestore data if in a shared environment.
2.  Import and execute the `seedDatabase` function from `seedService.js`.
3.  Confirm success by listing the count of new documents in the `appointments` collection.

### 2. Custom Seeding
1.  Generate specific appointment sets (e.g., "all pending", "past year history") to test specific UI states like Empty States or Pagination.
