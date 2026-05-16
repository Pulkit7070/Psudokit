# Portfolio — psudokit.in

Personal portfolio of Pulkit Saraf ([@PsudoKit](https://x.com/PsudoKit)).

## Dev

```bash
npm run dev
```

---

## Sanity CMS

Content — blog posts and OSS contributions — is managed via [Sanity](https://sanity.io). The static data in `src/data/` is the permanent baseline; Sanity adds new entries on top. Both sources are merged at request time.

### Running Studio locally

1. Fill in `.env.local` (copy from `.env.example`, add your project ID + tokens).
2. `npm run dev` — then visit [http://localhost:3000/studio](http://localhost:3000/studio).
3. Log in with GitHub (must be added as a member of the Sanity project at [sanity.io/manage](https://sanity.io/manage)).

### Adding a new blog post

1. Open Studio (`/studio` locally or the deployed URL).
2. Click **Blog Post → Create**.
3. Fill in: **Title** → hit "Generate" on Slug → **Published At** → **Excerpt** (≤200 chars) → **Body**.
4. Mark **Featured** if it should appear on the homepage.
5. Publish. The page auto-revalidates within 60 s (or immediately via the webhook).

### Adding a new OSS contribution

1. Studio → **OSS Contribution → Create**.
2. Fill in: Title, Repo (`owner/name`), Repo URL, PR URL, Status, Category.
3. Set **Merged At** for correct ordering.
4. Publish.

### Manual revalidation

Hit the revalidate endpoint directly:

```bash
curl -X POST https://psudokit.in/api/revalidate \
  -H "sanity-webhook-signature: <sig>" \
  -H "Content-Type: application/json" \
  -d '{"_type":"blog","slug":{"current":"your-slug"}}'
```

Or just wait — pages revalidate automatically every 60 s.

### Configuring the Sanity webhook (automatic revalidation)

1. Go to [sanity.io/manage](https://sanity.io/manage) → your project → **API → Webhooks → Create**.
2. **URL**: `https://psudokit.in/api/revalidate`
3. **Dataset**: `production`
4. **Trigger on**: Create, Update, Delete
5. **Filter** (optional): `_type in ["blog", "ossContribution"]`
6. **HTTP method**: POST
7. **Secret**: paste the value of `SANITY_REVALIDATE_SECRET` from your `.env.local`
8. Save and enable.

### GROQ queries available

| Export | File | Powers |
|---|---|---|
| `allBlogsQuery` | `src/sanity/queries.ts` | `/blogs` index |
| `blogBySlugQuery` | `src/sanity/queries.ts` | `/blogs/[id]` detail |
| `featuredBlogsQuery` | `src/sanity/queries.ts` | Homepage featured blogs |
| `allOssContributionsQuery` | `src/sanity/queries.ts` | `/opensource` page |
| `featuredOssQuery` | `src/sanity/queries.ts` | Homepage featured OSS |
| `ossByRepoQuery` | `src/sanity/queries.ts` | Repo-grouped OSS view |

You can test any of these in Sanity Studio's **Vision** tab.

### Env vars

| Var | Where to get it |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | [sanity.io/manage](https://sanity.io/manage) → project settings |
| `NEXT_PUBLIC_SANITY_DATASET` | Always `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Keep at `2025-01-01` |
| `SANITY_API_READ_TOKEN` | Manage → API → Tokens → Add (Viewer role) |
| `SANITY_REVALIDATE_SECRET` | `openssl rand -hex 32` |
