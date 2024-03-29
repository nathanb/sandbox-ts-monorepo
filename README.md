# Local dev mode:
This section explains how to install and run the code locally on your machine. 

## Install

```bash
npm ci
```

## Watch mode

Edit and save any source file. This runs both `tsc --build --watch` and webpack dev server in parallel. Browse to: http://localhost:3000

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Clean

```bash
npm run prebuild
```

## Test all

```bash
npm test
```

## Run (the CLI)

NOTE for Docker: I didn't setup a docker-compose service for this, but you can run it in docker just the same by running `docker compose run web /bin/sh` and then interactively running the commands below.


```bash
# Build first if you haven't already. Docker is already built.
npm run build # if necessary

# npm start [any args]
npm start test-arg

# OUTPUT:
args: test-arg
add 2+3: 5
divide 2/3: 0.6666666666666666
multiply 2*3: 6
multiplyRef 2*3: 6
```

# Running dev with Docker

Ideally, we run the web app in docker so we can pair it with other service dependencies like an API or whatever. In this example, you can see this with: 

```bash
docker compose up
```
Browse to: `http://localhost:3000`

If you make changes to any code in the `lib-ui`, `lib-shared`, or `web`, you'll see an immediate browser refresh with the latest change.


# Big picture

We're combining both Typescript's build system with npm workspaces to simplify monorepo configuration.

## NPM Workspaces

With this monorepo using npm workspaces, each workspace will automatically link under `node_modules/{package_name}` making it available to any module in the repository. So by example, the package/workspace `packages/lib-main` named `@potatoes/lib-main` in its `package.json` will be available to any other project that requires it. Organizationally, the entry-point app `./app` and `./web` live in the root of the repository, and the dependencies are organized under `./packages`. This is purely by preference.

## Web projects

I've intentionally avoided CRA in this scenario for flexibility. Also, to keep things simple, I've elected not to use ESM for the web and UI packages. So `web` and `packages/lib-ui` both are `CommonJS` packages with `module: ESNext`. `tsc` will build the `lib-ui` project itself, but `web` has `emit: false` since it relies on `babel-typescript` and webpack. `lib-shared` has been switched to CommonJS as well for simplicity. The major benefit here (as a monorepo and tsc watch) is the ability to have a separate React component package that automatically refreshes upon save in the web app. This is typically a challenge due to conflicting react and react-dom instances. But here, npm workspaces solves that for us with auto-linking and package sharing.

## Code splitting & Tree shaking

Did I mention code-splitting? All of these projects are built with ESNext and are capable of code splitting via sub-path imports. Take a peek at the `lib-shared` [exports config](https://github.com/nathanb/sandbox-ts-monorepo/blob/main/packages/lib-shared/package.json#L9)

i.e. Rather than:
(Importing module from the root package index)
`import { Thing } from '@potatoes/lib-ui'`

Use subpaths:

`import { Thing } from '@potatoes/lib-ui/Thing'`

or (for React code-splitting)

`lazy(() => import('@potatoes/lib-ui/Thing'))`

## Node ESM

~~All~~ Some of these projects (`app` and `lib-main`) are currently Node ESM configured with `package.json` `type: 'module'` and `exports: {...}`. The exports define root and subpaths to resolve modules within each project. This is where the extension mapping happens and the resolution of `/*` (import path) => `/dist/*` (actual file system path).

While webpack -> babel-typescript builds commonJS code referencing ESM dependencies just fine, it throws kinks in the whole Typescript/references build. So for now, UI projects are common-js, server projects are ESM.

## TSC setup

Given the above, the goal here with `tsconfig` is to simplify the build of the main project and its dependency graph. Side benefits include VSCode also keeping track of type changes upstream among the dependencies. The main idea (in this single entry-point scenario) is to setup a root tsconfig that provides root level entry point to manage the build. Its `references` will guide `tsc` on how to build and keep things current.

### Root tsconfig

There's a root tsconfig with `files: []` and `references: [{path: './path-to-entry-project'}]`. All projects will be configured with: `composite` and `incremental` build enabled to allow watch to more efficiently build changes. Currently the root tsconfig references the two entry point apps: `app` and `web`.

### Project tsconfig

Each tsconfig is standalone and responsible for its own package. So its output paths are relative: `./dist`. Notice when doing full build generated files all land in the correct places for each of the three projects. I've also enabled `declarationMaps` and `declaration` in the `lib-*` projects to allow source mapping back from package import paths.

With a recent update, I've added two sets of tsconfigs. The main one: `tsconfig.json` will be consumed by VSCode itself and applies to ALL files in the solution including test files. `tsconfig.build.json` (and the root `tsconfig.json`) are responsible for actually building the actual runtime code (non-web projects). Each of these sets uses `references` to their corresponding configs.
