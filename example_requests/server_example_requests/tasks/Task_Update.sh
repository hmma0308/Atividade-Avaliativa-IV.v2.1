curl --request PUT \
  --url https://atividade-avaliativa-iv-v2-1.vercel.app/tasks/3 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ3MTU4MDcyLCJleHAiOjE3NDcxNjE2NzJ9.EsE_PMQNer-L0pA4wNrSPzannweXKw_caYb8WDq004E' \
  --header 'Content-Type: application/json' \
  --data '{
    "title": "Updated project title",
    "completed": true
}'