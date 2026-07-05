# Edifity-AI-Image-Editor
Professional image editing powered by AI
# Editify

A modern AI-assisted image editor built with **Next.js 16**, **Clerk** authentication, **Convex** backend functions, and **Fabric.js** canvas editing.

## Features

- Full authentication flow using Clerk: sign in, sign up, and protected dashboard/editor pages.
- AI image editing UI with canvas tools including crop, resize, adjust, text, background removal, image extender, and AI editing.
- Dashboard for creating and managing user projects.
- Convex backend for project storage, user data, and real-time updates.
- Image file handling with ImageKit integration.
- Responsive landing page with features and pricing sections.
- Local development support for simulating Pro access.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Clerk for authentication
- Convex for backend queries and mutations
- Fabric.js for canvas editing
- Tailwind CSS / Radix UI for styling and components
- ImageKit for image uploads
- Sonner for notifications

## Getting Started

### Requirements

- Node.js 20+ (recommended)
- npm
- Clerk account
- Convex account
- ImageKit account

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root with the following keys:

```env
NEXT_PUBLIC_CONVEX_URL=<your_convex_url>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
CLERK_SECRET_KEY=<your_clerk_secret_key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
CLERK_JWT_ISSUER_DOMAIN=<your_clerk_jwt_issuer_domain>
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=<your_imagekit_public_key>
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=<your_imagekit_url_endpoint>
IMAGEKIT_PRIVATE_KEY=<your_imagekit_private_key>
```

> If you are using a production Clerk app, set the corresponding domain and redirect URLs in the Clerk dashboard.

### Run Locally

```bash
npm run dev
```

Open http://localhost:3000 to access the app.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

- `app/` – Next.js App Router pages and routes.
- `components/` – Reusable UI components and feature sections.
- `convex/` – Convex backend functions, schema, and auth config.
- `hooks/` – Custom hooks for Convex, Clerk, and user plan access.
- `context/` – Canvas and editor context providers.
- `public/` – Static assets and icons.

## Convex Backend

This app uses Convex for user/project persistence.

- `convex/users.js` stores user metadata and plan information.
- `convex/projects.js` handles project creation and updates.
- `convex/schema.js` defines the Convex data model.

If you need to deploy Convex, run:

```bash
npx convex deploy
```

Then update `NEXT_PUBLIC_CONVEX_URL` with the deployed URL.

## Clerk Configuration

This project is configured to use Clerk for auth. You should have:

- A Clerk application with the correct domain.
- A publishable key and secret key.
- Redirect URLs including `/sign-in` and `/sign-up`.

## Development Notes

- In development, the project supports a local Pro simulation mode using `DEV_FORCE_PRO` in `localStorage`.
- The canvas editor uses Fabric.js and handles image loading and saved canvas state.
- The pricing page currently includes a development flow that simulates Pro upgrade when billing is not configured.

## Deployment

For deployment, Vercel is recommended for Next.js projects.

1. Push the repo to GitHub.
2. Connect the repository to Vercel.
3. Add the production environment variables in Vercel settings.
4. Deploy the app.

## Troubleshooting

- If Clerk reports billing is disabled, verify your Clerk dashboard billing settings.
- If the canvas initialization error appears, ensure the latest code is running and refresh the page.
- Run `npm run build` to validate the project before deploying.

## License

This project does not include a license file by default.
