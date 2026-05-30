# KhutbahKit

KhutbahKit is a Next.js 14 app (App Router) to help ustadz and dai generate khutbah outlines and full scripts using Google Gemini.

## Setup

1. Install dependencies:

   npm install

2. Create `.env.local` with:

   GEMINI_API_KEY=your_gemini_api_key_here

3. Run dev server:

   npm run dev

4. Build:

   npm run build

## Deploy

- Push to a Git repo and import into Vercel.
- Add `GEMINI_API_KEY` to Vercel Environment Variables.

## Notes

- This MVP stores history, streaks and ratings in `localStorage`.
- Do not commit `.env.local`.
