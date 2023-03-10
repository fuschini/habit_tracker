# Fuschabit tracker

Simple habit tracker using GitHub's commit graph concept for visualization of completed habits over time.

## Features

- Create habits that repeat in specific days of the week
- Track which habits you completed in each day
- Visualize the summary of completed habits over time

## Tech stack

### Backend

- NodeJS
- TypeScript
- Fastify
- Prisma ORM
- SQLite

### Frontend Web

- React
- TypeScript
- Vite
- Radix UI accessible component library
- Tailwind CSS framework

### Frontend Mobile

- React Native
- TypeScript
- Expo
- Tailwind CSS framework (NativeWind)

# Project strucutre

The project has 3 main modules:

- Backend: `./server`
- Frontend web: `./web`
- Frontend mobile: `./mobile`

Each one of these folders follow different structures according to the frameworks adopted and can run independently.

# Running the application

Go to the folder of the module you want to run and type `npm run dev`.

# Fastify and typescript initial setup steps

```bash
npm i fastify
npm i typescript -D
npx tsc init # create tsconfig.json file
# change tsconfig.target from es2016 to es2020
npm i tsx -D
# create dev script in package.json with tsx watch src/server.ts
```

# Prisma initial setup

```bash
npm i -D prisma
npm i @prisma/client
npx prisma init --datasource-provider SQLite
npx prisma migrate dev # to generate a migration (asks for the name of the migration that will be concatenated to the name of the migration file)
npx prisma studio # opens browser interface to inspect the DB
```

# Vite initial setup

```bash
npm create vite@latest # framework: React, variant: typescript
```

# Tailwind initial setup

```bash
npm i -D tailwindcss postcss autoprefixer # postcss and autoprefixer are only required for the web project
npx tailwindcss init -p # needs -p flag to create postcss config file and integrate with Vite (to initialize tailwind on the mobile folder you don't need the -p flag)
```

# Expo initial setup

Following the steps on [this link](https://react-native.rocketseat.dev/expo-managed/macos)

```bash
brew install watchman
npm install -g expo-cli
# Install Expo Go app on the physical device
npx create-expo-app mobile --template # in the project folder and select template Basic (Typescript)
expo start # to start local application
```

# Resources

- [fastify for requests handling instead of express](https://www.fastify.io/)
- [prisma orm](https://www.prisma.io/)
- [Vite for managing the frontend](https://vitejs.dev/)
- [Tailwind CSS framework](https://tailwindcss.com/)
- [Expo for facilitating the dev environment for the mobile version](https://expo.dev/)
- [Zod for backend requests validation and type definitions](https://www.npmjs.com/package/zod)
- [Dayjs for date parsing and manipulation](https://www.npmjs.com/package/dayjs)
- [Phosphor icons lib](https://phosphoricons.com/)
- [NativeWind to use Tailwind in React Native](https://www.nativewind.dev/)
- [SDK to use SVGs in react native](https://docs.expo.dev/versions/latest/sdk/svg/)
- [Module to use SVGs as components in react native: react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer)
- [List of Expo vector icons](https://oblador.github.io/react-native-vector-icons/)
- [Radix react accessible components library](https://www.radix-ui.com/)
- [CLSX to build className strings conditionally](https://www.npmjs.com/package/clsx)
- [React navigation](https://reactnavigation.org/)
- [React native reanimated to display animations](https://docs.swmansion.com/react-native-reanimated/)
  - [Expo's documentation on React native reanimated](https://docs.expo.dev/versions/latest/sdk/reanimated/)

# Known issue

I didn???t implement the rules to only allow a habit to be edited today and that generated inconsistencies in the backend logic.

If you try to check a habit from a past day, the frontend will allow it but the backend will toggle the habit on the day the request was actually received.

To fix that, the frontend should disable the habit checkboxes in past days so the user can???t click them.
