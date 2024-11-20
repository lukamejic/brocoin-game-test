# Sonar Integration Backend

## Running the app
- Create a `.env.` file with following entries (fill in your own values):
```
MONGODB_USERNAME=
MONGODB_PASSWORD=
MONGODB_AT=
JWT_SECRET=
FRONTEND_URL=
```

## Testing

To run all available tests, use:
```bash
npm test
```
To run a single test file, use (change the name of the file):
```bash
npm run test-file -- "<name-of-the-file>"
```

For instance, a working example is:
```bash
npm run test-file -- "src/tests/eventHandlers.test.ts"
```

For running the `src/tests/database/` you will need a functional `.env` file with a real `MongoDB` connection. For now.