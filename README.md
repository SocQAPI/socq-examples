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

## Focused API repositories

Every current submit endpoint has a focused repository with cURL, Node.js, and
Python examples, endpoint-specific behavior, production guidance, responsible
use notes, and synthetic fixtures.

| Instagram | Facebook | YouTube | TikTok | X |
| --- | --- | --- | --- | --- |
| [Posts](https://github.com/SocQAPI/instagram-posts-api) | [Pages](https://github.com/SocQAPI/facebook-pages-api) | [Channels](https://github.com/SocQAPI/youtube-channels-api) | [Profiles](https://github.com/SocQAPI/tiktok-profiles-api) | [Profiles](https://github.com/SocQAPI/twitter-profile-scraper-api) |
| [Comments](https://github.com/SocQAPI/instagram-comments-api) | [Posts](https://github.com/SocQAPI/facebook-posts-api) | [Videos](https://github.com/SocQAPI/youtube-videos-api) | [Videos](https://github.com/SocQAPI/tiktok-videos-api) | [Posts](https://github.com/SocQAPI/twitter-tweet-scraper-api) |
| [Followers Count](https://github.com/SocQAPI/instagram-followers-count-api) | [Comments](https://github.com/SocQAPI/facebook-comments-api) | [Channel Videos](https://github.com/SocQAPI/youtube-channel-videos-api) | [Comments](https://github.com/SocQAPI/tiktok-comments-api) | [User Posts](https://github.com/SocQAPI/twitter-user-tweets-scraper-api) |
| [Reels](https://github.com/SocQAPI/instagram-reels-api) |  | [Comments](https://github.com/SocQAPI/youtube-comments-api) | [Search](https://github.com/SocQAPI/tiktok-search-api) | [Search](https://github.com/SocQAPI/twitter-search-api) |
| [Search](https://github.com/SocQAPI/instagram-search-api) |  | [Shorts](https://github.com/SocQAPI/youtube-shorts-api) | [Hashtags](https://github.com/SocQAPI/tiktok-hashtags-api) |  |
|  |  | [Search](https://github.com/SocQAPI/youtube-search-api) |  |  |
|  |  | [Transcripts](https://github.com/SocQAPI/youtube-transcript-api) |  |  |

### LinkedIn

| Profiles | Companies | Posts | Jobs |
| --- | --- | --- | --- |
| [LinkedIn Profiles API](https://github.com/SocQAPI/linkedin-profiles-api) | [LinkedIn Companies API](https://github.com/SocQAPI/linkedin-companies-api) | [LinkedIn Posts API](https://github.com/SocQAPI/linkedin-posts-api) | [LinkedIn Jobs API](https://github.com/SocQAPI/linkedin-jobs-api) |

### Reddit

| Posts | Comments | Subreddit Posts | Search |
| --- | --- | --- | --- |
| [Reddit Posts API](https://github.com/SocQAPI/reddit-posts-api) | [Reddit Comments API](https://github.com/SocQAPI/reddit-comments-api) | [Reddit Subreddit Posts API](https://github.com/SocQAPI/reddit-subreddit-posts-api) | [Reddit Search API](https://github.com/SocQAPI/reddit-search-api) |

### Pinterest

| Profiles | Pins | User Pins | Search |
| --- | --- | --- | --- |
| [Pinterest Profiles API](https://github.com/SocQAPI/pinterest-profiles-api) | [Pinterest Pins API](https://github.com/SocQAPI/pinterest-pins-api) | [Pinterest User Pins API](https://github.com/SocQAPI/pinterest-user-pins-api) | [Pinterest Search API](https://github.com/SocQAPI/pinterest-search-api) |

### Threads

| Profiles | Posts | User Posts |
| --- | --- | --- |
| [Threads Profiles API](https://github.com/SocQAPI/threads-profiles-api) | [Threads Posts API](https://github.com/SocQAPI/threads-posts-api) | [Threads User Posts API](https://github.com/SocQAPI/threads-user-posts-api) |

### Facebook Marketplace

| Location Search | Listing Search | Item Details |
| --- | --- | --- |
| [Facebook Marketplace Location Search API](https://github.com/SocQAPI/facebook-marketplace-location-search-api) | [Facebook Marketplace Search API](https://github.com/SocQAPI/facebook-marketplace-search-api) | [Facebook Marketplace Item API](https://github.com/SocQAPI/facebook-marketplace-item-api) |

### Facebook Ad Library

| Ad Search | Ad Details | Company Ads | Company Search |
| --- | --- | --- | --- |
| [Facebook Ad Library Search API](https://github.com/SocQAPI/facebook-ad-library-search-api) | [Facebook Ad Library Ad API](https://github.com/SocQAPI/facebook-ad-library-ad-api) | [Facebook Ad Library Company Ads API](https://github.com/SocQAPI/facebook-ad-library-company-ads-api) | [Facebook Ad Library Company Search API](https://github.com/SocQAPI/facebook-ad-library-company-search-api) |

### TikTok Shop

| Search | Store Products | Product Details | Product Reviews | User Showcase |
| --- | --- | --- | --- | --- |
| [TikTok Shop Search API](https://github.com/SocQAPI/tiktok-shop-search-api) | [TikTok Shop Products API](https://github.com/SocQAPI/tiktok-shop-products-api) | [TikTok Shop Product API](https://github.com/SocQAPI/tiktok-shop-product-api) | [TikTok Shop Product Reviews API](https://github.com/SocQAPI/tiktok-shop-product-reviews-api) | [TikTok Shop User Showcase API](https://github.com/SocQAPI/tiktok-shop-user-showcase-api) |

The machine-readable inventory in
[`catalog/endpoints.json`](catalog/endpoints.json) maps all 51 public endpoint
contracts to their focused repositories.

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
