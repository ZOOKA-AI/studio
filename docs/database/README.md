# Database Documentation

## Overview

The Royal Clean Dashboard uses Firebase Firestore as its primary database. This document provides comprehensive information about the database structure, collections, security rules, and best practices.

## Database Architecture

### Technology Stack
- **Database**: Cloud Firestore (NoSQL)
- **Project ID**: `studio-3445155934-dd06b`
- **SDK**: Firebase JavaScript SDK v11.9.1
- **Security**: Role-Based Access Control (RBAC)

### Design Principles

1. **Authorization Independence**: Denormalized authorization data for efficient access control
2. **Structural Segregation**: Data separated by access needs
3. **Immutable Audit Trail**: Append-only logs for accountability
4. **Performance Optimization**: Minimal document reads in security rules

## Collections

### Core Collections

#### 1. Users (`/users/{userId}`)
Stores user profiles with role information.

**Schema**: [`schemas/user.schema.json`](../schemas/user.schema.json)

**Fields**:
- `id` (string, required): Unique identifier
- `name` (string, required): User's full name
- `email` (string, required): Email address
- `role` (string, required): One of `admin`, `supervisor`, `worker`
- `createdAt` (timestamp): Account creation time
- `updatedAt` (timestamp): Last update time

**Access Control**:
- Read: Owner or Admin
- Create: Owner (self-registration)
- Update: Owner or Admin
- Delete: Admin only

**Indexes**:
- Single field: `email`, `role`
- Composite: `role + createdAt`

---

#### 2. Admin Roles (`/roles_admin/{userId}`)
Fast admin privilege verification collection.

**Purpose**: Existence of document grants admin rights (faster than field check)

**Access Control**: Admin only (read/write)

---

#### 3. Sites (`/sites/{siteId}`)
Cleaning site locations.

**Schema**: [`schemas/site.schema.json`](../schemas/site.schema.json)

**Fields**:
- `id` (string, required): Unique identifier
- `name` (string, required): Site name
- `clientId` (string, required): Reference to client
- `address` (string, required): Physical address
- `specialInstructions` (string): Additional notes
- `createdAt` (timestamp): Creation time
- `updatedAt` (timestamp): Last update time

**Access Control**: Supervisor/Admin (read/write)

**Indexes**:
- Single field: `clientId`, `name`
- Composite: `clientId + createdAt`

---

#### 4. Clients (`/clients/{clientId}`)
Client information.

**Schema**: [`schemas/client.schema.json`](../schemas/client.schema.json)

**Fields**:
- `id` (string, required): Unique identifier
- `name` (string, required): Client name
- `contactEmail` (string): Email address
- `contactPhone` (string): Phone number
- `createdAt` (timestamp): Creation time
- `updatedAt` (timestamp): Last update time

**Access Control**: Supervisor/Admin (read/write)

**Indexes**:
- Single field: `name`, `contactEmail`

---

#### 5. Daily Reports (`/dailyReports/{dailyReportId}`)
Supervisor-created work reports with denormalized authorization.

**Schema**: [`schemas/daily-report.schema.json`](../schemas/daily-report.schema.json)

**Fields**:
- `id` (string, required): Unique identifier
- `date` (date, required): Report date
- `siteId` (string, required): Reference to site
- `supervisorId` (string, required): **Denormalized** supervisor ID for access control
- `workerIds` (array<string>, required): **Denormalized** worker IDs for access control
- `startTime` (string): Start time
- `endTime` (string): End time
- `tasks` (array<string>): Completed tasks
- `additionalTasks` (array<string>): Extra tasks
- `materials` (array<string>): Materials used
- `beforeImages` (array<string>): Image URLs
- `afterImages` (array<string>): Image URLs
- `clientSignature` (string): Signature data
- `supervisorSignature` (string): Signature data
- `status` (string): One of `draft`, `in_progress`, `completed`, `approved`
- `totalCost` (number): Total cost

**Access Control**:
- Read: Supervisor/Admin or assigned worker
- Create: Supervisor (must set supervisorId = auth.uid)
- Update/Delete: Admin or assigned supervisor

