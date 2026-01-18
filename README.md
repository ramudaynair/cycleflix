# CYCLFLIX

A Netflix-integrated cycling system website built with Next.js, featuring an immersive Netflix-style intro animation and modern UI components.

## Features

- **Netflix Tudum Animation**: Authentic Netflix intro with audio and logo disassembly effects
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for fluid transitions and interactions
- **Modern UI**: shadcn/ui components with Netflix-inspired styling
- **Smart Navigation**: Smooth scrolling and client-side routing
- **Contact Integration**: Direct email and phone contact functionality

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**: Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
cyclfli-master/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with splash control
│   ├── privacy/           # Privacy policy page
│   ├── terms/             # Terms of service page
│   └── cart/              # Shopping cart page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── tudum-splash.tsx  # Netflix intro animation
│   ├── header.tsx        # Navigation header
│   └── ...               # Other sections
└── public/               # Static assets
```

## Key Components

- **TudumSplash**: Netflix-style intro animation with audio
- **Header**: Responsive navigation with smooth scrolling
- **HomeContent**: Main layout orchestrating all sections
- **Contact Section**: Direct communication integration

## Splash Screen Behavior

The Netflix intro animation only plays when the CYCLFLIX logo is clicked, not on browser refresh or direct navigation.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

Private project - All rights reserved