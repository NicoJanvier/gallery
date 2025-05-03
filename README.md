# Gallery

A modern web application for managing and displaying images, built with React and TypeScript.

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages
- **Node.js**: v22.14.0 (specified in .nvmrc)

## Prerequisites

- Node.js v22.14.0 or higher
- npm (comes with Node.js)
- Git

## Getting Started

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd gallery
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run deploy` - Deploy the application to GitHub Pages

## Project Structure

```
gallery/
├── src/            # Source files
├── public/         # Static assets
├── dist/           # Production build (generated)
└── package.json    # Project configuration
```

## Deployment

This project is configured to deploy to GitHub Pages. The deployment process is automated through GitHub Actions:

1. The `predeploy` script builds the application
2. The `deploy` script uses `gh-pages` to publish the build to GitHub Pages
3. The site is available at `https://[username].github.io/gallery`

## Development Guidelines

- Use TypeScript for all new code
- Follow ESLint rules for code quality
- Use Prettier for code formatting
- Write meaningful commit messages
- Keep dependencies up to date

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is private and not licensed for public use.
