# Production checklist

- Keep `SOCQ_API_KEY` on the server.
- Validate URLs, usernames, queries, limits, and callback URLs before submit.
- Store `data.task_id` before polling or waiting for a callback.
- Treat `succeeded` and `failed` as terminal states.
- Use moderate polling intervals and exponential backoff for transient errors.
- Use `data.results.next_cursor` until `data.results.has_more` is false.
- Make callback handlers idempotent and keep polling as a fallback.
- Log task IDs and state transitions, never API keys or private data.
- Handle `400`, `401`, `402`, `403`, `404`, `429`, and `500` responses.
- Confirm current endpoint availability and pricing before production rollout.
