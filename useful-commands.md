#Commands

## Prisma

- npx prisma migrate dev -n [name of migration] --- this command will migrate prisma.schema changes to db and update db types

## Docker

- sudo docker compose down -volumes --- stop and remove from engine all docker containers and remove the volumes

### Reset database

- sudo rm -rf .docker/postgre_data


## Run server

-- Dev mode: npm run dev