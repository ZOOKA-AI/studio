# Deployment Guide

## Overview

This guide explains how to deploy the database improvements to your Firebase project.

## Prerequisites

- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project configured
- Access to Firebase Console

## Deployment Steps

### 1. Deploy Firestore Indexes

The `firestore.indexes.json` file defines composite indexes required for search queries.

```bash
# Preview indexes to be created
firebase deploy --only firestore:indexes --project your-project-id

# Deploy indexes
firebase deploy --only firestore:indexes --project studio-3445155934-dd06b
```

**Expected Output:**
```
✔  Deploy complete!

Indexes created:
- dailyReports (supervisorId, date)
- dailyReports (siteId, date)
- dailyReports (status, date)
- schedules (supervisorId, startTime)
- auditLogs (entityType, timestamp)
... and more
```

**Note**: Index creation can take several minutes to hours depending on data size.

### 2. Deploy Firestore Security Rules

Security rules are already in `firestore.rules`. If you've made changes, deploy them:

```bash
firebase deploy --only firestore:rules --project your-project-id
```

### 3. Install Dependencies

Ensure all required packages are installed:

```bash
npm install
```

Required packages (already in package.json):
- `zod` - Runtime validation
- `firebase` - Firebase SDK
- `next` - Next.js framework

### 4. Build the Application

```bash
npm run build
```

This will:
- Type-check all TypeScript files
- Compile Next.js application
- Bundle client and server code

### 5. Deploy to Firebase Hosting (Optional)

If using Firebase Hosting:

```bash
firebase deploy --only hosting --project your-project-id
```

### 6. Verify Deployment

After deployment, verify everything works:

1. **Check Indexes**:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Navigate to Firestore Database → Indexes
   - Verify all indexes are created and active

2. **Test Search**:
   ```typescript
   // In your app
   const results = await getDocs(
     buildDailyReportsQuery(db, { status: 'completed' })
   );
   console.log('Search results:', results.size);
   ```

3. **Test Validation**:
   ```typescript
   try {
     await addValidatedDoc(db, 'users', UserInputSchema, testData);
     console.log('Validation working!');
   } catch (error) {
     console.error('Validation failed:', error);
   }
   ```

## Environment Variables

Ensure these environment variables are set:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=studio-3445155934-dd06b
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Migration Steps

### Migrating Existing Data

If you have existing data, you may need to migrate it to match the new schemas:

1. **Backup Data**:
   ```bash
   # Export all collections
   firebase firestore:export gs://your-bucket/backups/$(date +%Y%m%d)
   ```

2. **Add Timestamps**:
   ```typescript
   import { addTimestampsToCollection } from '@/docs/database/migrations';
   
   // Add createdAt/updatedAt to existing documents
   await addTimestampsToCollection('dailyReports');
   await addTimestampsToCollection('sites');
   await addTimestampsToCollection('clients');
   ```

3. **Denormalize Data**:
   ```typescript
   import { denormalizeDailyReports } from '@/docs/database/migrations';
   
   // Add supervisorId and workerIds to reports
   await denormalizeDailyReports();
   ```

4. **Validate Data**:
   ```typescript
   import { validateCollection } from '@/docs/database/migrations';
   import dailyReportSchema from '@/docs/schemas/daily-report.schema.json';
   
   // Check all documents are valid
   const invalid = await validateCollection('dailyReports', dailyReportSchema);
   ```

## Monitoring

### Check Index Status

```bash
# List all indexes
firebase firestore:indexes --project your-project-id
```

### Monitor Query Performance

In Firebase Console:
1. Go to Firestore Database → Usage
2. Monitor:
   - Read operations
   - Write operations
   - Index usage

### Monitor Errors

Check application logs for validation errors:

```typescript
// In your error handling
if (error instanceof ValidationError) {
  // Log to analytics
  analytics.logEvent('validation_error', {
    collection: 'users',
    errors: error.errors
  });
}
```

## Troubleshooting

### Index Creation Failed

**Problem**: Index creation times out or fails.

**Solution**:
1. Check Firebase Console for error messages
2. Ensure you have enough Firestore quota
3. Try creating indexes one at a time
4. Delete unused indexes to free up quota

### Validation Errors After Deployment

**Problem**: Existing data fails validation.

**Solution**:
1. Check validation error messages
2. Update data to match schema requirements
3. Or adjust schema to match existing data format
4. Use migration scripts to transform data

### Search Returns No Results

**Problem**: Search queries return empty results.

**Solution**:
1. Check if required indexes are created
2. Verify data exists in the collection
3. Check Firestore security rules allow read access
4. Test query in Firebase Console

### "Missing Index" Errors

**Problem**: Queries fail with "missing index" error.

**Solution**:
1. Click the link in the error message to create the index
2. Or add the index definition to `firestore.indexes.json`
3. Run `firebase deploy --only firestore:indexes`

## Rollback Procedure

If you need to rollback:

1. **Restore Previous Indexes**:
   ```bash
   # Revert firestore.indexes.json to previous version
   git checkout HEAD^ firestore.indexes.json
   firebase deploy --only firestore:indexes
   ```

2. **Restore Previous Rules**:
   ```bash
   git checkout HEAD^ firestore.rules
   firebase deploy --only firestore:rules
   ```

3. **Restore Data** (if needed):
   ```bash
   # Import from backup
   firebase firestore:import gs://your-bucket/backups/20240202
   ```

## Performance Optimization

### After Deployment

1. **Monitor Query Performance**:
   - Check slow queries in Firebase Console
   - Optimize queries using indexes

2. **Cache Frequently Accessed Data**:
   - Implement caching for lookup tables (tasks, materials)
   - Use React Query or SWR for client-side caching

3. **Optimize Bundle Size**:
   ```bash
   # Analyze bundle
   npm run build
   # Check .next/analyze for bundle size
   ```

## Security Checklist

After deployment, verify:

- [ ] All security rules are deployed
- [ ] Only authenticated users can access data
- [ ] Admin role checks work correctly
- [ ] Validation prevents invalid data writes
- [ ] Audit logs are immutable
- [ ] No sensitive data in client-side code

## Next Steps

After successful deployment:

1. **Monitor Performance**: Check Firestore usage and costs
2. **User Testing**: Test search and validation features
3. **Gather Feedback**: Collect user feedback on new features
4. **Iterate**: Improve based on usage patterns

## Support

For issues or questions:
- Check [Firebase Documentation](https://firebase.google.com/docs/firestore)
- Review [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)
- Check individual documentation:
  - [Database Documentation](./database/README.md)
  - [Search Documentation](./search.md)
  - [Validation Documentation](./validation.md)

## Deployment Checklist

- [ ] Install Firebase CLI
- [ ] Deploy Firestore indexes
- [ ] Deploy security rules (if changed)
- [ ] Install npm dependencies
- [ ] Build application
- [ ] Deploy to hosting (if applicable)
- [ ] Verify indexes are active
- [ ] Test search functionality
- [ ] Test validation
- [ ] Migrate existing data (if needed)
- [ ] Monitor performance
- [ ] Check security rules
- [ ] Backup current data
