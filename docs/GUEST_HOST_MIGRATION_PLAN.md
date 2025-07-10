# Guest and Host to Person Schema Migration Plan

## Overview

This document outlines the comprehensive plan for migrating all guest and host data to the unified Person schema, removing the deprecated guest and host schemas, and updating all references throughout the codebase.

## Current State Analysis

### Schemas to Migrate

1. **`guest` schema** (`sanity/schemas/documents/guest.ts`)

   - Fields: `image`, `name`, `title`, `links` (website, social), `about`, `slug`
   - Used in: episode references, guest detail pages, transcript components

2. **`host` schema** (`sanity/schemas/documents/host.ts`)

   - Fields: `name`, `slug`, `title`, `image`, `bio`, `company`, `socialLinks`, `email`
   - Used in: episode references, transcript components

3. **`person` schema** (`sanity/schemas/documents/person.ts`) - Target Schema
   - Already has role-based fields for both guests and hosts
   - Fields: `name`, `slug`, `pathname`, `role`, `isMainHost`, `consultingProfile`, `guestProfile`, `sectionsBody`

### Current Usage Patterns

1. **Episode Schema References**:

   - Direct guest references: `guests[] -> reference to guest`
   - Transcript segment references: `guestRef -> reference to guest`, `hostRef -> reference to host`

2. **GROQ Queries**:

   - `GUEST_QUERY`, `GUEST_DETAIL_QUERY` in query files
   - Episode queries that expand guest/host references
   - Transcript queries with host/guest resolution

3. **Components**:
   - Guest detail pages
   - Episode cards with guest listings
   - Transcript display with speaker resolution
   - Search functionality across episodes and guests

## Migration Steps

### Phase 1: Data Migration Scripts

#### 1.1 Migrate Guest Data to Person

- **File**: `migrations/migrate-guests-to-persons.ts`
- **Actions**:
  - Query all guest documents
  - Create corresponding person documents with role="guest"
  - Map guest fields to guestProfile fields:
    - `name` → `name`
    - `image` → `guestProfile.profileImage`
    - `title` → `guestProfile.title`
    - `about` → `guestProfile.bio`
    - `links.website` → `guestProfile.website`
    - `links.social` → `guestProfile.socialLinks`
    - `slug` → `slug`
  - Generate pathname based on slug
  - Store mapping of old guest IDs to new person IDs

#### 1.2 Migrate Host Data to Person

- **File**: `migrations/migrate-host-to-person.ts`
- **Actions**:
  - Query all host documents
  - Create corresponding person documents with role="host-consultant"
  - Map host fields to consultingProfile fields:
    - `name` → `name`
    - `image` → `consultingProfile.profileImage`
    - `bio` → `consultingProfile.bio`
    - `title` → combined with company for expertise
    - `company` → part of bio or expertise
    - `socialLinks` → extract website for consultingProfile
    - `slug` → `slug`
  - Set `isMainHost: true` for the primary host
  - Generate pathname based on slug
  - Store mapping of old host IDs to new person IDs

#### 1.3 Update Episode References

- **File**: `migrations/update-episode-references.ts`
- **Actions**:
  - Query all episodes with guest/host references
  - Update `guests[]` references to point to new person documents
  - Update transcript segment `guestRef` and `hostRef` to point to new person documents
  - Update any other episode fields that reference guests/hosts

### Phase 2: Schema Updates

#### 2.1 Update Episode Schema

- **File**: `sanity/schemas/documents/episode.ts` (and website version)
- **Actions**:
  - Change guest reference type from `guest` to `person`
  - Update transcript segment references from `guest`/`host` to `person`
  - Add validation to ensure referenced persons have appropriate roles
  - Update field descriptions and labels

#### 2.2 Remove Old Schema Exports

- **Files**: `sanity/schemas/index.ts`, `src/app/(website)/sanity/schemas/index.ts`
- **Actions**:
  - Remove guest and host imports
  - Remove guest and host from schema exports
  - Keep person schema export

### Phase 3: Query Updates

#### 3.1 Update GROQ Queries

- **Files**: `data/sanity/queries.ts`, `src/app/(website)/lib/queries.ts`, `src/lib/queries.ts`
- **Actions**:
  - Replace `GUEST_QUERY` with `PERSON_QUERY` filtered by role="guest"
  - Replace `GUEST_DETAIL_QUERY` with `PERSON_DETAIL_QUERY`
  - Update episode queries to reference person instead of guest/host:
    - `*[_type == "guest"]` → `*[_type == "person" && role == "guest"]`
    - `*[_type == "host"]` → `*[_type == "person" && role == "host-consultant"]`
  - Update transcript queries to use person references
  - Update any queries that expand guest/host references

