# habit_tracker

# Project setup

```bash
npm i fastify
npm i typescript -D
npx tsc init # create tsconfig.json file
# change tsconfig.target from es2016 to es2020
npm i tsx -D
# create dev script in package.json with tsx watch src/server.ts
```

# Prisma setup

```bash
npm i -D prisma
npm i @prisma/client
npx prisma init --datasource-provider SQLite
npx prisma migrate dev # to generate a migration (asks for the name of the migration that will be concatenated to the name of the migration file)
npx prisma studio # opens browser interface to inspect the DB
```

# Vite setup

```bash
npm create vite@latest # framework: React, variant: typescript
```

# Tailwind setup

```bash
npm i -D tailwindcss postcss autoprefixer # postcss and autoprefixer are only required for the web project
npx tailwindcss init -p # needs -p flag to create postcss config file and integrate with Vite (to initialize tailwind on the mobile folder you don't need the -p flag)
```

# Expo setup

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
