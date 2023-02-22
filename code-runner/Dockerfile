FROM denoland/deno:latest

EXPOSE 8000

WORKDIR /app

USER deno

ADD ./src .

RUN deno cache index.ts --unstable

cmd ["run", "--allow-all", "index.ts"]