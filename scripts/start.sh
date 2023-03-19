#!/usr/bin/env sh

set -e

echo ">>> Start app in $NODE_ENV"

# Add this only when you need to setup the sql db
echo "Starting DB Migration! ..."
npx knex migrate:latest --knexfile=/usr/src/app/knexfile.js
echo "DB Migration ✅!"

#echo "Running seeders...⛓⚙️"
#npm run db:seed
#echo "DB Seeders ✅"


if [ "$NODE_ENV" == "production" ] || [ "$NODE_ENV" == "staging" ] ; then
  echo ">>> run commands for production and staging"
  node dist/main.js
elif [ "$NODE_ENV" == "test" ]; then
  npm run test
else
  npm run start:dev
fi
