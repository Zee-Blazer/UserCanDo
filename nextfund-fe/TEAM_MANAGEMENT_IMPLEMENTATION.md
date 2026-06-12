# Team Management Implementation

## Overview
A complete team member management system integrated into the Business Settings page with full CRUD operations (Create, Read, Update, Delete).

## Architecture

### 1. API Layer (`/src/queries/businessApi.ts`)

Added four RTK Query endpoints with automatic cache invalidation:

```typescript
// GET - Fetch all team members
getBusinessTeamMembers: builder.query<any, { ref_kind: string; ref_id: string }>

// POST - Add new team member  
addBusinessTeamMember: builder.mutation<any, { ref_kind: string; ref_id: string; data: any }>

// PUT - Update existing team member
updateBusinessTeamMember: builder.mutation<any, { ref_kind: string; ref_id: string; member_id: string; data: any }>

// DELETE - Remove team member
deleteBusinessTeamMember: builder.mutation<any, { ref_kind: string; ref_id: string; member_id: string }>
```

**Cache Management:**
- Uses `businessTeam` tag for automatic cache invalidation
- Mutations automatically refetch the team list after changes
- No manual refetch needed - RTK Query handles it

### 2. Components

#### TeamManagement Component (`/src/components/business/settings/team-management.tsx`)

**Main Features:**
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Real-time data synchronization with RTK Query
- ✅ Form validation (all fields required)
- ✅ Loading states for all operations
- ✅ Success/error toast notifications
- ✅ Responsive design (mobile & desktop)
- ✅ Add/Edit mode with single form
- ✅ Empty state when no team members exist

**Props:**
```typescript
interface TeamManagementProps {
    ref_kind?: 'business' | 'listing';  // Default: 'business'
}
```

**State Management:**
- Uses `businessUserProfile.business_id` from Redux
- Automatically fetches team data on mount
- Updates local state when API data changes

#### TeamMemberCard Component (`/src/components/business/settings/team-member-card.tsx`)

**Features:**
- ✅ Clean card design with avatar
- ✅ Role badge with color coding
- ✅ Truncated description (2 lines max)
- ✅ Edit and Delete action buttons
- ✅ Hover effects for better UX
- ✅ Disabled state during deletion

**Props:**
```typescript
interface TeamMemberCardProps {
    member: TeamMember;
    onEdit: (member: TeamMember) => void;
    onDelete: (member: TeamMember) => void;
    isDeleting?: boolean;
}
```

### 3. Integration

#### Business Settings Page (`/src/(business)/settings-page.tsx`)

Added Team Management section at the bottom of settings:

```tsx
<Box sx={{
    p: 3,
    border: '1px solid #EEF1F4',
    borderRadius: '12px',
    backgroundColor: 'white',
    mb: 3
}}>
    <TeamManagement ref_kind="business" />
</Box>
```

## API Endpoints

### Base URL Pattern
```
/{ref_kind}/{ref_id}/team
```

### GET - Retrieve Team Members
**URL:** `GET /{ref_kind}/{ref_id}/team`

**Response:**
```json
{
  "is_success": true,
  "payload": {
    "listing_id": "89647b1f-765b-439b-978a-3c6cecb50e11",
    "team": [
      {
        "id": "6f5f481e-6ea8-489a-8786-b29f81c1c89d",
        "role": "Staff",
        "last_name": "Doe",
        "first_name": "John",
        "description": "string"
      }
    ]
  },
  "message": "Team members retrieved successfully"
}
```

