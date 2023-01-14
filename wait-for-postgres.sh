#!/bin/sh
# wait-for-postgres.sh

set -e

if [ $USEL_LOCAL_DATABASE = "true" ]; then
  host="$1"
else
  host=$POSTGRES_HOST
fi

host="$1"
# Shift arguments with mapping:
# - $0 => $0
# - $1 => <discarded>
# - $2 => $1
# - $3 => $2
# - ...
# This is done for `exec "$@"` below to work correctly
shift

if [ $USEL_LOCAL_DATABASE = "true" ]; then
  echo "Using local database"
  exit 0
fi

# Login for user (`-U`) and once logged in execute quit ( `-c \q` )
# If we can not login sleep for 1 sec
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "postgres" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
# Print and execute all other arguments starting with `$1`
# So `exec "$1" "$2" "$3" ...`
exec "$@"
