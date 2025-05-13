curl --request POST \
  --url /users/login \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "nonexistentuser",
    "password": "anypassword"
}'