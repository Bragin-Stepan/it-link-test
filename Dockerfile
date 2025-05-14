FROM node:20.17.0-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

#------------------#

FROM node:20

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist

CMD ["yarn", "start:prod"]