Powered by Bun, Apollo Server, and Express.

I wrote an article about making an express server with bun [here](https://groff.dev/bun-express-apollo/) (Coming Soon)

## Run Instructions
```bash
bun install
bun src/index.js
```

The Apollo/Express Server should be running on the environment variable `PORT` or `4000` if not set.

NOTE: The Dockerfile relies on `bun:0.5.2` which is not publicly available at the time of this commit.