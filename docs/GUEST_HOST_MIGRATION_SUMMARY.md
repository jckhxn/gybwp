# Guest and Host to Person Migration - Implementation Ready

## 🎯 Overview

This document provides the complete, ready-to-execute plan for migrating all guest and host data to the unified Person schema. All migration scripts have been created and are ready to run.

## 📁 Created Migration Files

### Migration Scripts

- ✅ `migrations/migrate-guests-to-persons.ts` - Migrates guest documents to person with role="guest"
- ✅ `migrations/migrate-host-to-person.ts` - Migrates host documents to person with role="host-consultant"
- ✅ `migrations/update-episode-references.ts` - Updates all episode references to use new person documents
- ✅ `migrations/run-full-migration.ts` - Orchestrates complete migration with validation and rollback

### Validation Scripts

- ✅ `scripts/validate-person-migration.ts` - Analyzes current state and migration readiness

### Documentation

- ✅ `docs/GUEST_HOST_MIGRATION_PLAN.md` - Comprehensive migration plan
- ✅ `docs/GUEST_HOST_MIGRATION_SUMMARY.md` - This implementation summary

## 🚀 Quick Start Commands

### 1. Check Current State

```bash
npx tsx scripts/validate-person-migration.ts
```

### 2. Run Full Migration

```bash
npx tsx migrations/run-full-migration.ts migrate
```

### 3. Validate Results

```bash
npx tsx migrations/run-full-migration.ts validate
```

### 4. Rollback if Needed

```bash
npx tsx migrations/run-full-migration.ts rollback
```

## 📋 Step-by-Step Execution Plan

### Phase 1: Pre-Migration Validation

1. **Check current state**:
   ```bash
   npx tsx scripts/validate-person-migration.ts
   ```
   - Shows counts of guests, hosts, persons, and episodes
   - Identifies what needs to be migrated
   - Provides migration readiness assessment

### Phase 2: Data Migration

2. **Run the full migration**:
   ```bash
   npx tsx migrations/run-full-migration.ts migrate
   ```
   This will:
   - Migrate all guest documents → person documents (role="guest")
   - Migrate all host documents → person documents (role="host-consultant")
   - Update all episode references to point to new person documents
   - Validate each step automatically
   - Rollback on any failure

### Phase 3: Schema Updates (Manual)

3. **Update schema exports** in:

   - `sanity/schemas/index.ts`
   - `src/app/(website)/sanity/schemas/index.ts`

   Remove guest and host imports/exports:

   ```typescript
   // Remove these lines:
   import guest from "./documents/guest";
   import host from "./documents/host";

   const schemas = [
     // Remove guest and host from array
     // guest,
     // host,
     // Keep person
     person,
   ];
   ```

### Phase 4: Query Updates (Manual)

4. **Update GROQ queries** in:

   - `data/sanity/queries.ts`
   - `src/app/(website)/lib/queries.ts`
   - `src/lib/queries.ts`

   Replace guest/host queries with person queries:

   ```typescript
   // Replace:
   export const GUEST_QUERY = groq`*[_type == "guest" && slug.current == $slug][0]`;

   // With:
   export const GUEST_QUERY = groq`*[_type == "person" && role == "guest" && slug.current == $slug][0]`;

   // Replace host references:
   "*[_type == "host"]" → "*[_type == "person" && role == "host-consultant"]"
   ```

### Phase 5: Component Updates (Manual)

5. **Update components** to use person data structure:
   - Update `TranscriptDisplay` component
   - Update guest detail pages
   - Update episode components
   - Update search functionality

### Phase 6: Final Cleanup

6. **Remove old schema files** (after testing):

   ```bash
   rm sanity/schemas/documents/guest.ts
   rm sanity/schemas/documents/host.ts
   rm src/app/(website)/sanity/schemas/guest.tsx  # if exists
   rm src/app/(website)/sanity/schemas/host.tsx   # if exists
   ```

7. **Final validation**:
   ```bash
   npx tsx scripts/validate-person-migration.ts
   ```

## 🛡️ Safety Features

### Automatic Rollback

- Each migration step can be rolled back individually
- Full migration has automatic rollback on failure
- All mapping files saved for reference updates

### Validation at Each Step

- Pre-migration validation
- Post-migration validation
- Comprehensive final validation
- Data integrity checks

### Backup Recommendations

- Create Sanity dataset backup before migration
- Test on development environment first
- Incremental deployment with feature flags

## 📊 Expected Results

### Before Migration

- **Guests**: N guest documents
- **Hosts**: N host documents
- **Persons**: Existing person documents
- **Episodes**: References point to guest/host documents

### After Migration

- **Guests**: 0 documents (migrated to persons)
- **Hosts**: 0 documents (migrated to persons)
- **Persons**: All guest/host data + existing persons
- **Episodes**: All references point to person documents

## 🔍 Data Mapping

### Guest → Person

```typescript
{
  _type: "person",
  role: "guest",
  name: guest.name,
  slug: guest.slug,
  pathname: `/person/${slug}`,
  guestProfile: {
    bio: guest.about,
    title: guest.title,
    website: guest.links?.website,
    profileImage: guest.image,
    socialLinks: guest.links?.social
  }
}
```

### Host → Person

```typescript
{
  _type: "person",
  role: "host-consultant",
  name: host.name,
  slug: host.slug,
  pathname: `/person/${slug}`,
  isMainHost: true, // for primary host
  consultingProfile: {
    bio: host.bio + company info,
    expertise: [host.title, company experience],
    profileImage: host.image,
    calendarLink: host.socialLinks?.website
  }
}
```

## 🎯 Post-Migration Benefits

1. **Unified Schema**: Single person type for all human entities
2. **Consistent URLs**: All people accessible via `/person/[slug]`
3. **Scalable**: Easy to add new person types (team, advisors, etc.)
4. **Page Builder**: Person documents support full page building
5. **Better UX**: Consistent person profile pages
6. **Maintainability**: Reduced code duplication

## ⚠️ Important Notes

1. **Environment Variables**: Ensure all Sanity environment variables are set
2. **Permissions**: Requires write access to Sanity dataset
3. **Testing**: Test thoroughly in development before production
4. **Timing**: Run during low-traffic periods for production
5. **Monitoring**: Watch for any broken references or missing data

## 🔗 Related Files

- Schema files: `sanity/schemas/documents/person.ts`
- Query files: `data/sanity/queries.ts`, `src/app/(website)/lib/queries.ts`
- Type definitions: `types/index.ts`
- Component files: All episode and guest-related components

---

**Status**: ✅ Ready for execution
**Last Updated**: July 7, 2025  
**Next Action**: Run `npx tsx scripts/validate-person-migration.ts` to begin