#### 3.2 Add New Person-Specific Queries

- **Actions**:
  - `PERSON_BY_ROLE_QUERY` - get persons by role
  - `MAIN_HOST_QUERY` - get the main host/consultant
  - `GUEST_EPISODES_QUERY` - episodes for a specific guest
  - `HOST_EPISODES_QUERY` - episodes for a specific host

### Phase 4: Component Updates

#### 4.1 Update Guest-Related Components

- **Files**: Components that currently use guest data
- **Actions**:
  - Update `TranscriptDisplay` component to work with person references
  - Update guest detail pages to use person data structure
  - Update episode components to use person data instead of guest data
  - Update search functionality to search person documents

#### 4.2 Update Route Handling

- **Files**: Guest detail page routes
- **Actions**:
  - Update `/guest/[slug]` routes to use person queries
  - Consider adding redirects from old guest URLs to new person URLs
  - Update any navigation or linking that references guest pages

### Phase 5: Type Updates

#### 5.1 Update TypeScript Types

- **File**: `types/index.ts`
- **Actions**:
  - Remove guest-specific types if they exist
  - Update episode types to reference PersonPayload instead of guest types
  - Update component prop types throughout the codebase

### Phase 6: Cleanup

#### 6.1 Remove Old Schema Files

- **Files**: `sanity/schemas/documents/guest.ts`, `sanity/schemas/documents/host.ts`
- **Actions**:
  - Delete the files after confirming all references are updated
  - Remove any corresponding files in `src/app/(website)/sanity/schemas/`

#### 6.2 Update Migration Runner

- **File**: `migrations/run-full-migration.ts`
- **Actions**:
  - Add the new migration scripts to the full migration sequence
  - Ensure proper order of execution
  - Add validation steps

### Phase 7: Validation and Testing

#### 7.1 Create Validation Scripts

- **File**: `scripts/validate-person-migration.ts`
- **Actions**:
  - Verify all guests are migrated to persons
  - Verify all hosts are migrated to persons
  - Verify all episode references are updated
  - Check for any orphaned references
  - Validate data integrity

#### 7.2 Create Test Scripts

- **Actions**:
  - Test guest detail page functionality
  - Test episode display with person data
  - Test transcript functionality
  - Test search functionality
  - Verify all queries return expected results

## Implementation Order

1. **Week 1**: Data Migration Scripts (Phase 1)

   - Create and test migration scripts
   - Run migrations on development environment
   - Validate data migration results

2. **Week 2**: Schema and Query Updates (Phases 2-3)

   - Update episode schema
   - Update all GROQ queries
   - Test queries in development

3. **Week 3**: Component Updates (Phase 4)

   - Update all components to use person data
   - Update routing and navigation
   - Test frontend functionality

4. **Week 4**: Types, Cleanup, and Validation (Phases 5-7)
   - Update TypeScript types
   - Remove old schema files
   - Run comprehensive validation
   - Deploy to production

## Risk Mitigation

1. **Data Backup**: Create full backup before starting migration
2. **Incremental Testing**: Test each phase thoroughly before proceeding
3. **Rollback Plan**: Keep migration scripts that can reverse changes if needed
4. **Validation**: Comprehensive validation at each step
5. **Gradual Deployment**: Consider feature flags for gradual rollout

## Files to Modify

### Migration Scripts

- `migrations/migrate-guests-to-persons.ts`
- `migrations/migrate-host-to-person.ts`
- `migrations/update-episode-references.ts`
- `migrations/run-full-migration.ts`

### Schema Files

- `sanity/schemas/documents/episode.ts`
- `src/app/(website)/sanity/schemas/episode.tsx`
- `sanity/schemas/index.ts`
- `src/app/(website)/sanity/schemas/index.ts`

### Query Files

- `data/sanity/queries.ts`
- `src/app/(website)/lib/queries.ts`
- `src/lib/queries.ts`

### Component Files

- `src/components/features/TranscriptDisplay/index.tsx`
- `src/components/features/EpisodeCard/index.tsx`
- `src/components/features/LatestEpisode/index.tsx`
- `src/components/pages/EpisodesPage/episodes-page.tsx`
- `src/components/pages/SponsorsDetailPage/index.tsx`
- Guest detail page components
- Episode detail page components

### Type Files

- `types/index.ts`

### Validation Scripts

- `scripts/validate-person-migration.ts`

## Expected Benefits

1. **Unified Schema**: Single person schema for all human entities
2. **Consistency**: Consistent data structure across guests and hosts
3. **Scalability**: Easier to add new person types (team members, etc.)
4. **Maintainability**: Reduced code duplication
5. **Flexibility**: Person schema supports page builder for dedicated pages
6. **Better UX**: Consistent person profile pages
