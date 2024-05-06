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
npm run clean
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

With this monorepo using npm workspaces, each workspace will automatically link under `node_modules/{package_name}` making it available to any module in the repository by package name. So for example, the workspace `packages/lib-main` named `@potatoes/lib-main` will be available to any other project in the repository.

Organizationally, the entry-point app `./apps/app` and `./apps/web` live under `./apps` in the repository, and the dependencies are organized under `./packages`. This is purely by preference. Workspaces can exist in any subfolder.

## Web projects

I've intentionally avoided CRA/`react-scripts` in this scenario for flexibility. This is my preference. But note that I'm using `ts-loader` rather than `babel-typescript` to render the output. This allows me to use `projectReferences` which is part of Typescript's own monorepo solution. The idea is: you can use `references` in tsconfig.json to build dependencies as needed within a monorepo. More on that later.

## Module resolution

Also, to keep things consistent, I've elected to use ESM (`type: 'module'`) for all projects across the repository. This allows me to "share" code directly (between Node and Browser projects) without the build tooling complaining about ESM vs non-ESM code. i.e. We have a shared project/workspace with browser-friendly code and shared TS Types. It's technically ESM, but ts-loader doesn't care when rendering a browser bundle.

### ESM Caveats

All relative path module imports must include extensions.

For Node projects, all files must use the `.mjs|.cjs` extension to indicate CommonJS or ESM. With Typescript layered into this, that makes file extensions on disk: `mts|.cts` respecively, and when you import, use the extension generated in the output: i.e. (relative import: `import from './module.mjs'` (imports `./module.mts`), or Package imports: `import from '@scope/package/Module'`). We exclude extensions for package imports because `package.json` `exports: {...}` handles the mapping extension for us. 

For browser projects, I'm simply using `.ts/.tsx`. But it also means that within a package, all imports must resolve using file extensions like: `import from './relative.js'` (imports `./relative.ts`). And Package imports: `import from '@potatoes/lib-ui/Thing'`

## Code splitting & Tree shaking

Did I mention code-splitting? All of these projects are built with ESM and are capable of code splitting via sub-path imports. I've intentionally excluded all barrel files (index/entry points that only re-export other modules). This forces you to import direct modules only. Take a peek at the `lib-shared` [exports config](https://github.com/nathanb/sandbox-ts-monorepo/blob/main/packages/lib-shared/package.json#L7)

i.e. Rather than:
(Importing module from the root package index)
`import { Thing } from '@potatoes/lib-ui'`

Use subpaths:

`import { Thing } from '@potatoes/lib-ui/Thing'`

or (for React code-splitting)

`lazy(() => import('@potatoes/lib-ui/Thing'))`

## TSC setup

Typescript has its own type of monorepo dependency management through the use of `references`. This allows you to define a dependency tree for each project. And with 
`composite` and `incremental` set to `true`, it improves build performance by only building what changes in the tree. I like to think of it as top/down (entrypoint app referencing down to dependencies), and I treat each workspace as a "project".

### Root tsconfig

With all the projects having their own tsconfig, to build the entire monorepo tree, you can setup a single tsconfig.json at the root of the monorepo with references to each entry point project you want to build via the `tsc` command. This root tsconfig will also ignore all files with `files: []`.

### Project tsconfig

There are a couple things to know first before actually setting these configs up. First: VSCode can ONLY look at `tsconfig.json`. This means for each project, `tsconfig` needs to include all files: test, code, everything. But for the build, you only want to track code files, so I like to create a second `tsconfig.build.json` that excludes tests and mocks. The main caveat with this is: yes, you can extend `tsconfig.json`, but `references` are unique to each `tsconfig` file. So `tsconfig.build.json` needs its own `references` to its dependencies' `tsconfig.build.json` files. You can see this in the project here. 
