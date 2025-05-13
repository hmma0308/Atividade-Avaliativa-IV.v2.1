curl --request POST \
  --url https://atividade-avaliativa-iv-v2-1.vercel.app/tasks \
  --header 'Content-Type: application/json' \
  --data '{
    "title": "Complete project",
    "description": "Finish the CRUD implementation",
    "dueDate": "2023-12-31",
    "completed": false
}'