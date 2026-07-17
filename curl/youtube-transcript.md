# YouTube Transcript API with cURL

```bash
curl -X POST "https://api.socq.ai/v1/youtube/transcripts" \
  -H "Authorization: Bearer $SOCQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "urls": ["https://www.youtube.com/watch?v=arj7oStGLkU"],
    "language": "en"
  }'
```

Save `data.task_id`, then poll:

```bash
curl "https://api.socq.ai/v1/tasks/$TASK_ID?limit=50" \
  -H "Authorization: Bearer $SOCQ_API_KEY"
```

See the [YouTube Transcripts API page](https://socq.ai/apis/youtube/transcripts?utm_source=github&utm_medium=repository&utm_campaign=socq-examples).
