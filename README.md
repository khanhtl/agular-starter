# Angular Starter

<div align="center">
  <a href="https://nx.dev" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="60" alt="Nx logo">
  </a>
  
  <h3>🚀 A modern Angular workspace powered by Nx</h3>
  
  <p>
    <a href="#getting-started">Getting Started</a> •
    <a href="#development">Development</a> •
    <a href="#project-structure">Project Structure</a> •
    <a href="#useful-commands">Useful Commands</a>
  </p>
</div>

---

## 📋 Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Development](#development)
- [Project Structure](#project-structure)
- [Useful Commands](#useful-commands)
- [Adding New Projects](#adding-new-projects)
- [CI/CD Integration](#cicd-integration)
- [Tools & Extensions](#tools--extensions)
- [Resources](#resources)

---

## 📖 About

This is an Angular application workspace managed by [Nx](https://nx.dev), a powerful build system for monorepo development. Nx provides:

- ⚡ Fast build and test execution with computation caching
- 🔧 Advanced code generation and scaffolding
- 📊 Visual workspace dependency graphs
- 🎯 Smart, affected-based task execution
- 🔌 Rich plugin ecosystem

[Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-standalone-tutorial?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.x or higher recommended)
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd angular-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npx nx serve angular-starter
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:4200`

---

## 💻 Development

### Running the Development Server

To start the development server with hot-reload:

```bash
npx nx serve angular-starter
```

The application will be available at `http://localhost:4200`. The dev server will automatically reload when you make changes to source files.

### Building for Production

To create an optimized production build:

```bash
npx nx build angular-starter
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

#### Unit Tests

```bash
npx nx test angular-starter
```

#### E2E Tests

```bash
npx nx e2e angular-starter-e2e
```

### Linting

To lint your code:

```bash
npx nx lint angular-starter
```

To fix auto-fixable linting issues:

```bash
npx nx lint angular-starter --fix
```

---

## 📁 Project Structure

```
angular-starter/
├── apps/
│   └── angular-starter/           # Main Angular application
│       ├── src/
│       │   ├── app/               # Application components and modules
│       │   ├── assets/            # Static assets
│       │   ├── environments/      # Environment configurations
│       │   └── main.ts            # Application entry point
│       └── project.json           # Project configuration
├── libs/                          # Shared libraries (if any)
├── tools/                         # Custom build tools and scripts
├── nx.json                        # Nx workspace configuration
├── package.json                   # Dependencies and scripts
├── tsconfig.base.json             # Base TypeScript configuration
└── README.md                      # This file
```

---

## 🛠️ Useful Commands

### Project Information

View all available targets for the project:

```bash
npx nx show project angular-starter
```

Visualize the workspace dependency graph:

```bash
npx nx graph
```

### Code Generation

Generate a new component:

```bash
npx nx g @nx/angular:component <component-name> --project=angular-starter
```

Generate a new service:

```bash
npx nx g @nx/angular:service <service-name> --project=angular-starter
```

Generate a new module:

```bash
npx nx g @nx/angular:module <module-name> --project=angular-starter
```

### List Available Generators

```bash
npx nx list @nx/angular
```

---

## ➕ Adding New Projects

Nx makes it easy to add new applications and libraries to your workspace.

### Generate a New Application

```bash
npx nx g @nx/angular:app <app-name>
```

### Generate a New Library

```bash
npx nx g @nx/angular:lib <lib-name>
```

### Browse Available Plugins

```bash
npx nx list
```

To see capabilities of a specific plugin:

```bash
npx nx list <plugin-name>
```

**Pro Tip:** Install [Nx Console](#nx-console) to browse plugins and generators directly in your IDE!

📚 [Learn more about Nx plugins](https://nx.dev/concepts/nx-plugins) | [Browse the plugin registry](https://nx.dev/plugin-registry)

---

## 🔄 CI/CD Integration

### Connect to Nx Cloud

Nx Cloud provides distributed caching and task execution for faster CI/CD pipelines.

**Step 1:** Connect your workspace to Nx Cloud

```bash
npx nx connect
```

**Features included:**
- 🚀 Remote caching for faster builds
- 📦 Task distribution across multiple machines
- 🧪 Automated e2e test splitting
- 🔄 Task flakiness detection and re-running

**Step 2:** Generate a CI workflow

```bash
npx nx g ci-workflow
```

This will create a CI configuration file for your preferred CI provider (GitHub Actions, CircleCI, Azure DevOps, etc.).

📖 [Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx)

---

## 🔌 Tools & Extensions

### Nx Console

Nx Console is an IDE extension that enhances your development experience with:

- 🎯 Visual task runner
- 🔨 Code generation UI
- 📝 Auto-completion improvements
- 📊 Dependency graph visualization

**Available for:**
- [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)
- [IntelliJ IDEA / WebStorm](https://plugins.jetbrains.com/plugin/15101-nx-console)

[Install Nx Console →](https://nx.dev/getting-started/editor-setup)

### Recommended VS Code Extensions

- **Angular Language Service** - Enhanced Angular template support
- **ESLint** - Code quality and style checking
- **Prettier** - Code formatting
- **GitLens** - Enhanced Git capabilities

---

## 📚 Resources

### Documentation

- [Angular Documentation](https://angular.dev)
- [Nx Documentation](https://nx.dev)
- [Angular Tutorial with Nx](https://nx.dev/getting-started/tutorials/angular-standalone-tutorial)
- [Nx on CI/CD](https://nx.dev/ci/intro/ci-with-nx)
- [Managing Releases with Nx](https://nx.dev/features/manage-releases)

### Community

- 💬 [Discord Community](https://go.nx.dev/community)
- 🐦 [Twitter/X](https://twitter.com/nxdevtools)
- 💼 [LinkedIn](https://www.linkedin.com/company/nrwl)
- 📺 [YouTube Channel](https://www.youtube.com/@nxdevtools)
- 📝 [Nx Blog](https://nx.dev/blog)

### Angular Resources

- [Angular Official Site](https://angular.dev)
- [Angular GitHub](https://github.com/angular/angular)
- [Angular Blog](https://blog.angular.dev)
- [Angular Style Guide](https://angular.dev/style-guide)

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <p>Built with ❤️ using Angular and Nx</p>
  <p>
    <a href="https://angular.dev">Angular</a> •
    <a href="https://nx.dev">Nx</a>
  </p>
</div>
