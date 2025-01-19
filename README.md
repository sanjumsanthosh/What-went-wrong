# What Went Wrong

A Next.js application that helps users analyze and understand their failed habits or resolutions using AI-powered insights. The app provides a conversational interface that adapts to user responses and generates personalized analysis and solutions.

## Features

- 🤖 AI-powered question generation using Groq or Azure models
- 🔄 Dynamic conversation flow that adapts to user responses
- 📊 Detailed analysis of habit failures and patterns
- 💡 Personalized action steps and solutions
- 🎨 Beautiful, responsive UI with dark mode support
- 🔒 Secure token-based API authentication
- 💾 Persistent storage with easy reset option

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- A Groq API key or Azure OpenAI key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/what-went-wrong.git
cd what-went-wrong
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key
# Or for Azure:
AZURE_AI_KEY=your_azure_key
AZURE_ENDPOINT=your_azure_endpoint
AZURE_MODEL_NAME=your_model_name
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Usage

1. **Model Selection**: Choose between Groq or Azure/GitHub models and enter your API token
2. **Initial Questions**: Answer the first 6 pre-defined questions about your habit
3. **AI Questions**: The system generates follow-up questions based on your responses
4. **Analysis**: After 8 questions, receive a detailed analysis of:
   - What went wrong (patterns, obstacles, environment factors)
   - What to do next (actionable steps, suggestions, improvements)

## Project Structure

```
├── app/
│   ├── api/                 # API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/
│   ├── ModelSetup.tsx      # Model selection
│   ├── ResetButton.tsx     # Storage reset
│   └── Summary.tsx         # Analysis display
├── lib/
│   ├── ai-clients/         # AI model integrations
│   ├── constants/          # Static questions
│   └── store/              # Zustand state management
```

## Technical Details

### State Management
- Uses Zustand for state management
- Persists data in localStorage
- Supports full state reset

### AI Integration
- Supports multiple AI models:
  - Groq (llama-3.3-70b-versatile)
  - Azure OpenAI (customizable)
- Token-based authentication
- Streaming responses

### UI/UX
- Built with Tailwind CSS
- Smooth animations with Framer Motion
- Responsive design
- Dark mode support
- Geist font integration

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Acknowledgments

- Next.js team for the amazing framework
- Groq and Azure for AI capabilities
- Vercel for hosting and deployment
- Open source community for inspiration
- GitHub Copilot 1-Day Build Challenge for the opportunity

