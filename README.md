# GameHub - Multi-Game React Platform

A modern, extensible web application platform for hosting multiple interactive games built with React 19, TypeScript, and Vite.

## Features

- **Multiple Games**: Modular architecture supporting multiple games (Wordle, Cats, and more)
- **Modern React Patterns**: Built with React 19 features including Suspense, Error Boundaries, and the `use()` hook
- **Type-Safe**: Full TypeScript implementation with strict type checking
- **Code Splitting**: Lazy loading for optimal performance
- **Responsive Design**: Mobile-first, responsive UI components
- **CI/CD Pipeline**: Automated testing, linting, and deployment to GitHub Pages
- **Async Data Fetching**: Services-as-hooks pattern with React Suspense integration

## Architecture Overview

### Project Structure

```
src/
├── games/              # Feature-based game modules
│   ├── Cats/          # Cat image viewer game
│   │   ├── Play/      # Game component modlet
│   │   └── api/       # Data fetching services
│   ├── Wordle/        # Word guessing game
│   │   └── Play/      # Game component with state management
│   ├── types.ts       # Shared game types
│   └── index.ts       # Game registry
├── shared/            # Shared utilities and design system
│   └── useAsync/      # Generic async data fetching hook
├── AppLayout/         # Root layout with error boundary
├── Home/              # Game listing page
├── Play/              # Dynamic game loader
└── App.tsx            # Router configuration
```

### Key Design Principles

1. **Feature-Based Organization**: Each game is self-contained with its own components, logic, and API layer
2. **Modlet Architecture**: Components organized in focused folders with barrel exports
3. **Separation of Concerns**: Clear boundaries between UI (Play), logic (logic.ts), and data (api/)
4. **Type Safety**: Explicit TypeScript types for all data structures and function signatures
5. **Reusable Components**: Small, single-purpose components with CSS Modules

### State Management

- **Context API**: Feature-specific state management (e.g., Wordle game state)
- **Custom Hooks**: Encapsulated state logic with services-as-hooks pattern
- **React 19 `use()` Hook**: Native async data handling with Suspense
- **Data Isolation**: State scoped to prevent unnecessary data leakage

### Data Fetching Strategy

- **Services-as-Hooks**: API functions wrapped in custom hooks (`useCat()`, `useDog()`)
- **Type-Safe API Layer**: Generic `get<T>()` function with automatic type transformation
- **Suspense Integration**: Declarative loading states with React Suspense
- **Error Handling**: Error boundaries with retry functionality

## Getting Started

### Prerequisites

- Node.js 24+ (see `.nvmrc`)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

### Development Scripts

- `npm run dev` - Start Vite development server with HMR
- `npm run build` - Build production bundle
- `npm run test` - Run Vitest test suite
- `npm run lint` - Run all linting checks (TypeScript, ESLint, Prettier, depcheck)
- `npm run lint-typecheck` - TypeScript type checking only
- `npm run lint-eslint` - ESLint code quality checks
- `npm run lint-prettier` - Code formatting checks

## Code Quality Standards

### ESLint Configuration

- Uses `@christopherjbaker/eslint-config/react-strict`
- Enforces React best practices and accessibility rules
- Runs automatically in CI pipeline

### Prettier Configuration

- Semi-colons: disabled
- Consistent formatting across the codebase
- Integrated with ESLint

### TypeScript

- Strict mode enabled
- ES2022 target with ESNext modules
- Explicit return types for all functions
- No unused variables or parameters

## Testing

- **Framework**: Vitest with jsdom
- **Testing Library**: React Testing Library with Jest DOM matchers
- **Coverage**: Unit tests for components and business logic
- **CI Integration**: Automated test runs on every push

## Deployment

The project uses GitHub Actions for CI/CD:

1. **Verify**: Type checking, linting, and formatting validation
2. **Test**: Run complete test suite
3. **Build**: Vite production build
4. **Deploy**: Automatic deployment to GitHub Pages (main branch only)

## Adding a New Game

1. Create a new folder under `src/games/YourGame/`
2. Implement the game component with lazy loading
3. Add API layer in `YourGame/api/` if needed
4. Export from `src/games/index.ts`
5. Add to game registry with title and lazy-loaded component

Example:

```typescript
// src/games/YourGame/index.ts
export { default as Play } from './Play'

// src/games/index.ts
export const games = {
  yourgame: {
    title: 'Your Game',
    Play: lazy(() => import('./YourGame')),
  },
}
```

## Technology Stack

- **React 19.2** - UI framework with latest features
- **TypeScript 5.9** - Type-safe JavaScript
- **Vite 7** - Fast build tool and dev server
- **React Router 7** - Client-side routing
- **Vitest 4** - Unit testing framework
- **ESLint & Prettier** - Code quality and formatting

## Contributing

This is an academic project. For questions or suggestions, please open an issue.

## License

MIT
