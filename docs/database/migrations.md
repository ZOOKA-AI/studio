# Database Migration Guide

This document provides utilities and guides for managing database migrations in the Royal Clean Dashboard.

## Migration Strategy

### Principles

1. **Backward Compatibility**: Always ensure new schemas are backward compatible
2. **Gradual Rollout**: Deploy schema changes before code changes
3. **Data Validation**: Validate all data before and after migration
4. **Rollback Plan**: Always have a rollback strategy
5. **Audit Trail**: Log all migration activities

## Migration Utilities

### 1. Add Timestamps to Existing Documents

Many existing documents may not have `createdAt` and `updatedAt` fields. This utility adds them:

```typescript
import { collection, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';

async function addTimestampsToCollection(collectionName: string) {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  
  let updated = 0;
  let errors = 0;
  
  for (const docSnap of snapshot.docs) {
    try {
      const data = docSnap.data();
      
      // Only update if timestamps are missing
      if (!data.createdAt || !data.updatedAt) {
        await updateDoc(doc(db, collectionName, docSnap.id), {
          createdAt: data.createdAt || serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        updated++;
      }
    } catch (error) {
      console.error(`Error updating document ${docSnap.id}:`, error);
      errors++;
    }
  }
  
  console.log(`Migration complete for ${collectionName}:`);
  console.log(`- Updated: ${updated} documents`);
  console.log(`- Errors: ${errors} documents`);
  console.log(`- Total: ${snapshot.size} documents`);
}

// Usage
await addTimestampsToCollection('dailyReports');
await addTimestampsToCollection('sites');
await addTimestampsToCollection('clients');
```

### 2. Validate Document Schemas

Validate all documents in a collection against their JSON schema:

```typescript
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Ajv from 'ajv';

async function validateCollection(collectionName: string, schema: object) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  
  const invalid: Array<{ id: string; errors: any }> = [];
  
  for (const docSnap of snapshot.docs) {
    const data = { ...docSnap.data(), id: docSnap.id };
    
    if (!validate(data)) {
      invalid.push({
        id: docSnap.id,
        errors: validate.errors
      });
    }
  }
  
  if (invalid.length > 0) {
    console.error(`Found ${invalid.length} invalid documents in ${collectionName}:`);
    invalid.forEach(({ id, errors }) => {
      console.error(`Document ${id}:`, errors);
    });
  } else {
    console.log(`All ${snapshot.size} documents in ${collectionName} are valid!`);
  }
  
  return invalid;
}

// Usage
import dailyReportSchema from '@/docs/schemas/daily-report.schema.json';
await validateCollection('dailyReports', dailyReportSchema);
```

### 3. Add Denormalized Fields

Add denormalized fields like `supervisorId` and `workerIds` to existing reports:

```typescript
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

async function denormalizeDailyReports() {
  const reportsRef = collection(db, 'dailyReports');
  const snapshot = await getDocs(reportsRef);
  
  for (const docSnap of snapshot.docs) {
    try {
      const data = docSnap.data();
      
      // Skip if already denormalized
      if (data.supervisorId && data.workerIds) {
        continue;
      }
      
      const updates: any = {};
      
      // Add supervisorId if missing
      if (!data.supervisorId && data.supervisor?.id) {
        updates.supervisorId = data.supervisor.id;
      }
      
      // Add workerIds if missing
      if (!data.workerIds && data.workers) {
        updates.workerIds = data.workers.map((w: any) => w.id);
      }
      
      // Add siteName if missing
      if (!data.siteName && data.siteId) {
        const siteDoc = await getDoc(doc(db, 'sites', data.siteId));
        if (siteDoc.exists()) {
          updates.siteName = siteDoc.data().name;
        }
      }
      
      if (Object.keys(updates).length > 0) {
        await updateDoc(doc(db, 'dailyReports', docSnap.id), updates);
        console.log(`Updated report ${docSnap.id}`);
      }
    } catch (error) {
      console.error(`Error updating report ${docSnap.id}:`, error);
    }
  }
}

// Usage
await denormalizeDailyReports();
```

### 4. Batch Update Utility

Perform batch updates with proper error handling:

```typescript
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';

async function batchUpdate(
  collectionName: string,
  updateFn: (data: any) => any | null
) {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  
  // Firestore batch limit is 500 operations
  const BATCH_SIZE = 500;
  let batch = writeBatch(db);
  let operationCount = 0;
  let totalUpdated = 0;
  
  for (const docSnap of snapshot.docs) {
    try {
      const data = docSnap.data();
      const updates = updateFn(data);
      
      if (updates) {
        batch.update(doc(db, collectionName, docSnap.id), updates);
        operationCount++;
        
        // Commit batch when we reach the limit
        if (operationCount >= BATCH_SIZE) {
          await batch.commit();
          totalUpdated += operationCount;
          console.log(`Committed batch of ${operationCount} updates`);
          batch = writeBatch(db);
          operationCount = 0;
        }
      }
    } catch (error) {
      console.error(`Error processing document ${docSnap.id}:`, error);
    }
  }
  
  // Commit remaining operations
  if (operationCount > 0) {
    await batch.commit();
    totalUpdated += operationCount;
    console.log(`Committed final batch of ${operationCount} updates`);
  }
  
  console.log(`Total documents updated: ${totalUpdated}`);
  return totalUpdated;
}

// Usage: Add status field to all daily reports without one
await batchUpdate('dailyReports', (data) => {
  if (!data.status) {
    return { status: 'completed' };
  }
  return null;
});
```

