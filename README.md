

## Description

This is a test project of online wallet containing backend and frontend application.
Backend is using node.js, nest.js and typescring.
Frontend is written using react.js and next.js, although its pages and SSR are not widely used for now.

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
[Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)


For local run of the project both parts should be prepared and run separately:

## Running backend

```bash
$ cd backend
$ npm install
$ npm run start
```

## Running frontend

```bash
$ cd frontend
$ npm install
$ npm run start

```

## Opening app

Open `http://localhost:3002/` 
Enter your desired name once for creating a new user and a wallet. When you login with this name again, you'll just login with the same user and wallet, until the backend app is refreshed.

For making transfer, you should create at least two users with this way (login -> logout -> login another user)
Then you can enter value and desired user to send money. Currently only EUR is available.
Also it's possible to see transactions history for your user.

## Structure

Backend app contains 3 controllers:
- auth (POST /api/login)
- transfer (POST /api/transfer)
- history (GET /api/history)

The application uses WebmoneyService as mock of external service that was described in requirements.

![Architecture](https://github.com/diroro/digital-wallet/blob/master/architecture.png?raw=true)