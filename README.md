# Resultify - Student Result Viewing Platform

A modern, glassmorphism-styled React application for viewing student results with an admin panel for managing and publishing results.

## 🚀 Features

- **Student Search**: Search results by College → Course → Roll Number
- **Beautiful Result Display**: Subject-wise marks with grades, percentages, and performance bars
- **Admin Panel**: Upload and manage result batches (mock interface ready for backend)
- **Theme Toggle**: Seamless dark/light mode with localStorage persistence
- **Glassmorphism UI**: Modern glass-effect design with backdrop blur
- **Responsive Design**: Mobile-first, works perfectly on all devices
- **Accessibility**: WCAG AA compliant with keyboard navigation support

## 🎨 Design

- **Primary Color**: Royal Blue (#2D7FF9)
- **Accent Color**: Mint (#7DE3B8)
- **Typography**: Inter font family
- **Animations**: Framer Motion for smooth micro-interactions
- **Theme Support**: Light and Dark modes with OS preference detection

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite (dev server & build tool)
- Tailwind CSS (utility-first styling)
- Framer Motion (animations)
- React Router (navigation)
- shadcn/ui components
- Lucide React icons

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── api/
│   ├── mockApi.ts          # Mock API functions (replace with real endpoints)
│   └── mockData.ts         # Sample student data
├── components/
│   ├── ui/                 # shadcn components
│   ├── Header.tsx          # App header with theme toggle
│   ├── SearchForm.tsx      # Student search form
│   ├── ResultCard.tsx      # Result display with table
│   └── EmptyState.tsx      # No result found state
├── contexts/
│   └── ThemeContext.tsx    # Theme provider
├── pages/
│   ├── Index.tsx           # Landing/Search page
│   ├── Result.tsx          # Result display page
│   ├── AdminLogin.tsx      # Admin login (demo credentials)
│   └── AdminDashboard.tsx  # Admin panel
├── App.tsx                 # Main app with routing
└── index.css               # Global styles & design tokens
```

## 🔌 Backend Integration

The app currently uses mock data. To connect a real backend:

1. **Replace Mock API Functions** in `src/api/mockApi.ts`:
   - `searchResult()` - Fetch student by college/course/roll
   - `getColleges()` - Get list of colleges
   - `getCoursesByCollege()` - Get courses for a college
   - `adminLogin()` - Authenticate admin user

2. **Environment Variables**: Create `.env` file:
   ```
   VITE_API_BASE_URL=https://your-backend.com/api
   ```

3. **Admin Upload**: Implement file upload endpoint for Excel/CSV parsing

## 👤 Demo Credentials

**Admin Panel Access:**
- Username: `admin`
- Password: `admin123`

**Sample Student Search:**
- College: PCTE College
- Course: B.Tech CSE
- Roll Number: 1001

## 🎯 Sample Data

See `public/templates/results_template.csv` for the expected CSV format for bulk uploads.

Sample students are available in `src/api/mockData.ts`.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy the `dist` folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the `dist` folder to Netlify with _redirects:
/*  /index.html  200
```

### Other Platforms
Build the project (`npm run build`) and serve the `dist` folder as a static site.

## 🎨 Customization

### Colors
Edit `src/index.css` to change the color palette (HSL format).

### Components
All UI components use the design system tokens - customize in `tailwind.config.ts`.

### Animations
Adjust animation timings in `tailwind.config.ts` under `keyframes` and `animation`.

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🙏 Credits

Built with modern web technologies and best practices. Icons by Lucide, UI components by shadcn.

---

**Need Help?** Check the inline code comments or refer to the component documentation in each file.
