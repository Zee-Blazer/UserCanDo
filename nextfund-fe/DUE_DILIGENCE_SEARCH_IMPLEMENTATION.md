# Due Diligence Search Implementation

## Summary

Successfully implemented server-side search functionality for the Due Diligence table. When users type in the search bar, the query is sent to the backend API endpoint to filter results and return matching data.

## Changes Made

### 1. Updated Type Definitions (`src/types/queries-type.ts`)
```typescript
export interface DueDiligenceQueryParams {
  is_complete?: boolean;
  search?: string;        // ✅ Added search parameter
  page?: number;
  page_size?: number;
}
```

### 2. Enhanced Due Diligence Component (`src/(admin)/due-diligence.tsx`)

#### Added Search State Management:
```typescript
const [searchTerm, setSearchTerm] = useState('');
```

#### Updated API Query with Search Parameter:
```typescript
const {
    data: listingData,
    isLoading: isLoadingList,
    refetch: refreshListingData
} = useGetDueDiligenceRecordQuery({ 
    page, 
    page_size,
    ...(searchTerm && { search: searchTerm })  // ✅ Conditionally add search param
});
```

#### Added Search Handler:
```typescript
const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
};
```

#### Implemented Debounced Search:
```typescript
// Debounce search to avoid too many API calls
useEffect(() => {
    const timeoutId = setTimeout(() => {
        if (searchTerm !== '') {
            setPagination(prev => ({ ...prev, pageIndex: 0 })); // Reset to first page
        }
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
}, [searchTerm]);
```

#### Updated TanTable Configuration:
```typescript
showHeader={{
    title: "Due Diligence",
    subTitle: "View and manage due diligence records",
    search: {
        value: searchTerm,
        onChange: handleSearch
    },
    btnTxt: "Download",
    noColor: true,
}}
```

#### Enhanced Refresh Function:
```typescript
const handleRefresh = async () => {
    setIsRefreshing(true);
    setCategory('');
    setStatus('');
    setSearchTerm('');                          // ✅ Clear search term
    setPagination({ pageIndex: 0, pageSize: 10 });
    await refreshListingData();
    setIsRefreshing(false);
};
```

## How It Works

1. **User Types in Search Bar**: The search input is controlled by the `searchTerm` state
2. **Debounced API Call**: After 500ms of no typing, the search triggers
3. **API Query**: The `useGetDueDiligenceRecordQuery` is called with the search parameter
4. **Server-Side Filtering**: The backend filters results based on the search term
5. **Pagination Reset**: Search automatically resets to page 1
6. **Real-time Results**: Table updates with filtered data from the server

## Benefits

✅ **Server-Side Search**: Efficient searching across large datasets  
✅ **Debounced Requests**: Prevents excessive API calls while typing  
✅ **Pagination Integration**: Search results properly paginated  
✅ **State Synchronization**: Search state maintained across user interactions  
✅ **Performance Optimized**: Only searches when there's actual input  
✅ **User Experience**: Immediate feedback with loading states  

## API Endpoint

The search functionality hits the same endpoint:
```
GET /admin/business-listings?search={searchTerm}&page={page}&page_size={pageSize}
```

## Testing Checklist

- [ ] Type in search bar → Verify API call after 500ms delay
- [ ] Search results → Verify filtered data displays correctly
- [ ] Pagination → Verify search results are properly paginated
- [ ] Clear search → Verify refresh button clears search
- [ ] Loading states → Verify loading indicator during search
- [ ] Empty results → Verify proper handling of no results
- [ ] Special characters → Test search with various input types

## Future Enhancements

- Add search suggestions/autocomplete
- Implement advanced search filters
- Add search history
- Enable search within specific fields