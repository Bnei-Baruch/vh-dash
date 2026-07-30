# CLAUDE.md

## Project Overview

This is a React-based dashboard for the Kabbalah Community virtual home platform, providing features like events calendar, live broadcasts, membership management, profile management, and study materials.

## Development Commands

Standard `npm` scripts — see `package.json`.

Gotcha: `start` and `build` both need the `--openssl-legacy-provider` flag (already wired into the scripts) for Node.js OpenSSL compatibility. Don't remove it.

## Architecture

### Authentication & Authorization
- **Keycloak Integration**: Authentication is handled through Keycloak SSO in `src/config/Auth.js`
- All components are wrapped in the `<Auth>` component which handles:
  - User profile loading
  - Membership status fetching
  - Token management via axios interceptors
- **Axios Interceptor**: Configured in `src/App.js` to automatically refresh tokens before they expire and append Bearer tokens to all API requests (except heartbeat)

### State Management
- **Redux** with `redux-thunk` for async actions
- Store configured with Redux DevTools support in `src/redux/store/index.js`
- Key reducers:
  - `userReducer`: Keycloak data, user profile, membership status
  - `profileReducer`: User profile details
  - `settingsReducer`: App settings including language
  - `themeReducer`: Theme configuration
  - `streamReducer`: Broadcast stream state

### Routing
- React Router v5 with centralized route definitions in `src/routes/index.js`
- All routes use the `DashboardLayout` which includes sidebar and header
- Routes support nested children and external links
- Route configuration includes:
  - `id`: Translation key for page title
  - `enableHeader`: Whether to show page title in header
  - `isExternalLink`: For external navigation items

### Internationalization (i18n)
- Uses `i18next` with `react-i18next`
- Supports 4 languages: English (en), Russian (ru), Hebrew (he), Spanish (es)
- Translation files located in `src/translations/*.json`
- Language detection from: query string → localStorage → browser header
- **RTL Support**: Automatically sets `dir` attribute on body and configures JSS with RTL plugin for Hebrew
- Language preference stored in localStorage as `i18nextLng`

### Theming
- Material-UI v4 theming system
- Styled-components for custom styling
- Theme definitions in `src/theme/` directory
- Supports RTL layouts via `jss-rtl` plugin

### Configuration
- Runtime configuration loaded from `window.APP_CONFIG` in `public/config/`
- Different configs for dev vs production environments
- Config includes:
  - Keycloak realm and client settings
  - API base URLs
  - Glassix chat widget API key
  - Study materials API URL
- Environment variables in `.env` for Google Calendar API integration

### Key Features

#### Events
- Google Calendar API integration for event listings
- Language-specific calendars (en, ru, he, es)
- Auto-refresh logic:
  - During live events: refresh when event ends
  - Before events: refresh when event starts
  - End of day: refresh at midnight
- Participant metrics via `https://gxydb.kli.one/galaxy/metrics`

#### Broadcast Area (Live Streaming)
- HLS video player (`react-hls-player`)
- Multi-language audio tracks with quality selection
- Live stream data from JSON files in `public/static/data/`
- Membership-required access control
- Announcements and questions components

#### Profile & Membership
- Profile management via API (`PROFILE_URL`)
- Membership status V2 API integration
- Previous payments history

## Deployment

- Main branch: `master`
- CI/CD is `.github/workflows/cicd.yml` on GitHub Actions (migrated off GitLab in June 2026).
- **Deploys are manual only** — `workflow_dispatch` with an `environment` input (`staging` or `production`). There is no push trigger and no tag trigger: merging to `master` deploys nothing, and neither does tagging.
- The workflow runs from whichever ref you dispatch, so you can deploy a branch without merging it.
- Build-time `PUBLIC_URL` differs per environment (`/dash/` for staging, `https://kli.one/dash/` for production); everything else is runtime config from `window.APP_CONFIG`.
