---
name: firebase-management
description: Manage Firebase Firestore and FCM for the Dental Clinic project. Bridge between MCP tools and project-specific data structures.
---

# Firebase Management Skill

This skill provides specialized knowledge and workflows for managing the Firebase backend of the Dental Clinic project.

## Core Responsibilities

- **Firestore Operations**: Query, read, and write to the `appointments`, `users`, and `user_push_tokens` collections.
- **Push Notifications**: Manage FCM tokens and send targeted or broadcast notifications.
- **Data Validation**: Ensure data written to Firestore adheres to the project's schemas.

## Targeted Collections

| Collection | Description | Document Structure |
|------------|-------------|--------------------|
| `appointments` | Bookings for dental services | `{ serviceId, date, time, name, phone, status }` |
| `user_push_tokens` | FCM device tokens for users | `{ token, userId, deviceType, lastUpdated }` |
| `users` | Patient and staff user profiles | `{ email, name, role, pushNotificationsEnabled }` |

## Common Workflows

### 1. Verification of FCM Tokens
Use `firestore_read_collection` on `user_push_tokens` to view active tokens before broadcasting.

### 2. Appointment Status Updates
Use `firestore_write_document` to update an appointment's `status` (e.g., from `pending` to `confirmed`).

### 3. Sending targeted test notifications
Use `fcm_send_notification` with a specific token found in the `user_push_tokens` collection.

## Important Notes

- **FCM Server Key**: The server uses the `service-account.json` for authentication.
- **Timestamp Handling**: Use Firestore server timestamps when writing dates.
- **Rules**: Always respect the `firestore.rules` during operations.
