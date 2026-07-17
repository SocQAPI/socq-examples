# Instagram Search API with cURL

```bash
curl -X POST "https://api.socq.ai/v1/instagram/search" \
  -H "Authorization: Bearer $SOCQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "sustainable travel",
    "results_limit": 20
  }'
```

Save `data.task_id`, then poll:

```bash
curl "https://api.socq.ai/v1/tasks/$TASK_ID?limit=50" \
  -H "Authorization: Bearer $SOCQ_API_KEY"
```

See the [Instagram Search API page](https://socq.ai/apis/instagram/search?utm_source=github&utm_medium=repository&utm_campaign=socq-examples).
