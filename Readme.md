# Simple JWT authentication server app

This project was created with [Typescript](https://www.typescriptlang.org/) and [PrismaOrm](https://www.prisma.io/) and  [ExpressJs](https://expressjs.com/).

## Available Scripts

In the project directory, you can run:


### `npm install`
Do not forget to install dependencies

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.


### `.env database connection`

mysql://USER:PASSWORD@HOST:PORT/DATABASE


### `npx prisma migrate dev`

Create the first migration.\
See the section about [prisma migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate) for more information.

### `npx prisma generate`

To generate and instantiate Prisma Client:

Ensure that you have Prisma CLI installed on your machine.

Add the following generator definition to your Prisma schema:

See the section about [Prisma Generate](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client) for more information.


**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
