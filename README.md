

![vecteezy_tecno-brand-logo-phone-symbol-name-white-design-chinese_20927598](https://github.com/user-attachments/assets/7ee459bc-6028-4b0c-9b7f-47ab7975b198)

# 🛍️ Techno Shop - Premium E-Commerce Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.3.0-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-316192?style=for-the-badge&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge)

**A modern, full-featured e-commerce platform for tech products built with Next.js 16, React 19, and Prisma.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Environment Variables](#-environment-variables) • [API Routes](#-api-routes) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Routes](#-api-routes)
- [Key Features Explained](#-key-features-explained)
- [Deployment](#-deployment)
- [Scripts](#-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Techno Shop** is a premium e-commerce platform specializing in tech products including smartphones, laptops, tablets, and smartwatches. The platform features a modern, responsive design with advanced shopping cart functionality, user authentication, product management, and comprehensive SEO optimization.

### Key Highlights

- 🚀 **Next.js 16** with App Router
- ⚡ **React 19** with Server Components
- 🔐 **Clerk Authentication** for secure user management
- 🛒 **Persistent Shopping Cart** per user
- 📱 **Fully Responsive** design
- 🔍 **Advanced Search & Filtering**
- 📊 **Admin Dashboard** for product management
- 🎨 **shadcn/ui** component library
- 📈 **SEO Optimized** with Structured Data

---

## ✨ Features

### 🛍️ E-Commerce Features

- **Product Catalog**
  - Browse products by category (Phones, Laptops, Tablets, Watches)
  - Product search functionality
  - Category-based filtering
  - Product detail pages with images and descriptions
  - Product recommendations

- **Shopping Cart**
  - User-specific cart persistence
  - Add/remove products
  - Quantity management
  - Cart persists across sessions
  - Real-time cart updates

- **User Authentication**
  - Secure authentication with Clerk
  - User profiles
  - Protected routes
  - Admin role management

- **Admin Dashboard**
  - Product CRUD operations
  - Image upload with Cloudinary
  - Product management interface
  - Admin-only access

### 🎨 UI/UX Features

- **Modern Design**
  - Clean, minimalist interface
  - Smooth animations and transitions
  - Loading states with Skeleton components
  - Responsive mobile-first design

- **Performance**
  - Server-side rendering
  - Image optimization
  - Code splitting
  - Optimistic UI updates

### 🔍 SEO Features

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
  - Dynamic metadata per page

- **Technical SEO**
  - Sitemap.xml generation
  - Robots.txt configuration
  - Semantic HTML structure

---

## 🛠️ Tech Stack

### Core Framework

- **[Next.js 16.1.6](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.3](https://react.dev/)** - UI library
- **[Node.js](https://nodejs.org/)** - Runtime environment

### Database & ORM

- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Prisma 7.3.0](https://www.prisma.io/)** - Next-generation ORM
- **[@prisma/adapter-pg](https://www.prisma.io/docs/concepts/components/prisma-adapter)** - PostgreSQL adapter

### Authentication

- **[Clerk 6.37.3](https://clerk.com/)** - Complete authentication solution
  - User management
  - Session handling
  - Protected routes
  - Admin roles

### Styling & UI

- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[class-variance-authority](https://cva.style/)** - Component variants

### State Management

- **[React Context API](https://react.dev/reference/react/useContext)** - Global state
- **[TanStack Query 5.90.20](https://tanstack.com/query)** - Server state management

### Image & File Management

- **[Cloudinary](https://cloudinary.com/)** - Image upload and optimization
- **[Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)** - Optimized images

### Additional Libraries

- **[Framer Motion 12.34.0](https://www.framer.com/motion/)** - Animation library for smooth UI interactions
- **[react-hot-toast](https://react-hot-toast.com/)** - Toast notifications
- **[axios](https://axios-http.com/)** - HTTP client
- **[embla-carousel-react](https://www.embla-carousel.com/)** - Carousel component

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[React Compiler](https://react.dev/learn/react-compiler)** - Automatic optimization

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Clerk account (for authentication)
- Cloudinary account (for image uploads)

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

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
techno/
├── app/                          # Next.js App Router
│   ├── (private)/               # Protected routes
│   │   └── dashboard/           # Admin dashboard
│   │       ├── actions.js      # Server actions
│   │       ├── page.jsx        # Dashboard page
│   │       └── components/     # Dashboard components
│   ├── (public)/               # Public routes
│   │   ├── cart/               # Shopping cart
│   │   │   ├── page.jsx        # Cart page
│   │   │   └── check/          # Checkout page
│   │   └── store/              # Store pages
│   │       ├── page.jsx        # Store listing
│   │       ├── [id]/           # Product detail
│   │       └── layout.jsx      # Store layout
│   ├── api/                    # API routes
│   │   ├── cart/               # Cart API
│   │   │   └── route.js        # GET, POST, DELETE
│   │   └── products/           # Products API
│   │       └── route.js        # GET products
│   ├── sign-in/                # Authentication pages
│   ├── sign-up/
│   ├── layout.js               # Root layout
│   ├── page.js                 # Home page
│   ├── sitemap.js              # Sitemap generation
│   └── robots.js               # Robots.txt
│
├── components/                  # React components
│   ├── custom/                 # Custom components
│   │   ├── about/              # About section
│   │   ├── addToCart/          # Add to cart button
│   │   ├── Auth/               # Authentication components
│   │   ├── banner/             # Banner carousel
│   │   ├── footer/             # Footer component
│   │   ├── header/             # Header & navigation
│   │   ├── SuggestionProduct/  # Product suggestions
│   │   └── welcome/            # Welcome section
│   ├── seo/                    # SEO components
│   │   └── StructuredData.jsx  # JSON-LD schema
│   └── ui/                     # shadcn/ui components
│       ├── button.jsx
│       ├── card.jsx
│       ├── skeleton.jsx
│       └── ...
│
├── contexts/                    # React Context
│   └── CartContext.jsx         # Shopping cart state
│
├── lib/                         # Utility libraries
│   ├── prisma.js               # Prisma client
│   ├── seo.js                  # SEO helpers
│   └── utils.js                # Utility functions
│
├── modules/                     # Feature modules
│   └── products/               # Product module
│       ├── components/         # Product components
│       │   ├── ProductItem.jsx
│       │   ├── ProductList.jsx
│       │   ├── ProductFilter.jsx
│       │   ├── ProductSearch.jsx
│       │   └── ProductSkeleton.jsx
│       └── services/          # Product services
│
├── prisma/                      # Database
│   ├── migrations/            # Database migrations
│   └── schema.prisma         # Database schema
│
├── public/                      # Static assets
│   ├── mock/                   # Product images
│   └── uploads/                # Uploaded images
│
├── components.json              # shadcn/ui config
├── next.config.mjs              # Next.js config
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind config
└── README.md                    # Project documentation
```

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | ✅ Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ Yes |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (for SEO) | ⚠️ Recommended |

---

## 🗄️ Database Schema

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

## 🔌 API Routes

### Cart API (`/api/cart`)

#### GET `/api/cart`
Get user's shopping cart items.

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
      ...
    }
  ]
}
```

#### POST `/api/cart`
Add or update product in cart.

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 1
}
```

#### DELETE `/api/cart?productId=1&removeCompletely=false`
Remove or decrease product quantity.

**Query Parameters:**
- `productId` (required): Product ID
- `removeCompletely` (optional): Remove completely or decrease quantity

### Products API (`/api/products`)

#### GET `/api/products`
Get all products.

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "title": "Product Name",
      "price": 999.99,
      "category": "Phones",
      ...
    }
  ]
}
```

---

## 🎯 Key Features Explained

### Shopping Cart System

The shopping cart is implemented with:
- **User-specific persistence**: Each user has their own cart stored in the database
- **Session persistence**: Cart persists across browser sessions
- **Real-time updates**: Optimistic UI updates for better UX
- **Context API**: Global cart state management

### Authentication Flow

- **Clerk Integration**: Complete authentication solution
- **Protected Routes**: Admin dashboard requires authentication
- **Role-based Access**: Admin users can manage products
- **Session Management**: Automatic session handling

### Product Management

- **CRUD Operations**: Create, Read, Update, Delete products
- **Image Upload**: Cloudinary integration for image storage
- **Category Management**: Products organized by categories
- **Search & Filter**: Advanced product filtering

### SEO Optimization

- **Structured Data**: JSON-LD schemas for better search visibility
- **Meta Tags**: Comprehensive Open Graph and Twitter Cards
- **Sitemap**: Auto-generated sitemap.xml
- **Canonical URLs**: Prevent duplicate content issues

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
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

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run studio` | Open Prisma Studio |
| `npm run generate` | Generate Prisma Client |
| `npm run migrate` | Run database migrations |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Clerk](https://clerk.com/) - Authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

<div align="center">

**Made with ❤️ using Next.js and React**

⭐ Star this repo if you find it helpful!

</div>

