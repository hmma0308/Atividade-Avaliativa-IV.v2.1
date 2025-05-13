curl --request POST \
  --url https://atividade-avaliativa-iv-v2-1.vercel.app/users/login \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "newuser",
    "password": "ValidPass123"
}'