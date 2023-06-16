#/bin/bash
docker exec -it seguridad-redes-api sh -c "yarn prisma migrate deploy && yarn prisma db pull && yarn prisma generate"
