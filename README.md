Powered by Bun, Apollo Server, and Express.

I wrote an article about making an express server with bun [here](https://groff.dev/bun-apollo-express/) (Coming Soon)

## Features:
* Apollo Server 4 via `express`
* `schema.graphql` file
* JWT Verification Example via `jose`

## Run Instructions
```bash
bun install
bun src/index.js
```

The Apollo/Express Server should be running on the environment variable `PORT` or `4000` if not set.

NOTE: The Dockerfile relies on `bun:0.5.2` which is not publicly available at the time of this commit. To run this locally prior to `0.5.2`'s release you must install the bun `canary` version.

```
bun upgrade --canary
```