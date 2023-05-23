#/bin/bash
docker exec -it seguridad-redes-api-1 sh -c "yarn prisma migrate deploy && yarn prisma db pull && yarn prisma generate"