**Indexes**:
- Single field: `date`, `siteId`, `supervisorId`, `status`
- Composite: `supervisorId + date`, `siteId + date`, `status + date`
- Array-contains: `workerIds`

**Validation Rules**:
- `clientName` must not be empty
- `workers` array must not be empty
- `tasks` array must not be empty

---

#### 6. Schedules (`/schedules/{scheduleId}`)
Job schedules with denormalized assignment data.

**Schema**: [`schemas/schedule.schema.json`](../schemas/schedule.schema.json)

**Fields**:
- `id` (string, required): Unique identifier
- `siteId` (string, required): Reference to site
- `startTime` (string, required): Start time
- `endTime` (string, required): End time
- `supervisorId` (string): **Denormalized** supervisor ID
- `workerIds` (array<string>): **Denormalized** worker IDs
- `createdAt` (timestamp): Creation time

**Access Control**:
- Read: Admin, assigned supervisor, or assigned worker
- Create: Supervisor/Admin (supervisor must set supervisorId = auth.uid)
- Update/Delete: Admin or assigned supervisor

**Indexes**:
- Single field: `siteId`, `supervisorId`, `startTime`
- Composite: `supervisorId + startTime`, `siteId + startTime`
- Array-contains: `workerIds`

---

#### 7. Tasks (`/tasks/{taskId}`)
Global task definitions (lookup table).

**Schema**: [`schemas/task.schema.json`](../schemas/task.schema.json)

**Access Control**: 
- Read: All authenticated users
- Write: Supervisor/Admin

---

#### 8. Materials (`/materials/{materialId}`)
Global material definitions (lookup table).

**Schema**: [`schemas/material.schema.json`](../schemas/material.schema.json)

**Access Control**: 
- Read: All authenticated users
- Write: Supervisor/Admin

---

#### 9. Equipment (`/equipment/{equipmentId}`)
Equipment inventory tracking.

**Schema**: [`schemas/equipment.schema.json`](../schemas/equipment.schema.json)

**Fields**:
- `id` (string, required): Unique identifier
- `name` (string, required): Equipment name
- `condition` (string, required): One of `ممتازة`, `جيدة`, `تحتاج صيانة`
- `quantity` (number, required): Available quantity
- `supervisor` (string, required): Responsible supervisor

**Access Control**: Supervisor/Admin (read/write)

---

#### 10. Worker Tasks (`/workerTasks/{workerTaskId}`)
Individual task assignments.

**Schema**: [`schemas/worker-task.schema.json`](../schemas/worker-task.schema.json)

**Access Control**: Supervisor/Admin (read/write)

---

#### 11. Appointments (`/appointments/{appointmentId}`)
Client appointment scheduling.

**Schema**: [`schemas/appointment.schema.json`](../schemas/appointment.schema.json)

**Access Control**: Supervisor/Admin (read/write)

---

#### 12. Audit Logs (`/auditLogs/{auditLogId}`)
**Immutable** audit trail (append-only).

**Schema**: [`schemas/audit-log.schema.json`](../schemas/audit-log.schema.json)

**Fields**:
- `id` (string, required): Unique identifier
- `userId` (string, required): User who made the change
- `entityType` (string, required): Type of entity modified
- `entityId` (string, required): ID of modified entity
- `timestamp` (datetime, required): When change occurred
- `action` (string, required): One of `create`, `update`, `delete`
- `oldValue` (string): Previous state (JSON)
- `newValue` (string): New state (JSON)

**Access Control**:
- Read: Admin only
- Create: Any authenticated user (must set userId = auth.uid)
- Update/Delete: **DENIED** (immutable)

**Indexes**:
- Single field: `userId`, `entityType`, `timestamp`
- Composite: `entityType + timestamp`, `userId + timestamp`

---

## Security Rules

See [`firestore.rules`](../../firestore.rules) for the complete ruleset.

### Key Security Features

1. **Role-Based Access Control (RBAC)**
   - Three roles: `admin`, `supervisor`, `worker`
   - Admin check via `/roles_admin` collection (fast)
   - Supervisor/Worker check via `role` field (requires read)

