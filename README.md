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
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p # needs -p flag to create postcss config file and integrate with Vite
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
