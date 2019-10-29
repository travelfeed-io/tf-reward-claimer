# tf-reward-claimer

This script obtains a list of TravelFeed users from MongoDB who have opted in to this feature and claims their pending rewards via the @travelfeed.app posting authority.

## Development build

First, install the node_modules:

```
npm i
```

Create a .env file (see "Configuration" below), then start the nodemon development server with

```
npm run dev
```

## Production

Run as cronjob every 24 hours.

```
npm start
```

## Configuration

| Environment          | Value                                     |
| -------------------- | ----------------------------------------- |
| `MONGO_URL`          | URL of the MongoDB instance               |
| `TF_POSTING_PRIVATE` | Private posting key of authorized account |