### 5. Data Export/Backup

Export collection data for backup before migration:

```typescript
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import * as fs from 'fs';

async function exportCollection(collectionName: string, outputPath: string) {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  
  // Convert Firestore Timestamps to ISO strings for JSON
  const jsonData = JSON.stringify(data, (key, value) => {
    if (value && typeof value.toDate === 'function') {
      return value.toDate().toISOString();
    }
    return value;
  }, 2);
  
  fs.writeFileSync(outputPath, jsonData);
  console.log(`Exported ${data.length} documents to ${outputPath}`);
  
  return data;
}

// Usage
await exportCollection('dailyReports', './backups/daily-reports.json');
await exportCollection('sites', './backups/sites.json');
```

## Common Migration Scenarios

### Scenario 1: Adding Required Fields

**Problem**: Adding a new required field to existing documents.

**Solution**: Use a default value for existing documents.

```typescript
await batchUpdate('sites', (data) => {
  if (!data.specialInstructions) {
    return { specialInstructions: '' };
  }
  return null;
});
```

### Scenario 2: Renaming Fields

**Problem**: Need to rename a field across all documents.

**Solution**: Copy data to new field, then optionally remove old field.

```typescript
import { deleteField } from 'firebase/firestore';

await batchUpdate('clients', (data) => {
  if (data.phone && !data.contactPhone) {
    return {
      contactPhone: data.phone,
      phone: deleteField() // Remove old field
    };
  }
  return null;
});
```

### Scenario 3: Changing Field Types

**Problem**: Need to change a field from string to number.

**Solution**: Parse and validate the conversion.

```typescript
await batchUpdate('equipment', (data) => {
  if (typeof data.quantity === 'string') {
    const quantity = parseInt(data.quantity, 10);
    if (!isNaN(quantity)) {
      return { quantity };
    }
  }
  return null;
});
```

### Scenario 4: Adding Composite Indexes

**Problem**: Need to query by multiple fields but index doesn't exist.

**Solution**: Add the index definition to `firestore.indexes.json` and deploy.

```json
{
  "collectionGroup": "dailyReports",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "supervisorId", "order": "ASCENDING" },
    { "fieldPath": "status", "order": "ASCENDING" },
    { "fieldPath": "date", "order": "DESCENDING" }
  ]
}
```

Then deploy indexes:

```bash
firebase deploy --only firestore:indexes
```

## Migration Checklist

Before running any migration:

- [ ] **Backup Data**: Export affected collections
- [ ] **Test in Development**: Run migration on development database first
- [ ] **Review Schema**: Ensure new schema is correct
- [ ] **Check Dependencies**: Verify no code depends on old structure
- [ ] **Prepare Rollback**: Have a script to reverse the migration
- [ ] **Monitor Performance**: Watch for slow queries after migration
- [ ] **Validate Data**: Run schema validation after migration
- [ ] **Update Documentation**: Update schema docs and API docs
- [ ] **Deploy Incrementally**: If possible, deploy in stages
- [ ] **Create Audit Log**: Log the migration in auditLogs collection

## Rollback Procedures

### Rollback from Backup

```typescript
import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '@/firebase/config';
import * as fs from 'fs';

async function restoreFromBackup(collectionName: string, backupPath: string) {
  const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
  
  const BATCH_SIZE = 500;
  let batch = writeBatch(db);
  let operationCount = 0;
  
  for (const item of backupData) {
    const { id, ...data } = item;
    batch.set(doc(db, collectionName, id), data);
    operationCount++;
    
    if (operationCount >= BATCH_SIZE) {
      await batch.commit();
      batch = writeBatch(db);
      operationCount = 0;
    }
  }
  
  if (operationCount > 0) {
    await batch.commit();
  }
  
  console.log(`Restored ${backupData.length} documents to ${collectionName}`);
}

// Usage
await restoreFromBackup('dailyReports', './backups/daily-reports.json');
```

## Best Practices

1. **Always Test First**: Run migrations on a copy of production data in development
2. **Use Transactions**: For related updates across multiple documents
3. **Log Everything**: Create audit logs for all migration operations
4. **Monitor Performance**: Watch database read/write metrics during migration
5. **Incremental Changes**: Make small, incremental changes rather than large migrations
6. **Version Control**: Keep migration scripts in version control with dates
7. **Documentation**: Document why each migration was necessary
8. **Validate Results**: Always validate data after migration

## Troubleshooting

### "Permission Denied" Errors

Ensure your security rules allow the migration operation. You may need to temporarily relax rules or use Admin SDK.

### "Index Required" Errors

Create the necessary indexes before running queries that need them.

### Timeout Errors

Break large migrations into smaller batches and add delays between batches.

### Data Inconsistencies

Run validation scripts to identify and fix inconsistent data before migration.

## Related Documentation

- [Database Documentation](./README.md)
- [Firestore Security Rules](../../firestore.rules)
- [JSON Schemas](../schemas/)
- [Firestore Indexes](../../firestore.indexes.json)