### POST - Add Team Member
**URL:** `POST /{ref_kind}/{ref_id}/team`

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "role": "Staff",
  "description": "string"
}
```

**Response:**
```json
{
  "is_success": true,
  "payload": {
    "first_name": "John",
    "last_name": "Doe",
    "role": "Staff",
    "description": "string",
    "id": "6f5f481e-6ea8-489a-8786-b29f81c1c89d"
  },
  "message": "Team member added successfully."
}
```

### PUT - Update Team Member
**URL:** `PUT /{ref_kind}/{ref_id}/team?member_id={member_id}`

**Request Body:**
```json
{
  "first_name": "string",
  "last_name": "string",
  "role": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "is_success": true,
  "payload": {
    "id": "6f5f481e-6ea8-489a-8786-b29f81c1c89d",
    "role": "Staff",
    "last_name": "Doe",
    "first_name": "John",
    "description": "Something important"
  },
  "message": "Team member updated successfully."
}
```

### DELETE - Remove Team Member
**URL:** `DELETE /{ref_kind}/{ref_id}/team?member_id={member_id}`

**Response:**
```json
{
  "is_success": true,
  "payload": {
    "removed_member_id": "6237f7f1-745d-4c18-b45a-102b63cd6824"
  },
  "message": "Team member removed successfully."
}
```

## Available Roles

The component includes predefined roles:
- CEO
- CTO
- COO
- CFO
- CMO
- VP of Engineering
- VP of Sales
- VP of Marketing
- Head of Product
- Head of Operations
- Lead Developer
- Senior Developer
- Product Manager
- Sales Manager
- Marketing Manager
- Staff
- Other

## User Flow

### Adding a Team Member
1. User clicks "Add Member" button
2. Form appears with fields: First Name, Last Name, Role, Description
3. User fills in all required fields
4. Clicks "Add Member" button
5. API call is made to POST endpoint
6. Success toast appears
7. Form closes and new member appears in the list
8. List automatically refreshes via cache invalidation

### Editing a Team Member
1. User clicks Edit icon on a team member card
2. Form opens with pre-filled member data
3. User modifies fields
4. Clicks "Update Member" button
5. API call is made to PUT endpoint
6. Success toast appears
7. Form closes and member card updates
8. List automatically refreshes

### Deleting a Team Member
1. User clicks Delete icon on a team member card
2. API call is made to DELETE endpoint
3. Success toast appears
4. Member is removed from the list
5. List automatically refreshes

## Error Handling

- ✅ Network errors show error toasts
- ✅ Validation prevents empty submissions
- ✅ Loading states prevent double submissions
- ✅ Graceful handling of API errors with user-friendly messages

## Styling

**Design System:**
- Primary Color: `#043A66` (Blue - buttons, role badges)
- Success Color: `#33CC33` (Green - save button)
- Error Color: `#B3261E` (Red - delete button)
- Border Color: `#EEF1F4` (Light gray)
- Background: `white` with subtle shadows

**Responsive Breakpoints:**
- Mobile: Single column layout
- Desktop: Two-column grid for team cards
- Form fields stack on mobile, side-by-side on desktop

## Performance Optimizations

1. **RTK Query Caching:** Automatic cache management reduces API calls
2. **Optimistic Updates:** UI updates immediately, then syncs with server
3. **Lazy Loading:** Team data only fetches when component mounts
4. **Memoization:** Component re-renders only when data changes

## Testing Checklist

- [ ] Add a new team member
- [ ] Edit an existing team member
- [ ] Delete a team member
- [ ] Form validation (empty fields)
- [ ] Loading states during operations
- [ ] Error handling (network errors)
- [ ] Toast notifications
- [ ] Responsive design (mobile/desktop)
- [ ] Empty state display
- [ ] Multiple team members display
- [ ] Cancel button functionality

## Future Enhancements

Potential improvements:
1. Bulk operations (add/delete multiple members)
2. Search/filter team members
3. Sort by role or name
4. Member profile pictures
5. Team member permissions
6. Export team list to CSV
7. Confirmation dialog for delete operations
8. Drag-and-drop to reorder members

## Files Modified/Created

### Created:
1. `/src/components/business/settings/team-management.tsx` - Main component
2. `/src/components/business/settings/team-member-card.tsx` - Card component

### Modified:
1. `/src/queries/businessApi.ts` - Added 4 team endpoints
2. `/src/queries/index.ts` - Added `businessTeam` cache tag
3. `/src/(business)/settings-page.tsx` - Integrated team management

## Build Status
✅ **Build Successful** - No TypeScript errors, all 55 pages generated successfully
