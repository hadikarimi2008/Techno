

![vecteezy_tecno-brand-logo-phone-symbol-name-white-design-chinese_20927598](https://github.com/user-attachments/assets/7ee459bc-6028-4b0c-9b7f-47ab7975b198)

# Techno Shop - Premium E-Commerce Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.3.0-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-316192?style=for-the-badge&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge)

**A modern, full-featured e-commerce platform for tech products built with Next.js 16, React 19, and Prisma.**

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Project Structure](#project-structure) • [Environment Variables](#environment-variables) • [API Routes](#api-routes) • [Deployment](#deployment)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Key Features Explained](#key-features-explained)
- [Deployment](#deployment)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Techno Shop** is a premium e-commerce platform specializing in tech products including smartphones, laptops, tablets, and smartwatches. The platform features a modern, responsive design with advanced shopping cart functionality, user authentication, product management, contact form handling, admin user management, and comprehensive SEO optimization.

### Key Highlights

- **Next.js 16** with App Router
- **React 19** with Server Components
- **Clerk Authentication** for secure user management
- **Persistent Shopping Cart** per user
- **Fully Responsive** design
- **Advanced Search & Filtering**
- **Admin Dashboard** for products, users, and contact messages
- **Contact Page** with form, map, and email notifications
- **Product Color Management** with hex color picker
- **Cookie Consent Banner** for privacy compliance
- **shadcn/ui** component library
- **SEO Optimized** with Structured Data

---

## Features

### E-Commerce Features

- **Product Catalog**
  - Browse products by category (Phones, Laptops, Tablets, Watches)
  - Product search functionality (title and description)
  - Category-based filtering
  - Product detail pages with images, descriptions, and color swatches
  - Product recommendations (random related products on detail page)
  - Home page product suggestions (3 random items from database)

- **Shopping Cart**
  - User-specific cart persistence in PostgreSQL
  - Add/remove products with quantity management
  - Cart persists across sessions
  - Real-time cart updates with optimistic UI
  - Cart icon with item count badge in header (visible when logged in)
  - Sign-in gate on add-to-cart for unauthenticated users

- **Checkout Flow**
  - Mock checkout confirmation page at `/cart/check`
  - Order summary with tax calculation (5%) and free shipping
  - Clears cart after successful checkout
  - Toast notification on order completion
  - No real payment integration (simulated order confirmation)

- **User Authentication**
  - Secure authentication with Clerk
  - Custom sign-in and sign-up pages with branded layout
  - Protected routes and admin role management via `privateMetadata.isAdmin`
  - Admin dashboard link in Clerk UserButton menu for admin users

### Admin Dashboard

- **Product Management**
  - Product list table with preview image, category, price, and stock
  - Add new products via slide-out sheet form (`ProductFormSheet`)
  - Full-page dedicated edit form at `/dashboard/update/[id]`
  - Delete products with confirmation dialog and toast feedback
  - Image upload with Cloudinary integration (drag-and-drop support)
  - Product color picker with hex color selection (`react-colorful`)
  - Add/remove multiple product color swatches
  - Color data normalization for corrupted legacy color values (`normalizeColors`)
  - Server actions for create, update, and delete operations

- **User Management** (`/dashboard/users`)
  - View all Clerk users with avatar, email, phone, and status
  - Ban and unban users via Clerk API
  - Delete users from Clerk
  - User creation date and last login display

- **Contact Messages** (`/dashboard/emails`)
  - Inbox for contact form submissions stored in database
  - View message details (name, email, phone, subject, message, date)
  - Delete individual messages
  - Admin-only access via private layout guard

- **Admin Navigation**
  - Protected admin layout with navigation tabs: Products | Users | Emails
  - Non-admin users are redirected to home page

### Contact Page

- **Contact Page** (`/contact`)
  - Animated contact cards (phone, email, office) with Framer Motion
  - Contact form with fields: name, email, phone, subject (dropdown), message
  - Form submission saves to database and sends email notification via Resend
  - Google Maps iframe for office location
  - "Why Us" statistics section
  - Dedicated layout with contact-specific SEO metadata

### UI/UX Features

- **Home Page**
  - Animated welcome hero section with CTA to store
  - Embla carousel banner with 3 promotional images
  - About section with 4 animated feature blocks (CPU, delivery, warranty, global)
  - Random product suggestions grid with Framer Motion animations

- **Navigation & Layout**
  - Fixed header with Home, Store, Contact links
  - Mobile slide-out menu with navigation and auth
  - Footer with brand info, social links, and GitHub credit
  - Global loading spinner, error boundary with retry, and custom 404 page

- **Cookie Consent**
  - Privacy cookie consent banner (appears after 4 seconds)
  - Accept/Decline options stored in `localStorage`
  - Framer Motion slide-in animation
  - Mounted globally in root layout

- **Support Widget**
  - Fixed bottom-left headset icon linking to `/support`
  - Mounted globally in root layout

- **Modern Design**
  - Clean, minimalist interface
  - Smooth animations and transitions (Framer Motion)
  - Loading states with Skeleton components
  - Responsive mobile-first design
  - Toast notifications for user feedback (`react-hot-toast`)

- **Performance**
  - Server-side rendering for product detail and dashboard pages
  - Image optimization with Next.js Image component
  - Code splitting
  - Optimistic UI updates for cart operations
  - React Compiler enabled in Next.js config

### SEO Features

- **Structured Data (JSON-LD)**
  - Product schema
  - Organization schema
  - Website schema
  - Breadcrumb schema
  - Store schema

- **Meta Tags**
  - Open Graph tags
  - Twitter Cards
  - Canonical URLs
  - Dynamic metadata per page (store, contact, cart layouts)
  - Cart page set to `noindex`

- **Technical SEO**
  - Sitemap.xml generation (home, store, cart, all product pages)
  - Robots.txt configuration (blocks dashboard, API, auth routes)
  - Semantic HTML structure

---

## Tech Stack

### Core Framework

- **[Next.js 16.1.6](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.3](https://react.dev/)** - UI library
- **[Node.js](https://nodejs.org/)** - Runtime environment

### Database & ORM

- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Prisma 7.3.0](https://www.prisma.io/)** - Next-generation ORM
- **[@prisma/adapter-pg](https://www.prisma.io/docs/concepts/components/prisma-adapter)** - PostgreSQL adapter with `pg` connection pool

### Authentication

- **[Clerk 6.37.3](https://clerk.com/)** - Complete authentication solution
  - User management
  - Session handling
  - Protected routes
  - Admin roles via `privateMetadata.isAdmin`
  - User ban/unban/delete via Clerk Backend API

### Styling & UI

- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[class-variance-authority](https://cva.style/)** - Component variants

### State Management

- **[React Context API](https://react.dev/reference/react/useContext)** - Global cart state
- **[TanStack Query 5.90.20](https://tanstack.com/query)** - Server state provider (wired in root layout with devtools)

### Image & File Management

- **[Cloudinary](https://cloudinary.com/)** - Image upload and optimization
- **[Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)** - Optimized images

### Email

- **[Resend](https://resend.com/)** - Transactional email for contact form notifications

### Additional Libraries

- **[Framer Motion 12.34.0](https://www.framer.com/motion/)** - Animation library for welcome, contact, cookies, about, and product sections
- **[react-colorful 5.7.0](https://github.com/omgovich/react-colorful)** - Hex color picker for product color management
- **[react-hot-toast 2.6.0](https://react-hot-toast.com/)** - Toast notifications for delete, checkout, and form feedback
- **[embla-carousel-react](https://www.embla-carousel.com/)** - Banner carousel component

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Type definitions for Node.js (project source is JavaScript/JSX)
- **[React Compiler](https://react.dev/learn/react-compiler)** - Automatic optimization

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Clerk account (for authentication)
- Cloudinary account (for image uploads)
- Resend account (for contact form emails)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/techno-shop.git
cd techno-shop
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/techno_shop?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Resend (for contact form emails)
RESEND_API_KEY=your_resend_api_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Set up the database**

```bash
# Generate Prisma Client
npm run generate

# Run migrations
npm run migrate

# (Optional) Open Prisma Studio to view/edit data
npm run studio
```

5. **Set up admin access**

In the Clerk Dashboard, set `isAdmin: true` in the user's **Private Metadata** to grant admin dashboard access.

6. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
techno/
├── app/                              # Next.js App Router
│   ├── (private)/                   # Protected admin routes
│   │   ├── layout.jsx               # Admin layout + isAdmin guard + nav
│   │   └── dashboard/
│   │       ├── actions.js           # Product CRUD server actions
│   │       ├── page.jsx             # Product management table
│   │       ├── ProductFormSheet.jsx # Add product slide-out form
│   │       ├── components/
│   │       │   ├── DeleteProductButton.jsx
│   │       │   ├── ImageUploderDiv.jsx
│   │       │   ├── ProductColorsPicker.jsx
│   │       │   └── UpdateProductButton.jsx
│   │       ├── update/[id]/page.jsx # Full-page product edit form
│   │       ├── users/
│   │       │   ├── actions.js       # Clerk user ban/unban/delete
│   │       │   └── page.jsx         # User management page
│   │       └── emails/
│   │           ├── actions.js       # Delete contact messages
│   │           └── page.jsx         # Contact messages inbox
│   ├── (public)/                    # Public routes
│   │   ├── cart/
│   │   │   ├── layout.jsx           # Cart metadata (noindex)
│   │   │   ├── page.jsx             # Shopping cart page
│   │   │   └── check/page.jsx       # Mock checkout confirmation
│   │   ├── contact/
│   │   │   ├── layout.jsx           # Contact metadata + JSON-LD
│   │   │   └── page.jsx             # Contact page with form + map
│   │   └── store/
│   │       ├── layout.jsx           # Store metadata + JSON-LD
│   │       ├── page.jsx             # Product listing with search/filter
│   │       └── [id]/page.jsx        # Product detail with colors
│   ├── api/
│   │   ├── cart/route.js            # GET, POST, DELETE cart
│   │   ├── contact/route.js         # POST contact form + Resend email
│   │   └── products/route.js        # GET all products
│   ├── sign-in/[[...sign-in]]/      # Clerk sign-in page
│   ├── sign-up/[[...sign-up]]/      # Clerk sign-up page
│   ├── provider/ReactQuery.jsx      # TanStack Query provider
│   ├── layout.js                    # Root layout (Clerk, Cart, Cookie, Support)
│   ├── page.js                      # Home page
│   ├── loading.jsx                  # Global loading state
│   ├── error.jsx                    # Error boundary
│   ├── not-found.jsx                # Custom 404 page
│   ├── sitemap.js                   # Dynamic sitemap generation
│   ├── robots.js                    # Robots.txt configuration
│   └── globals.css                  # Global styles
│
├── components/
│   ├── custom/
│   │   ├── about/                   # About section (home page)
│   │   ├── addToCart/               # Add to cart button with sign-in gate
│   │   ├── Auth/                    # Clerk auth + admin button
│   │   ├── banner/                  # Embla carousel banner
│   │   ├── ColorPicker/             # Reusable hex color picker component
│   │   ├── ContactCard/             # Contact cards + contact form
│   │   ├── container/               # Layout container wrapper
│   │   ├── CookieConsent/           # Cookie consent banner
│   │   ├── footer/                  # Site footer
│   │   ├── header/                  # Header, cart icon, mobile menu
│   │   ├── ImageUploader/           # Drag-and-drop image uploader
│   │   ├── SuggestionProduct/       # Home page product suggestions
│   │   ├── support/                 # Floating support widget
│   │   └── welcome/                 # Home page hero section
│   ├── seo/
│   │   └── StructuredData.jsx       # JSON-LD schema injector
│   └── ui/                          # shadcn/ui components
│
├── contexts/
│   └── CartContext.jsx              # Shopping cart global state
│
├── lib/
│   ├── prisma.js                    # Prisma client with pg adapter
│   ├── seo.js                       # JSON-LD schema generators
│   ├── normalizeColors.js           # Product color array normalization
│   └── utils.js                     # cn() Tailwind merge helper
│
├── modules/
│   └── products/
│       └── components/
│           ├── ProductItem.jsx      # Product card with colors + cart
│           ├── ProductList.jsx      # Product grid with skeleton loading
│           ├── ProductFilter.jsx    # Category filter
│           ├── ProductSearch.jsx    # Search by title/description
│           └── ProductSkeleton.jsx  # Loading placeholder
│
├── prisma/
│   ├── migrations/                  # Database migrations
│   └── schema.prisma               # Product, CartItem, ContactMessage
│
├── public/
│   ├── contact-image/               # Contact page card images
│   └── uploads/                     # Local uploaded images
│
├── components.json                  # shadcn/ui config
├── next.config.mjs                  # Next.js config (React Compiler, Cloudinary)
├── package.json
├── tailwind.config.js
├── README.md
└── README-GitHub.md
```

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `RESEND_API_KEY` | Resend API key for contact form emails | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (for SEO and sitemap) | Recommended |

---

## Database Schema

### Product Model

```prisma
model Product {
  id          Int             @id @default(autoincrement())
  img         String
  title       String
  rate        Float
  price       Float
  description String
  colors      String[]
  category    ProductCategory
  quantity    Int?            @default(0)
  createdAt   DateTime        @default(now())
  updatedAt   DateTime?       @updatedAt
  cart        CartItem[]
}
```

### CartItem Model

```prisma
model CartItem {
  id        Int     @id @default(autoincrement())
  userId    String
  productId Int
  qty       Int     @default(1)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
}
```

### ContactMessage Model

```prisma
model ContactMessage {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  phone     String?
  subject   String?
  message   String
  createdAt DateTime @default(now())
}
```

### ProductCategory Enum

```prisma
enum ProductCategory {
  Phones
  laptops
  tablets
  watches
}
```

---

## API Routes

### Cart API (`/api/cart`)

#### GET `/api/cart`
Get the authenticated user's shopping cart items. Returns empty cart if not logged in.

**Response:**
```json
{
  "cartItems": [
    {
      "id": 1,
      "title": "Product Name",
      "img": "image-url",
      "price": 999.99,
      "quantity": 2,
      "category": "Phones",
      "colors": ["#000000", "#c0c0c0"]
    }
  ]
}
```

#### POST `/api/cart`
Add or increment product quantity in cart.

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 1
}
```

#### DELETE `/api/cart?productId=1&removeCompletely=false`
Remove or decrease product quantity. Use `clearAll=true` to empty the entire cart.

**Query Parameters:**
- `productId` (required): Product ID
- `removeCompletely` (optional): Remove completely or decrease quantity
- `clearAll` (optional): Clear all cart items

### Products API (`/api/products`)

#### GET `/api/products`
Get all products ordered by creation date (newest first).

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "title": "Product Name",
      "price": 999.99,
      "category": "Phones",
      "colors": ["#000000", "#ffffff"]
    }
  ]
}
```

### Contact API (`/api/contact`)

#### POST `/api/contact`
Submit a contact form message. Saves to database and sends email notification via Resend.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "General Inquiry",
  "message": "Hello, I have a question about..."
}
```

**Response:**
```json
{
  "ok": true
}
```

---

## Key Features Explained

### Shopping Cart System

The shopping cart is implemented with:
- **User-specific persistence**: Each user has their own cart stored in the database
- **Session persistence**: Cart persists across browser sessions
- **Real-time updates**: Optimistic UI updates for better UX
- **Context API**: Global cart state management via `CartContext`
- **Authentication gate**: Users must sign in to add items to cart

### Authentication Flow

- **Clerk Integration**: Complete authentication solution
- **Protected Routes**: Admin dashboard requires `isAdmin: true` in Clerk private metadata
- **Role-based Access**: Admin users can manage products, users, and contact messages
- **Session Management**: Automatic session handling
- **Admin Menu**: Custom Clerk UserButton menu item links to `/dashboard`

### Product Management

- **CRUD Operations**: Create, Read, Update, Delete products via server actions
- **Dual Edit Interfaces**: Quick add via slide-out sheet; full edit via dedicated page
- **Image Upload**: Cloudinary integration with drag-and-drop uploader
- **Color Management**: Hex color picker to assign multiple product colors
- **Color Normalization**: `normalizeColors` utility cleans malformed color data from legacy saves
- **Category Management**: Products organized by categories (Phones, laptops, tablets, watches)
- **Search & Filter**: Client-side search and category filtering on store page

### Contact Form System

- **Public Contact Page**: Animated cards, form, and embedded Google Maps
- **Dual Storage**: Messages saved to PostgreSQL and emailed via Resend
- **Admin Inbox**: Dashboard page to view and delete contact messages
- **Form Fields**: Name, email, phone (optional), subject (dropdown), message

### Admin User Management

- **Clerk Integration**: Lists all users from Clerk Backend API
- **User Actions**: Ban, unban, and delete users
- **Status Display**: Shows banned/active status, creation date, and last login
- **Admin Guard**: Only users with `isAdmin: true` can access admin routes

### Product Colors

- **Storage**: Product colors stored as `String[]` (hex values) in PostgreSQL
- **Dashboard Picker**: `ProductColorsPicker` component with `react-colorful` for add/edit forms
- **Storefront Display**: Color swatches on product cards (up to 4) and product detail pages
- **Normalization**: `lib/normalizeColors.js` handles corrupted color arrays from legacy data

### Cookie Consent

- **Privacy Banner**: Appears after 4 seconds on first visit
- **localStorage Persistence**: User choice stored as `cookie-consent` key
- **Accept/Decline**: Both options dismiss the banner permanently

### Checkout Flow

- **Mock Checkout**: Simulated order confirmation at `/cart/check`
- **Order Summary**: Displays subtotal, 5% tax, and free shipping
- **Cart Clearing**: Empties cart via API after checkout
- **No Payment**: No Stripe or payment gateway integration

### SEO Optimization

- **Structured Data**: JSON-LD schemas for products, organization, website, breadcrumbs, and store
- **Meta Tags**: Comprehensive Open Graph and Twitter Cards per layout
- **Sitemap**: Auto-generated sitemap.xml including all product pages
- **Robots.txt**: Blocks admin, API, and auth routes from indexing
- **Canonical URLs**: Prevent duplicate content issues

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables (including `RESEND_API_KEY`)
4. Deploy!

### Other Platforms

The app can be deployed on any platform supporting Next.js:
- **Netlify**
- **Railway**
- **AWS Amplify**
- **DigitalOcean App Platform**

### Database Setup

For production, use a managed PostgreSQL service:
- **Vercel Postgres**
- **Supabase**
- **Neon**
- **Railway**
- **AWS RDS**

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Generate Prisma Client and build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run studio` | Open Prisma Studio |
| `npm run generate` | Generate Prisma Client |
| `npm run migrate` | Run database migrations |

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Clerk](https://clerk.com/) - Authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [Resend](https://resend.com/) - Email delivery
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

<div align="center">

**Made with Next.js and React**

Star this repo if you find it helpful!

</div>
