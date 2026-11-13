# Search Functionality Documentation

## Overview

The Royal Clean Dashboard implements a comprehensive search system for finding and filtering data across multiple collections. This document explains the search architecture, usage, and best practices.

## Architecture

### Components

1. **Search Utilities** (`src/lib/search-utils.ts`)
   - Query builders for each collection
   - Filter parameter interfaces
   - Client-side filtering helpers

2. **Search Hook** (`src/hooks/use-search.tsx`)
   - React hook for executing searches
   - Pagination support
   - Debounced search variant

3. **UI Components**
   - `SearchBar` - Reusable search input component
   - `DailyReportsSearch` - Full-featured search for reports
   - Additional search components for other collections

## Usage

### Basic Search

```typescript
import { useSearch } from '@/hooks/use-search';
import { buildDailyReportsQuery } from '@/lib/search-utils';
import { useFirebase } from '@/firebase';

function MyComponent() {
  const { firestore } = useFirebase();
  
  const { results, isSearching, executeSearch } = useSearch(
    () => buildDailyReportsQuery(firestore, { 
      status: 'completed',
      limit: 20 
    }),
    true // auto-execute on mount
  );

  return (
    <div>
      {isSearching && <p>Loading...</p>}
      {results.map(report => (
        <div key={report.id}>{report.clientName}</div>
      ))}
    </div>
  );
}
```

### Search with Filters

```typescript
import { useState, useMemo } from 'react';
import { useSearch } from '@/hooks/use-search';
import { buildDailyReportsQuery, DailyReportSearchParams } from '@/lib/search-utils';

function SearchComponent() {
  const { firestore } = useFirebase();
  const [status, setStatus] = useState('');
  const [supervisorId, setSupervisorId] = useState('');

  const buildQuery = useMemo(() => {
    if (!firestore) return null;
    
    return () => {
      const params: DailyReportSearchParams = {
        status,
        supervisorId,
        limit: 20,
      };
      return buildDailyReportsQuery(firestore, params);
    };
  }, [firestore, status, supervisorId]);

  const { results, isSearching } = useSearch(buildQuery, true);

  return (
    <div>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="completed">Completed</option>
      </select>
      {/* Results display */}
    </div>
  );
}
```

### Debounced Search (Search-as-you-type)

```typescript
import { useState } from 'react';
import { useDebouncedSearch } from '@/hooks/use-search';
import { buildClientsQuery } from '@/lib/search-utils';

function ClientSearch() {
  const { firestore } = useFirebase();
  const [searchText, setSearchText] = useState('');

  const buildQuery = () => {
    if (!firestore || !searchText) return null;
    return buildClientsQuery(firestore, { 
      name: searchText,
      limit: 10 
    });
  };

  const { results, isSearching } = useDebouncedSearch(buildQuery, 300);

  return (
    <div>
      <input 
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search clients..."
      />
      {/* Results display */}
    </div>
  );
}
```

### Pagination

```typescript
function PaginatedSearch() {
  const { results, hasMore, loadMore, isSearching } = useSearch(
    () => buildDailyReportsQuery(firestore, { limit: 20 }),
    true
  );

  return (
    <div>
      {results.map(item => <div key={item.id}>{item.name}</div>)}
      
      {hasMore && !isSearching && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
}
```

## Search Parameters

### Daily Reports

```typescript
interface DailyReportSearchParams {
  siteId?: string;          // Filter by site
  supervisorId?: string;    // Filter by supervisor
  workerId?: string;        // Filter by assigned worker
  status?: string;          // Filter by status
  dateFrom?: Date;          // Start of date range
  dateTo?: Date;            // End of date range
  limit?: number;           // Max results
}
```

### Sites

```typescript
interface SiteSearchParams {
  clientId?: string;        // Filter by client
  name?: string;            // Prefix search on name
  limit?: number;
}
```

### Clients

```typescript
interface ClientSearchParams {
  name?: string;            // Prefix search on name
  contactEmail?: string;    // Prefix search on email
  limit?: number;
}
```

### Users/Workers

```typescript
interface WorkerSearchParams {
  role?: string;            // Filter by role
  name?: string;            // Prefix search on name
  email?: string;           // Prefix search on email
  limit?: number;
}
```

### Schedules

