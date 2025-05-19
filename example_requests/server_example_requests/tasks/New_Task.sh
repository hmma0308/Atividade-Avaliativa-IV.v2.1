curl --request POST \
  --url https://atividade-avaliativa-iv-v2-1.vercel.app/tasks \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ3MTU5OTM5LCJleHAiOjE3NDcxNjM1Mzl9.R99qS_Crsos8Zti1opemd83qr7iE25X9HIVYRs5Ld4E' \
  --header 'Content-Type: application/json' \
  --data '{
    "title": "Complete project",
    "description": "Finish the CRUD implementation",
    "dueDate": "2023-12-31",
    "completed": false
}'