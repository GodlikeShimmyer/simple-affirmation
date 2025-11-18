# AI Creator Studio

A full-featured AI-powered creative platform with video generation, editing, thumbnail creation, and graphic design capabilities.

## Features

- 🎬 **AI Video Generation** - Generate videos from text prompts using Sora AI
- ✂️ **AI Video Editing** - Edit videos with AI-powered tools
- 🖼️ **Thumbnail Creator** - Create eye-catching thumbnails with AI
- 🎨 **Graphic Designer** - Generate logos, social posts, flyers, and more
- 🔐 **Authentication** - Secure email verification system

## Environment Variables

This project requires the following environment variables to be set in Vercel:

### Required

- `OPENAI_API_KEY` - Your OpenAI API key (for AI features)
- `RESEND_API_KEY` - Your Resend API key (for email verification)

### Setting up in Vercel

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the required variables:
   - `OPENAI_API_KEY`: Get from https://platform.openai.com/api-keys
   - `RESEND_API_KEY`: Get from https://resend.com/api-keys

**Important**: Never commit API keys to version control. They should only exist as environment variables in Vercel.

## API Endpoints

### Design Generation
`POST /api/design/generate`
- Generates designs using OpenAI DALL-E

### Thumbnail Generation
`POST /api/thumbnail/generate`
- Creates thumbnails with AI

### Video Generation
`POST /api/video/generate`
- Generates videos using Sora AI

### Video Processing
`POST /api/video/process`
- Edits existing videos with AI

### Email Verification
`POST /api/auth/send-verification`
- Sends verification codes via email

`POST /api/auth/verify-email`
- Verifies email codes

## Project info

**URL**: https://lovable.dev/projects/bb175dd8-ae75-4a87-a062-a628c3b4611f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/bb175dd8-ae75-4a87-a062-a628c3b4611f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/bb175dd8-ae75-4a87-a062-a628c3b4611f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
