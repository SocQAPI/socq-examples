# SocQ API examples

[![API documentation](https://img.shields.io/badge/API%20docs-docs.socq.ai-111827)](https://docs.socq.ai)
[![API catalog](https://img.shields.io/badge/API%20catalog-socq.ai-F64C31)](https://socq.ai/apis)
[![License: MIT](https://img.shields.io/badge/License-MIT-2563EB)](LICENSE)
[![Check examples](https://github.com/SocQAPI/socq-examples/actions/workflows/check.yml/badge.svg)](https://github.com/SocQAPI/socq-examples/actions/workflows/check.yml)

Backend-safe, copy-paste examples for collecting public social media data with
SocQ. The examples cover the shared task workflow and the current Instagram,
TikTok, YouTube, and Facebook endpoints.

## Start in five minutes

1. Create an [API key](https://socq.ai/dashboard/api-key?utm_source=github&utm_medium=repository&utm_campaign=socq-examples).
2. Copy `.env.example` to `.env`.
3. Set `SOCQ_API_KEY`.
4. Run a cURL, Node.js, or Python example.
5. Store the returned `task_id`, then poll `GET /v1/tasks/{task_id}` until the
   task succeeds or fails.

```bash
cp .env.example .env
export SOCQ_API_KEY="your-api-key"
```

Never put a SocQ API key in browser code, mobile apps, public repositories,
screenshots, fixtures, or logs.

## First examples

| Workflow | cURL | Node.js | Python | Focused repository |
| --- | --- | --- | --- | --- |
| Instagram profile search | [`curl/instagram-search.md`](curl/instagram-search.md) | [`node/instagram-search`](node/instagram-search) | [`python/instagram-search`](python/instagram-search) | [`instagram-search-api`](https://github.com/SocQAPI/instagram-search-api) |
| YouTube transcripts | [`curl/youtube-transcript.md`](curl/youtube-transcript.md) | [`node/youtube-transcript`](node/youtube-transcript) | [`python/youtube-transcript`](python/youtube-transcript) | [`youtube-transcript-api`](https://github.com/SocQAPI/youtube-transcript-api) |

The complete public endpoint inventory lives in
[`catalog/endpoints.json`](catalog/endpoints.json). More runnable examples will
be added from the same shared clients and repository template.

## Shared workflow

```text
submit public-data task
        |
        v
store task_id
        |
        v
poll task status  <---- callback is a notification, not a result payload
        |
        v
read data.results.items
        |
        v
follow data.results.next_cursor when data.results.has_more is true
```

Task states are `queued`, `running`, `succeeded`, and `failed`. Callback
delivery is best-effort, so production systems should keep polling as a
fallback.

## Repository layout

```text
catalog/       Public endpoint manifest and focused-repository metadata
curl/          Copy-paste HTTP requests
node/          Runnable Node.js examples
python/        Runnable Python examples
shared/        Reusable task clients
fixtures/      Synthetic response shapes used by checks and documentation
docs/          Production integration guidance
scripts/       Local and CI validation
```

## Public-data scope

SocQ is built for public social data workflows. It is not an official API of
Instagram, TikTok, YouTube, or Facebook and does not provide access to private
account data.

## Support

- [API documentation](https://docs.socq.ai)
- [API catalog](https://socq.ai/apis)
- [Example issues](https://github.com/SocQAPI/socq-examples/issues)
- Private account or billing support: [support@socq.ai](mailto:support@socq.ai)

The MIT license covers the example code in this repository. It does not grant
rights to SocQ's hosted service, third-party platform data, trademarks, or
private product source code.
