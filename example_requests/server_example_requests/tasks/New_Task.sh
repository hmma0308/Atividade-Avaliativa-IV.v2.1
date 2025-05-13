curl --request POST \
  --url https://atividade-avaliativa-iv-v2-1.vercel.app/tasks \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDcxNTI3NDgsImV4cCI6MTc0NzE1NjM0OH0.lKpZBmQx5uGHnEMTOE7j8hrEGFhcdOkGrG_MNuYStR0' \
  --header 'Content-Type: application/json' \
  --data '{
    "title": "Complete project",
    "description": "Finish the CRUD implementation",
    "dueDate": "2023-12-31",
    "completed": false
}'