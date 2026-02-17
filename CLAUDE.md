# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based dashboard for the Kabbalah Community virtual home platform, providing features like events calendar, live broadcasts, membership management, profile management, and study materials.

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run linter
npm run lint
```

Note: The project uses `--openssl-legacy-provider` flag for both start and build commands due to Node.js OpenSSL compatibility requirements.

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

### Project Structure
```
src/
├── components/       # Shared components (Sidebar, Header, Loader, etc.)
├── config/          # Auth and Keycloak configuration
├── constants/       # Static data (countries, languages, common values)
├── contexts/        # React contexts (PageTitleContext)
├── layouts/         # Layout components (Dashboard, Auth)
├── pages/           # Page components organized by section
│   ├── auth/        # Authentication pages
│   └── dashboard/   # Main dashboard pages
│       ├── BroadcastArea/
│       ├── Events/
│       ├── Home/
│       ├── MembershipV2/
│       └── MyProfile/
├── redux/           # Redux actions, reducers, store
├── routes/          # Route definitions and routing logic
├── services/        # API service modules
├── shared/          # Shared utilities and helpers
├── theme/           # Material-UI theme configuration
├── translations/    # i18n JSON files
└── utils/           # Utility functions
```

## Deployment

- Main branch: `master`
- Workflow:
  1. Create feature branch from master
  2. Push and create merge request
  3. Merge to master deploys to staging
  4. Create Git tag to deploy to production
