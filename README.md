# Premium Next.js Prompt Library Landing Page

A state-of-the-art, high-end, responsive Next.js landing page built with **React 18**, **Tailwind CSS**, and **Framer Motion**. It is configured to run flawlessly offline and features premium styling including glassmorphism, progressive blurs, interactive copy mechanics, and real-time live feed updates.

## Key Features

1. **Fullscreen Video Background with Ambient Glow Fallback**
   - Renders a loopable `<video>` that covers the entire screen, with no controls or audio clutter.
   - Includes a premium radial ambient mesh background underneath so that the site looks magnificent even before your local video files are loaded.

2. **Progressive Gradient Blur**
   - Applies an advanced layered CSS and SVG mask progressive blur over the bottom $35\%$ of the video screen.
   - Merges multiple backdrop-filter layers (`blur-layer-1`, `blur-layer-2`, `blur-layer-3`) to guarantee a smooth transition from crystal clear to heavily blurred dark backing.

3. **Live "New prompts added" Gimmick Card**
   - Positioned at the very bottom right of the viewport as a floating glass capsule.
   - Features a live pulsing green indicator dot.
   - Ticks up organically at random time intervals (from $3.5$ to $7.5$ seconds) by small incremental values ($+1$ to $+3$) to simulate real-time prompt creation.
   - Uses `framer-motion` to briefly scale and glow whenever the counter changes.

4. **Frosted Glassmorphism Elements**
   - Main CTA buttons and prompt cards utilize premium custom `.glass-panel` and `.glass-button` CSS classes.
   - Subtle hover states, rotating icons, and translation effects provide crisp visual feedback.

5. **Offline Compilation & System Font Stack**
   - Refactored to utilize a premium system font stack (`system-ui` and modern monospace fonts) to build perfectly and instantly offline without fetching external assets.

---

## Getting Started

### 1. Place your Video File
As described in your request, once you are ready, copy your custom video file to the following path:
```bash
public/video/main_video.mp4
```

### 2. Run the Development Server
Launch the development server with:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application in action.

### 3. Build for Production
To bundle the application for production, compile with:
```bash
npm run build
```

---

## File Structure

```
├── public/
│   └── video/
│       └── main_video.mp4      <-- Place your video here
├── src/
│   └── app/
│       ├── globals.css         <-- Layered blurs, glassmorphism utilities & animations
│       ├── layout.tsx          <-- Offline system fonts & metadata configuration
│       └── page.tsx            <-- Interactive hero page & live gimmick counter
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```
