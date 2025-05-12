# rodar duas vezes
curl --request POST \
  --url https://atividade-avaliativa-iv-v2-1.vercel.app/users/register \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "differentuser",
    "password": "ValidPass123",
    "email": "existing@example.com"
}'