2. **Denormalized Authorization**
   - Reports and schedules include `supervisorId` and `workerIds`
   - Enables direct access checks without joins
   - Faster and more secure than hierarchical checks

3. **Immutable Audit Logs**
   - Append-only collection
   - Cannot be modified or deleted after creation
   - Ensures accountability

4. **Ownership Validation**
   - Users can only create their own profile
   - Supervisors can only create reports/schedules they supervise
   - Workers have read-only access to assigned items

## Indexes

### Required Composite Indexes

Create these indexes in Firebase Console or use the provided `firestore.indexes.json` file.

```json
{
  "indexes": [
    {
      "collectionGroup": "dailyReports",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "supervisorId", "order": "ASCENDING" },
        { "fieldPath": "date", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "dailyReports",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "siteId", "order": "ASCENDING" },
        { "fieldPath": "date", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "dailyReports",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "date", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "schedules",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "supervisorId", "order": "ASCENDING" },
        { "fieldPath": "startTime", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "auditLogs",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "entityType", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    }
  ]
}
```

## Best Practices

### 1. Data Denormalization
- Include authorization fields (`supervisorId`, `workerIds`) in documents
- Avoids expensive `get()` calls in security rules
- Improves query performance

### 2. Timestamp Fields
- Always include `createdAt` and `updatedAt` timestamps
- Use server timestamp: `serverTimestamp()`
- Enables temporal queries and audit trails

### 3. Array Fields for Many-to-Many
- Use `workerIds` array for worker assignments
- Enable `array-contains` queries
- Maximum 10 workers per assignment for performance

### 4. Status Fields
- Use enums for status fields (`draft`, `in_progress`, `completed`)
- Create indexes on status for filtering
- Validate allowed values in security rules

### 5. Soft Deletes (Optional)
- Consider adding `deletedAt` field instead of hard deletes
- Preserves data for audit purposes
- Filter out deleted items in queries

## Query Patterns

### Get All Reports for a Supervisor
```typescript
const reportsRef = collection(db, 'dailyReports');
const q = query(
  reportsRef,
  where('supervisorId', '==', currentUserId),
  orderBy('date', 'desc'),
  limit(50)
);
```

### Get Assigned Schedules for a Worker
```typescript
const schedulesRef = collection(db, 'schedules');
const q = query(
  schedulesRef,
  where('workerIds', 'array-contains', currentUserId),
  orderBy('startTime', 'asc')
);
```

### Search Reports by Site and Date Range
```typescript
const reportsRef = collection(db, 'dailyReports');
const q = query(
  reportsRef,
  where('siteId', '==', siteId),
  where('date', '>=', startDate),
  where('date', '<=', endDate),
  orderBy('date', 'desc')
);
```

## Data Migration

See [`migrations.md`](./migrations.md) for migration utilities and guides.

## Monitoring

### Key Metrics to Track
- Document read/write counts
- Security rule evaluation time
- Query performance
- Index usage
- Error rates

### Firebase Console Links
- [Firestore Database](https://console.firebase.google.com/project/studio-3445155934-dd06b/firestore)
- [Firestore Usage](https://console.firebase.google.com/project/studio-3445155934-dd06b/usage)
- [Firestore Indexes](https://console.firebase.google.com/project/studio-3445155934-dd06b/firestore/indexes)

## Troubleshooting

### Common Issues

1. **"Missing or insufficient permissions"**
   - Check user is authenticated
   - Verify user role in `/users/{userId}`
   - For admin operations, check `/roles_admin/{userId}` exists

2. **"Requires an index"**
   - Create composite index in Firebase Console
   - Or add to `firestore.indexes.json`

3. **Slow queries**
   - Review query complexity
   - Check index usage
   - Consider denormalizing data

4. **Security rule timeout**
   - Reduce `get()` calls in rules
   - Use denormalized fields
   - Simplify rule logic

## Related Documentation

- [Firestore Security Rules](../../firestore.rules)
- [JSON Schemas](../schemas/)
- [Firestore Indexes Configuration](./firestore.indexes.json)
- [Migration Guides](./migrations.md)