```typescript
interface ScheduleSearchParams {
  siteId?: string;
  supervisorId?: string;
  workerId?: string;
  status?: string;
  startTimeFrom?: Date;
  startTimeTo?: Date;
  limit?: number;
}
```

## Firestore Limitations

### What Firestore Search Can Do

- ✅ Exact match queries (`==`)
- ✅ Range queries (`>`, `>=`, `<`, `<=`)
- ✅ Array-contains queries
- ✅ Prefix matching (using `>=` and `<`)
- ✅ Ordering and limiting results
- ✅ Composite indexes for multiple filters

### What Firestore Search Cannot Do

- ❌ Full-text search (substring matching)
- ❌ Case-insensitive search without preprocessing
- ❌ Fuzzy search / typo tolerance
- ❌ Relevance ranking
- ❌ Complex text analysis

### Workarounds

1. **Prefix Matching**: For autocomplete-style search
   ```typescript
   where('name', '>=', 'john')
   where('name', '<', 'john\uf8ff')
   ```

2. **Client-Side Filtering**: For substring search
   ```typescript
   filterResultsClientSide(results, searchText, ['name', 'email'])
   ```

3. **Denormalization**: Store searchable text in lowercase
   ```typescript
   {
     name: "John Doe",
     nameLower: "john doe" // for case-insensitive search
   }
   ```

4. **External Search Service**: For advanced features
   - Algolia (recommended)
   - Elasticsearch
   - Typesense
   - MeiliSearch

## Required Indexes

The search queries require composite indexes in Firestore. These are defined in `firestore.indexes.json`:

```json
{
  "collectionGroup": "dailyReports",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "supervisorId", "order": "ASCENDING" },
    { "fieldPath": "date", "order": "DESCENDING" }
  ]
}
```

Deploy indexes with:
```bash
firebase deploy --only firestore:indexes
```

## Performance Optimization

### Best Practices

1. **Limit Results**: Always use `limit` parameter
   ```typescript
   buildDailyReportsQuery(db, { limit: 20 })
   ```

2. **Use Pagination**: Load more as needed
   ```typescript
   const { loadMore, hasMore } = useSearch(buildQuery);
   ```

3. **Debounce Text Input**: Avoid excessive queries
   ```typescript
   useDebouncedSearch(buildQuery, 300)
   ```

4. **Cache Results**: Results are automatically cached in React state

5. **Index Strategy**: Create indexes for common query patterns

### Avoiding Common Pitfalls

1. **Don't query without filters**: Always include at least one filter
2. **Don't use `orderBy` on unindexed fields**
3. **Don't combine incompatible queries**: 
   - Can't use range queries on multiple fields
   - Can't use inequality and array-contains on different fields

## Client-Side Filtering

For complex searches that can't be done in Firestore:

```typescript
import { filterResultsClientSide } from '@/lib/search-utils';

const results = await fetchFromFirestore();
const filtered = filterResultsClientSide(
  results,
  'search term',
  ['name', 'description', 'notes']
);
```

## Future Enhancements

### Planned Features

1. **Search History**: Store recent searches
2. **Saved Searches**: Allow users to save filter combinations
3. **Search Analytics**: Track popular searches
4. **Advanced Filters**: Date pickers, multi-select
5. **Export Results**: CSV/PDF export of search results

### Integration with Algolia

For production applications requiring advanced search:

```typescript
// Example Algolia integration
import algoliasearch from 'algoliasearch';

const client = algoliasearch('APP_ID', 'SEARCH_KEY');
const index = client.initIndex('daily_reports');

const { hits } = await index.search('search query', {
  filters: 'status:completed',
  hitsPerPage: 20,
});
```

## Testing

### Unit Tests

```typescript
import { buildDailyReportsQuery } from '@/lib/search-utils';
import { db } from '@/firebase/config';

describe('buildDailyReportsQuery', () => {
  it('should build query with status filter', () => {
    const query = buildDailyReportsQuery(db, { status: 'completed' });
    expect(query).toBeDefined();
  });
});
```

### Integration Tests

Test search components with mock Firestore data.

## Related Documentation

- [Database Documentation](./database/README.md)
- [Firestore Indexes](../firestore.indexes.json)
- [UI Components](../src/components/search/)
- [Hooks](../src/hooks/use-search.tsx)
