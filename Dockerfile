FROM jarredsumner/bun:0.5.2
WORKDIR /app
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
COPY ./src ./src
EXPOSE 4000
ENTRYPOINT ["bun", "src/index.js"]