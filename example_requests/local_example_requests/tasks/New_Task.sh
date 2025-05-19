curl --request POST \
  --url http://localhost:3000/tasks \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ3MTU4MDcyLCJleHAiOjE3NDcxNjE2NzJ9.EsE_PMQNer-L0pA4wNrSPzannweXKw_caYb8WDq004E' \
  --header 'Content-Type: application/json' \
  --data '{
    "title": "Complete project",
    "description": "Finish the CRUD implementation",
    "dueDate": "2023-12-31",
    "completed": false
}'