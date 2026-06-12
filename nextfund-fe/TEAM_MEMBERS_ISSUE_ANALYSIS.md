# Team Members Display Issue - Analysis

## Problem Summary

Team members are showing as "Unknown" or "No team members available" even though the actual team data exists in the API response.

## Root Cause Analysis

### 🔴 **BACKEND ISSUE (Primary)**

The structured endpoint `/api/v1/investor/business-listings/{listing_id}` is returning **placeholder data** instead of actual team member information.

#### Evidence:

```json
// Structured Endpoint Response (WRONG)
{
  "team": {
    "members": [
      {
        "name": "Unknown", // ❌ Placeholder data
        "title": null,
        "bio": null
      }
    ]
  }
}
```

#### Actual Data Available:

```json
// Full Listings Endpoint Response (CORRECT)
{
  "company_metrics_and_financial_information": {
    "team_details": [
      {
        "id": "2b3e0234-2474-4d27-a0fc-465f956a722e",
        "role": "Developer",
        "last_name": "Doe",
        "first_name": "John",
        "description": "Former executive at Safaricom M-Pesa with 12 years of fintech experience."
      }
    ]
  }
}
```

### 🟡 **FRONTEND ISSUE (Secondary)**

The frontend is trying to work around the backend issue by:

1. Fetching all listings from `/api/v1/investor/business-listings`
2. Finding the specific listing that matches the `investmentId`
3. Extracting `team_details` from `company_metrics_and_financial_information`

However, the listing search might be failing because:

- The `investmentId` from the URL might not match the `id` in the listings array
- The query might not be executing (checking if `skip` condition is preventing it)
- Timing issue: data might load after component renders

## Backend Fix Required

### What the Backend Engineer Needs to Do:

1. **Fix the Structured Endpoint** (`/api/v1/investor/business-listings/{listing_id}`):

   - The `team.members` array should be populated from `company_metrics_and_financial_information.team_details`
   - Transform the data structure from:
     ```json
     {
       "first_name": "John",
       "last_name": "Doe",
       "role": "Developer",
       "description": "..."
     }
     ```
   - To:
     ```json
     {
       "name": "John Doe", // Combine first_name + last_name
       "title": "Developer", // Use role as title
       "bio": "..." // Use description as bio
     }
     ```

2. **Data Mapping Logic**:

   ```python
   # Pseudo-code for backend fix
   team_members = []
   if listing.company_metrics_and_financial_information.team_details:
       for member in listing.company_metrics_and_financial_information.team_details:
           team_members.append({
               "name": f"{member.first_name} {member.last_name}".strip(),
               "title": member.role or member.title,
               "bio": member.description or member.bio
           })

   # Return in team.members structure
   response["team"]["members"] = team_members
   ```

3. **Filter Out Invalid Data**:
   - Don't return members with `name: "Unknown"` or empty names
   - Only return members that have valid `first_name` and/or `last_name`

## Frontend Workaround (Current Implementation)

The frontend is currently:

1. ✅ Fetching full listings as fallback
2. ✅ Searching for the matching listing by `id`, `business_id`, or `listing_id`
3. ✅ Extracting `team_details` from `company_metrics_and_financial_information`
4. ✅ Transforming `first_name` + `last_name` → `name`
5. ✅ Filtering out "Unknown" members

**However**, the search might be failing. Check browser console for:

- `[InvestmentDetail] Full listing search:` - Should show if listing was found
- `[InvestmentDetail] Rendering TeamTabContent with:` - Should show what data is passed
- `[TeamTabContent] Data sources:` - Shows what TeamTabContent receives

## Recommended Solution

### Option 1: Backend Fix (Preferred)

- Fix the structured endpoint to return actual team data
- Frontend can then use the structured endpoint directly
- Cleaner, more maintainable solution

### Option 2: Frontend Workaround (Current)

- Continue using the full listings endpoint as fallback
- Ensure the listing search logic is robust
- Add better error handling and logging

## Testing Checklist

### Backend Testing:

- [ ] Verify `/api/v1/investor/business-listings/{listing_id}` returns actual team members
- [ ] Verify team members have `name` (not "Unknown")
- [ ] Verify `title` and `bio` are populated
- [ ] Test with listings that have multiple team members
- [ ] Test with listings that have no team members (should return empty array)

### Frontend Testing:

- [ ] Check browser console for debug logs
- [ ] Verify `fullListingData` is loading
- [ ] Verify listing is found in search
- [ ] Verify `rawListingData` is passed to `TeamTabContent`
- [ ] Verify team members are displayed correctly

## Debug Information Needed

To help diagnose the frontend issue, please check the browser console for:

1. `[InvestmentDetail] No fullListingData or investmentId:` - Shows if query is running
2. `[InvestmentDetail] Full listing search:` - Shows search results
3. `[InvestmentDetail] Listing not found, available IDs:` - Shows available listings if search fails
4. `[InvestmentDetail] Rendering TeamTabContent with:` - Shows what's being passed
5. `[TeamTabContent] Data sources:` - Shows what TeamTabContent receives

If these logs are missing, it means:

- The query might be skipped (check `skip: !investmentId`)
- The component might be rendering before data loads
- There might be a React rendering issue
