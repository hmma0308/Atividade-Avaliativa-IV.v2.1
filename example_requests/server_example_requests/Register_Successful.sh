curl --request POST \
  --url https://atividade-avaliativa-iv-v2-1.vercel.app/users/register \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "newuser",
    "password": "ValidPass123",
    "email": "newuser@example.com"
}'