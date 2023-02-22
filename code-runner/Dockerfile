FROM denoland/deno:latest

EXPOSE 8000

WORKDIR /app

USER deno

ADD ./src .

RUN deno cache index.ts --unstable
# TODO: Replace allow all with specific permissions for security
cmd ["run", "--allow-all", "index.ts"]