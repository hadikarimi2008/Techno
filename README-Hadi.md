# 📚 Complete Library Setup & Implementation Guide

<div align="center">

**Zero to Hero Guide for All Libraries Used in Techno Shop**

[English](#english-guide) • [فارسی](#راهنمای-فارسی)

</div>

---

# English Guide

## Table of Contents

1. [Next.js](#1-nextjs)
2. [React](#2-react)
3. [Prisma](#3-prisma)
4. [Clerk Authentication](#4-clerk-authentication)
5. [Tailwind CSS](#5-tailwind-css)
6. [shadcn/ui](#6-shadcnui)
7. [Cloudinary](#7-cloudinary)
8. [TanStack Query](#8-tanstack-query-react-query)
9. [react-hot-toast](#9-react-hot-toast)
10. [Lucide React](#10-lucide-react)
11. [Embla Carousel](#11-embla-carousel)
12. [Axios](#12-axios)
13. [clsx & tailwind-merge](#13-clsx--tailwind-merge)
14. [class-variance-authority](#14-class-variance-authority)

---

## 1. Next.js

### What is Next.js?
Next.js is a React framework that enables server-side rendering, static site generation, and API routes.

### Installation

```bash
# Create a new Next.js project
npx create-next-app@latest my-app

# Or install in existing project
npm install next@16.1.6 react@19.2.3 react-dom@19.2.3
```

### Setup Steps

1. **Update package.json scripts:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

2. **Create app directory structure:**
```
app/
  ├── layout.js      # Root layout
  ├── page.js        # Home page
  └── globals.css    # Global styles
```

3. **Basic layout.js:**
```javascript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Implementation in Our Project

- **App Router**: Using Next.js 16 App Router
- **Server Components**: Most components are server components
- **API Routes**: `/app/api/cart/route.js` and `/app/api/products/route.js`
- **Metadata**: SEO metadata in layout.js and page files
- **Image Optimization**: Using Next.js Image component

### Key Features Used

- Server-side rendering
- API routes
- Dynamic routes (`/store/[id]`)
- Route groups (`(private)`, `(public)`)
- Metadata API
- Sitemap generation

---

## 2. React

### What is React?
React is a JavaScript library for building user interfaces with components.

### Installation

```bash
npm install react@19.2.3 react-dom@19.2.3
```

### Setup Steps

1. **React is included with Next.js**, no separate setup needed
2. **Use "use client" directive for client components:**
```javascript
"use client";

import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Implementation in Our Project

- **Client Components**: Cart context, interactive components
- **Server Components**: Product pages, layouts
- **Hooks**: useState, useEffect, useContext
- **Context API**: CartContext for global state

### Example Usage

```javascript
// Client Component
"use client";
import { useState, useEffect } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);
  
  return <div>{/* Render products */}</div>;
}
```

---

## 3. Prisma

### What is Prisma?
Prisma is a next-generation ORM for Node.js and TypeScript that makes database access easy.

### Installation

```bash
npm install prisma @prisma/client
npm install -D prisma
```

### Setup Steps

1. **Initialize Prisma:**
```bash
npx prisma init
```

2. **Configure database in `.env`:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

3. **Create schema in `prisma/schema.prisma`:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          Int      @id @default(autoincrement())
  title       String
  price       Float
  createdAt   DateTime @default(now())
}
```

4. **Generate Prisma Client:**
```bash
npx prisma generate
```

5. **Create migration:**
```bash
npx prisma migrate dev --name init
```

6. **Create Prisma client instance (`lib/prisma.js`):**
```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma };
```

### Implementation in Our Project

**Schema (`prisma/schema.prisma`):**
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

model CartItem {
  id        Int     @id @default(autoincrement())
  userId    String
  productId Int
  qty       Int     @default(1)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
}
```

**Usage Example:**
```javascript
import { prisma } from '@/lib/prisma';

// Get all products
const products = await prisma.product.findMany();

// Get single product
const product = await prisma.product.findUnique({
  where: { id: 1 }
});

// Create product
const newProduct = await prisma.product.create({
  data: {
    title: "iPhone 15",
    price: 999.99,
    category: "Phones"
  }
});

// Update product
const updated = await prisma.product.update({
  where: { id: 1 },
  data: { price: 899.99 }
});

// Delete product
await prisma.product.delete({
  where: { id: 1 }
});
```

### Common Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Open Prisma Studio (GUI)
npx prisma studio

# Reset database
npx prisma migrate reset
```

---

## 4. Clerk Authentication

### What is Clerk?
Clerk is a complete authentication solution with user management, sessions, and social logins.

### Installation

```bash
npm install @clerk/nextjs
```

### Setup Steps

1. **Create Clerk Account:**
   - Go to [clerk.com](https://clerk.com)
   - Sign up for free account
   - Create a new application

2. **Get API Keys:**
   - Go to API Keys section
   - Copy `Publishable Key` and `Secret Key`

3. **Add to `.env`:**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

4. **Wrap app with ClerkProvider (`app/layout.js`):**
```javascript
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
```

5. **Create sign-in page (`app/sign-in/[[...sign-in]]/page.jsx`):**
```javascript
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return <SignIn />;
}
```

6. **Create sign-up page (`app/sign-up/[[...sign-up]]/page.jsx`):**
```javascript
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return <SignUp />;
}
```

### Implementation in Our Project

**Authentication Component (`components/custom/Auth/index.jsx`):**
```javascript
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Auth() {
  return (
    <div>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
```

**Protected Route (`app/(private)/layout.jsx`):**
```javascript
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PrivateLayout({ children }) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  return <>{children}</>;
}
```

**Get User in Server Component:**
```javascript
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();
  const user = await currentUser();
  
  return <div>Hello {user?.firstName}</div>;
}
```

**Get User in Client Component:**
```javascript
"use client";
import { useUser, useAuth } from "@clerk/nextjs";

export default function Component() {
  const { user, isLoaded } = useUser();
  const { userId } = useAuth();
  
  if (!isLoaded) return <div>Loading...</div>;
  
  return <div>Hello {user?.firstName}</div>;
}
```

**API Route Authentication (`app/api/cart/route.js`):**
```javascript
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Your logic here
}
```

### Dashboard Setup

1. **Go to Clerk Dashboard:**
   - Visit [dashboard.clerk.com](https://dashboard.clerk.com)
   - Select your application

2. **Configure Authentication:**
   - Go to "User & Authentication"
   - Enable email/password or social providers
   - Configure email templates

3. **Set up Admin Role:**
   - Go to "User & Authentication" > "Roles"
   - Create "admin" role
   - Assign to users in "Users" section

4. **Check User Metadata:**
   - In "Users" section, select a user
   - Go to "Metadata" tab
   - Add `isAdmin: true` in private metadata

**Check Admin in Code:**
```javascript
import { currentUser } from "@clerk/nextjs/server";

const user = await currentUser();
const isAdmin = user?.privateMetadata?.isAdmin;
```

---

## 5. Tailwind CSS

### What is Tailwind CSS?
Tailwind CSS is a utility-first CSS framework for rapid UI development.

### Installation

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Setup Steps

1. **Configure `tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

2. **Add to `app/globals.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Implementation in Our Project

**Custom Colors:**
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: '#343A40',
      secondary: '#0056B3',
    }
  }
}
```

**Usage Example:**
```javascript
<div className="bg-slate-900 text-white px-6 py-3 rounded-2xl">
  Button
</div>
```

**Responsive Design:**
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Content */}
</div>
```

---

## 6. shadcn/ui

### What is shadcn/ui?
shadcn/ui is a collection of re-usable components built with Radix UI and Tailwind CSS.

### Installation

1. **Initialize shadcn/ui:**
```bash
npx shadcn@latest init
```

2. **Follow prompts:**
   - Style: New York
   - Base color: Neutral
   - CSS variables: Yes

3. **Add components:**
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add skeleton
```

### Setup Steps

1. **Components are added to `components/ui/`**
2. **Import and use:**
```javascript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Component() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

### Implementation in Our Project

**Components Used:**
- `button.jsx` - Buttons
- `card.jsx` - Cards
- `skeleton.jsx` - Loading skeletons
- `table.jsx` - Tables
- `sheet.jsx` - Side sheets
- `badge.jsx` - Badges

**Example:**
```javascript
import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div>
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-6 w-3/4 mt-4" />
    </div>
  );
}
```

---

## 7. Cloudinary

### What is Cloudinary?
Cloudinary is a cloud-based image and video management service.

### Installation

```bash
npm install cloudinary
```

### Setup Steps

1. **Create Cloudinary Account:**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign up for free account
   - Get credentials from dashboard

2. **Add to `.env`:**
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. **Configure in server action (`app/(private)/dashboard/actions.js`):**
```javascript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "nextjs_store_products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      )
      .end(buffer);
  });
}
```

### Implementation in Our Project

**Upload Function:**
```javascript
export async function saveProduct(formData) {
  const imageFile = formData.get("imageFile");
  let imageUrl = "";

  if (imageFile) {
    const uploadedUrl = await uploadToCloudinary(imageFile);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }

  // Save product with imageUrl
  await prisma.product.create({
    data: {
      title: formData.get("title"),
      img: imageUrl,
      // ... other fields
    }
  });
}
```

**Dashboard Setup:**
1. Go to [cloudinary.com/console](https://cloudinary.com/console)
2. Copy Cloud Name, API Key, API Secret
3. Add to environment variables
4. Images are automatically optimized and stored

---

## 8. TanStack Query (React Query)

### What is TanStack Query?
TanStack Query is a powerful data synchronization library for React.

### Installation

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

### Setup Steps

1. **Create Provider (`app/provider/ReactQuery.jsx`):**
```javascript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function ReactQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

2. **Wrap app in layout:**
```javascript
import ReactQueryProvider from "./provider/ReactQuery";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
```

### Implementation Example

```javascript
"use client";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      return res.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Render products */}</div>;
}
```

---

## 9. react-hot-toast

### What is react-hot-toast?
react-hot-toast is a lightweight toast notification library.

### Installation

```bash
npm install react-hot-toast
```

### Setup Steps

1. **Add Toaster to layout:**
```javascript
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
```

### Implementation Example

```javascript
import toast from 'react-hot-toast';

// Success toast
toast.success('Product added to cart!');

// Error toast
toast.error('Something went wrong!');

// Loading toast
const toastId = toast.loading('Processing...');
// Later: toast.success('Done!', { id: toastId });

// Custom toast
toast('Hello World', {
  icon: '👏',
  duration: 4000,
});
```

**In Our Project:**
```javascript
// app/(public)/cart/check/page.jsx
toast.success("Order placed successfully!", {
  duration: 4000,
  position: "bottom-right",
});
```

---

## 10. Lucide React

### What is Lucide React?
Lucide is a beautiful icon library with 1000+ icons.

### Installation

```bash
npm install lucide-react
```

### Usage

```javascript
import { ShoppingBag, Star, Heart } from "lucide-react";

export default function Component() {
  return (
    <div>
      <ShoppingBag size={24} />
      <Star size={20} className="fill-yellow-400 text-yellow-400" />
      <Heart size={18} />
    </div>
  );
}
```

**In Our Project:**
- Used throughout for icons
- ShoppingBag, Star, Tag, etc.

---

## 11. Embla Carousel

### What is Embla Carousel?
Embla Carousel is a lightweight carousel library with smooth scrolling.

### Installation

```bash
npm install embla-carousel-react
```

### Setup Steps

1. **Create carousel component (`components/ui/carousel.jsx`):**
```javascript
"use client";
import useEmblaCarousel from "embla-carousel-react";

export function Carousel({ children }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {children}
      </div>
    </div>
  );
}
```

### Implementation in Our Project

**Banner Carousel (`components/custom/banner/index.jsx`):**
```javascript
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Banner() {
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        <CarouselItem>
          <Image src={img1} alt="Banner 1" />
        </CarouselItem>
        <CarouselItem>
          <Image src={img2} alt="Banner 2" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
```

**Features:**
- Smooth scrolling
- Loop mode
- Navigation buttons
- Keyboard support

---

## 12. Axios

### What is Axios?
Axios is a promise-based HTTP client for making API requests.

### Installation

```bash
npm install axios
```

### Setup Steps

1. **Create axios instance (optional):**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### Usage Example

```javascript
import axios from 'axios';

// GET request
const response = await axios.get('/api/products');
const products = response.data;

// POST request
await axios.post('/api/cart', {
  productId: 1,
  quantity: 1
});

// With error handling
try {
  const response = await axios.get('/api/products');
  console.log(response.data);
} catch (error) {
  console.error('Error:', error.response?.data);
}
```

**Note:** In our project, we use native `fetch` API instead of axios for most requests.

---

## 13. clsx & tailwind-merge

### What are they?
- **clsx**: Utility for constructing className strings conditionally
- **tailwind-merge**: Merge Tailwind CSS classes intelligently

### Installation

```bash
npm install clsx tailwind-merge
```

### Setup Steps

1. **Create utility function (`lib/utils.js`):**
```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

### Usage Example

```javascript
import { cn } from "@/lib/utils";

// Conditional classes
<div className={cn(
  "base-class",
  isActive && "active-class",
  isDisabled && "disabled-class"
)}>

// Merge Tailwind classes (prevents conflicts)
<button className={cn(
  "px-4 py-2",
  "bg-blue-500",
  "bg-red-500" // This will override bg-blue-500
)}>
```

**In Our Project:**
- Used in all shadcn/ui components
- Used for conditional styling
- Prevents Tailwind class conflicts

---

## 14. class-variance-authority

### What is CVA?
CVA is a library for creating type-safe component variants.

### Installation

```bash
npm install class-variance-authority
```

### Setup Steps

1. **Used by shadcn/ui components automatically**

### Usage Example

```javascript
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "base-button-classes",
  {
    variants: {
      variant: {
        default: "bg-blue-500",
        destructive: "bg-red-500",
        outline: "border",
      },
      size: {
        sm: "px-2 py-1",
        md: "px-4 py-2",
        lg: "px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Usage
<button className={buttonVariants({ variant: "destructive", size: "lg" })}>
  Click me
</button>
```

**In Our Project:**
- Used in shadcn/ui components (Button, Badge, etc.)
- Provides type-safe variant system

---

# راهنمای فارسی

## فهرست مطالب

1. [Next.js](#1-nextjs-فارسی)
2. [React](#2-react-فارسی)
3. [Prisma](#3-prisma-فارسی)
4. [Clerk Authentication](#4-clerk-فارسی)
5. [Tailwind CSS](#5-tailwind-css-فارسی)
6. [shadcn/ui](#6-shadcnui-فارسی)
7. [Cloudinary](#7-cloudinary-فارسی)
8. [TanStack Query](#8-tanstack-query-فارسی)
9. [react-hot-toast](#9-react-hot-toast-فارسی)
10. [Lucide React](#10-lucide-react-فارسی)
11. [Embla Carousel](#11-embla-carousel-فارسی)
12. [Axios](#12-axios-فارسی)
13. [clsx & tailwind-merge](#13-clsx--tailwind-merge-فارسی)
14. [class-variance-authority](#14-class-variance-authority-فارسی)

---

## 1. Next.js فارسی

### Next.js چیست؟
Next.js یک فریمورک React است که امکان رندرینگ سمت سرور، تولید سایت استاتیک و API routes را فراهم می‌کند.

### نصب

```bash
# ایجاد پروژه جدید Next.js
npx create-next-app@latest my-app

# یا نصب در پروژه موجود
npm install next@16.1.6 react@19.2.3 react-dom@19.2.3
```

### مراحل راه‌اندازی

1. **به‌روزرسانی اسکریپت‌های package.json:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

2. **ایجاد ساختار پوشه app:**
```
app/
  ├── layout.js      # لایه اصلی
  ├── page.js        # صفحه اصلی
  └── globals.css    # استایل‌های عمومی
```

3. **layout.js پایه:**
```javascript
export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>{children}</body>
    </html>
  )
}
```

### پیاده‌سازی در پروژه ما

- **App Router**: استفاده از App Router نسخه 16
- **Server Components**: اکثر کامپوننت‌ها server component هستند
- **API Routes**: `/app/api/cart/route.js` و `/app/api/products/route.js`
- **Metadata**: متادیتای SEO در layout.js و صفحات
- **بهینه‌سازی تصویر**: استفاده از کامپوننت Image در Next.js

### ویژگی‌های کلیدی استفاده شده

- رندرینگ سمت سرور
- API routes
- مسیرهای داینامیک (`/store/[id]`)
- گروه‌بندی مسیرها (`(private)`, `(public)`)
- Metadata API
- تولید Sitemap

---

## 2. React فارسی

### React چیست؟
React یک کتابخانه JavaScript برای ساخت رابط کاربری با کامپوننت‌ها است.

### نصب

```bash
npm install react@19.2.3 react-dom@19.2.3
```

### مراحل راه‌اندازی

1. **React با Next.js همراه است**، نیاز به راه‌اندازی جداگانه نیست
2. **استفاده از دستور "use client" برای کامپوننت‌های کلاینت:**
```javascript
"use client";

import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### پیاده‌سازی در پروژه ما

- **Client Components**: Context سبد خرید، کامپوننت‌های تعاملی
- **Server Components**: صفحات محصول، لایه‌ها
- **Hooks**: useState, useEffect, useContext
- **Context API**: CartContext برای state سراسری

### مثال استفاده

```javascript
// کامپوننت کلاینت
"use client";
import { useState, useEffect } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);
  
  return <div>{/* رندر محصولات */}</div>;
}
```

---

## 3. Prisma فارسی

### Prisma چیست؟
Prisma یک ORM نسل جدید برای Node.js و TypeScript است که دسترسی به دیتابیس را آسان می‌کند.

### نصب

```bash
npm install prisma @prisma/client
npm install -D prisma
```

### مراحل راه‌اندازی

1. **مقداردهی اولیه Prisma:**
```bash
npx prisma init
```

2. **پیکربندی دیتابیس در `.env`:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

3. **ایجاد schema در `prisma/schema.prisma`:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          Int      @id @default(autoincrement())
  title       String
  price       Float
  createdAt   DateTime @default(now())
}
```

4. **تولید Prisma Client:**
```bash
npx prisma generate
```

5. **ایجاد migration:**
```bash
npx prisma migrate dev --name init
```

6. **ایجاد نمونه Prisma client (`lib/prisma.js`):**
```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma };
```

### پیاده‌سازی در پروژه ما

**Schema (`prisma/schema.prisma`):**
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

model CartItem {
  id        Int     @id @default(autoincrement())
  userId    String
  productId Int
  qty       Int     @default(1)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
}
```

**مثال استفاده:**
```javascript
import { prisma } from '@/lib/prisma';

// دریافت همه محصولات
const products = await prisma.product.findMany();

// دریافت یک محصول
const product = await prisma.product.findUnique({
  where: { id: 1 }
});

// ایجاد محصول
const newProduct = await prisma.product.create({
  data: {
    title: "iPhone 15",
    price: 999.99,
    category: "Phones"
  }
});

// به‌روزرسانی محصول
const updated = await prisma.product.update({
  where: { id: 1 },
  data: { price: 899.99 }
});

// حذف محصول
await prisma.product.delete({
  where: { id: 1 }
});
```

### دستورات رایج

```bash
# تولید Prisma Client
npx prisma generate

# ایجاد migration
npx prisma migrate dev --name migration_name

# اعمال migrations
npx prisma migrate deploy

# باز کردن Prisma Studio (رابط گرافیکی)
npx prisma studio

# ریست دیتابیس
npx prisma migrate reset
```

---

## 4. Clerk فارسی

### Clerk چیست؟
Clerk یک راه‌حل کامل احراز هویت با مدیریت کاربر، session و ورود با شبکه‌های اجتماعی است.

### نصب

```bash
npm install @clerk/nextjs
```

### مراحل راه‌اندازی

1. **ایجاد حساب Clerk:**
   - به [clerk.com](https://clerk.com) بروید
   - یک حساب رایگان بسازید
   - یک اپلیکیشن جدید ایجاد کنید

2. **دریافت API Keys:**
   - به بخش API Keys بروید
   - `Publishable Key` و `Secret Key` را کپی کنید

3. **افزودن به `.env`:**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

4. **پیچیدن app با ClerkProvider (`app/layout.js`):**
```javascript
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
```

5. **ایجاد صفحه ورود (`app/sign-in/[[...sign-in]]/page.jsx`):**
```javascript
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return <SignIn />;
}
```

6. **ایجاد صفحه ثبت‌نام (`app/sign-up/[[...sign-up]]/page.jsx`):**
```javascript
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return <SignUp />;
}
```

### پیاده‌سازی در پروژه ما

**کامپوننت احراز هویت (`components/custom/Auth/index.jsx`):**
```javascript
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Auth() {
  return (
    <div>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
```

**مسیر محافظت شده (`app/(private)/layout.jsx`):**
```javascript
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PrivateLayout({ children }) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  return <>{children}</>;
}
```

**دریافت کاربر در Server Component:**
```javascript
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();
  const user = await currentUser();
  
  return <div>سلام {user?.firstName}</div>;
}
```

**دریافت کاربر در Client Component:**
```javascript
"use client";
import { useUser, useAuth } from "@clerk/nextjs";

export default function Component() {
  const { user, isLoaded } = useUser();
  const { userId } = useAuth();
  
  if (!isLoaded) return <div>در حال بارگذاری...</div>;
  
  return <div>سلام {user?.firstName}</div>;
}
```

**احراز هویت در API Route (`app/api/cart/route.js`):**
```javascript
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // منطق شما اینجا
}
```

### راه‌اندازی داشبورد

1. **رفتن به Clerk Dashboard:**
   - به [dashboard.clerk.com](https://dashboard.clerk.com) بروید
   - اپلیکیشن خود را انتخاب کنید

2. **پیکربندی احراز هویت:**
   - به "User & Authentication" بروید
   - ایمیل/رمز عبور یا ورود با شبکه‌های اجتماعی را فعال کنید
   - قالب‌های ایمیل را پیکربندی کنید

3. **تنظیم نقش Admin:**
   - به "User & Authentication" > "Roles" بروید
   - نقش "admin" را ایجاد کنید
   - در بخش "Users" به کاربران اختصاص دهید

4. **بررسی Metadata کاربر:**
   - در بخش "Users"، یک کاربر را انتخاب کنید
   - به تب "Metadata" بروید
   - `isAdmin: true` را در private metadata اضافه کنید

**بررسی Admin در کد:**
```javascript
import { currentUser } from "@clerk/nextjs/server";

const user = await currentUser();
const isAdmin = user?.privateMetadata?.isAdmin;
```

---

## 5. Tailwind CSS فارسی

### Tailwind CSS چیست؟
Tailwind CSS یک فریمورک CSS utility-first برای توسعه سریع رابط کاربری است.

### نصب

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### مراحل راه‌اندازی

1. **پیکربندی `tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

2. **افزودن به `app/globals.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### پیاده‌سازی در پروژه ما

**رنگ‌های سفارشی:**
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: '#343A40',
      secondary: '#0056B3',
    }
  }
}
```

**مثال استفاده:**
```javascript
<div className="bg-slate-900 text-white px-6 py-3 rounded-2xl">
  دکمه
</div>
```

**طراحی واکنش‌گرا:**
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* محتوا */}
</div>
```

---

## 6. shadcn/ui فارسی

### shadcn/ui چیست؟
shadcn/ui مجموعه‌ای از کامپوننت‌های قابل استفاده مجدد ساخته شده با Radix UI و Tailwind CSS است.

### نصب

1. **مقداردهی اولیه shadcn/ui:**
```bash
npx shadcn@latest init
```

2. **پاسخ به سوالات:**
   - Style: New York
   - Base color: Neutral
   - CSS variables: Yes

3. **افزودن کامپوننت‌ها:**
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add skeleton
```

### مراحل راه‌اندازی

1. **کامپوننت‌ها به `components/ui/` اضافه می‌شوند**
2. **Import و استفاده:**
```javascript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Component() {
  return (
    <Card>
      <Button>کلیک کنید</Button>
    </Card>
  );
}
```

### پیاده‌سازی در پروژه ما

**کامپوننت‌های استفاده شده:**
- `button.jsx` - دکمه‌ها
- `card.jsx` - کارت‌ها
- `skeleton.jsx` - اسکلتون‌های بارگذاری
- `table.jsx` - جداول
- `sheet.jsx` - صفحات کناری
- `badge.jsx` - نشان‌ها

**مثال:**
```javascript
import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div>
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-6 w-3/4 mt-4" />
    </div>
  );
}
```

---

## 7. Cloudinary فارسی

### Cloudinary چیست؟
Cloudinary یک سرویس مدیریت تصویر و ویدیو مبتنی بر ابر است.

### نصب

```bash
npm install cloudinary
```

### مراحل راه‌اندازی

1. **ایجاد حساب Cloudinary:**
   - به [cloudinary.com](https://cloudinary.com) بروید
   - یک حساب رایگان بسازید
   - از داشبورد credentials دریافت کنید

2. **افزودن به `.env`:**
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. **پیکربندی در server action (`app/(private)/dashboard/actions.js`):**
```javascript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "nextjs_store_products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      )
      .end(buffer);
  });
}
```

### پیاده‌سازی در پروژه ما

**تابع آپلود:**
```javascript
export async function saveProduct(formData) {
  const imageFile = formData.get("imageFile");
  let imageUrl = "";

  if (imageFile) {
    const uploadedUrl = await uploadToCloudinary(imageFile);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }

  // ذخیره محصول با imageUrl
  await prisma.product.create({
    data: {
      title: formData.get("title"),
      img: imageUrl,
      // ... فیلدهای دیگر
    }
  });
}
```

**راه‌اندازی داشبورد:**
1. به [cloudinary.com/console](https://cloudinary.com/console) بروید
2. Cloud Name، API Key، API Secret را کپی کنید
3. به متغیرهای محیطی اضافه کنید
4. تصاویر به صورت خودکار بهینه و ذخیره می‌شوند

---

## 8. TanStack Query فارسی

### TanStack Query چیست؟
TanStack Query یک کتابخانه قدرتمند همگام‌سازی داده برای React است.

### نصب

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

### مراحل راه‌اندازی

1. **ایجاد Provider (`app/provider/ReactQuery.jsx`):**
```javascript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function ReactQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

2. **پیچیدن app در layout:**
```javascript
import ReactQueryProvider from "./provider/ReactQuery";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
```

### مثال پیاده‌سازی

```javascript
"use client";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      return res.json();
    }
  });

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error.message}</div>;

  return <div>{/* رندر محصولات */}</div>;
}
```

---

## 9. react-hot-toast فارسی

### react-hot-toast چیست؟
react-hot-toast یک کتابخانه سبک برای نمایش اعلان‌های toast است.

### نصب

```bash
npm install react-hot-toast
```

### مراحل راه‌اندازی

1. **افزودن Toaster به layout:**
```javascript
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
```

### مثال پیاده‌سازی

```javascript
import toast from 'react-hot-toast';

// Toast موفقیت
toast.success('محصول به سبد خرید اضافه شد!');

// Toast خطا
toast.error('مشکلی پیش آمد!');

// Toast بارگذاری
const toastId = toast.loading('در حال پردازش...');
// بعداً: toast.success('انجام شد!', { id: toastId });

// Toast سفارشی
toast('سلام دنیا', {
  icon: '👏',
  duration: 4000,
});
```

**در پروژه ما:**
```javascript
// app/(public)/cart/check/page.jsx
toast.success("سفارش با موفقیت ثبت شد!", {
  duration: 4000,
  position: "bottom-right",
});
```

---

## 10. Lucide React فارسی

### Lucide React چیست؟
Lucide یک کتابخانه آیکون زیبا با بیش از 1000 آیکون است.

### نصب

```bash
npm install lucide-react
```

### استفاده

```javascript
import { ShoppingBag, Star, Heart } from "lucide-react";

export default function Component() {
  return (
    <div>
      <ShoppingBag size={24} />
      <Star size={20} className="fill-yellow-400 text-yellow-400" />
      <Heart size={18} />
    </div>
  );
}
```

**در پروژه ما:**
- در سراسر پروژه برای آیکون‌ها استفاده شده
- ShoppingBag، Star، Tag و غیره

---

## 11. Embla Carousel فارسی

### Embla Carousel چیست؟
Embla Carousel یک کتابخانه سبک برای ساخت کاروسل با اسکرول نرم است.

### نصب

```bash
npm install embla-carousel-react
```

### مراحل راه‌اندازی

1. **ایجاد کامپوننت کاروسل (`components/ui/carousel.jsx`):**
```javascript
"use client";
import useEmblaCarousel from "embla-carousel-react";

export function Carousel({ children }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {children}
      </div>
    </div>
  );
}
```

### پیاده‌سازی در پروژه ما

**کاروسل بنر (`components/custom/banner/index.jsx`):**
```javascript
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Banner() {
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        <CarouselItem>
          <Image src={img1} alt="Banner 1" />
        </CarouselItem>
        <CarouselItem>
          <Image src={img2} alt="Banner 2" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
```

**ویژگی‌ها:**
- اسکرول نرم
- حالت حلقه
- دکمه‌های ناوبری
- پشتیبانی از کیبورد

---

## 12. Axios فارسی

### Axios چیست؟
Axios یک HTTP client مبتنی بر Promise برای انجام درخواست‌های API است.

### نصب

```bash
npm install axios
```

### مراحل راه‌اندازی

1. **ایجاد نمونه axios (اختیاری):**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### مثال استفاده

```javascript
import axios from 'axios';

// درخواست GET
const response = await axios.get('/api/products');
const products = response.data;

// درخواست POST
await axios.post('/api/cart', {
  productId: 1,
  quantity: 1
});

// با مدیریت خطا
try {
  const response = await axios.get('/api/products');
  console.log(response.data);
} catch (error) {
  console.error('خطا:', error.response?.data);
}
```

**نکته:** در پروژه ما، بیشتر از API `fetch` بومی استفاده می‌کنیم تا axios.

---

## 13. clsx & tailwind-merge فارسی

### این‌ها چیستند؟
- **clsx**: ابزار برای ساخت شرطی رشته‌های className
- **tailwind-merge**: ادغام هوشمند کلاس‌های Tailwind CSS

### نصب

```bash
npm install clsx tailwind-merge
```

### مراحل راه‌اندازی

1. **ایجاد تابع utility (`lib/utils.js`):**
```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

### مثال استفاده

```javascript
import { cn } from "@/lib/utils";

// کلاس‌های شرطی
<div className={cn(
  "base-class",
  isActive && "active-class",
  isDisabled && "disabled-class"
)}>

// ادغام کلاس‌های Tailwind (جلوگیری از تداخل)
<button className={cn(
  "px-4 py-2",
  "bg-blue-500",
  "bg-red-500" // این bg-blue-500 را override می‌کند
)}>
```

**در پروژه ما:**
- در تمام کامپوننت‌های shadcn/ui استفاده شده
- برای استایل‌دهی شرطی استفاده می‌شود
- از تداخل کلاس‌های Tailwind جلوگیری می‌کند

---

## 14. class-variance-authority فارسی

### CVA چیست؟
CVA یک کتابخانه برای ایجاد variantهای type-safe کامپوننت است.

### نصب

```bash
npm install class-variance-authority
```

### مراحل راه‌اندازی

1. **به صورت خودکار توسط کامپوننت‌های shadcn/ui استفاده می‌شود**

### مثال استفاده

```javascript
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "base-button-classes",
  {
    variants: {
      variant: {
        default: "bg-blue-500",
        destructive: "bg-red-500",
        outline: "border",
      },
      size: {
        sm: "px-2 py-1",
        md: "px-4 py-2",
        lg: "px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// استفاده
<button className={buttonVariants({ variant: "destructive", size: "lg" })}>
  کلیک کنید
</button>
```

**در پروژه ما:**
- در کامپوننت‌های shadcn/ui استفاده شده (Button، Badge و غیره)
- سیستم variant type-safe ارائه می‌دهد

---

<div align="center">

**ساخته شده با ❤️ برای Techno Shop**

⭐ اگر این راهنما مفید بود، به ریپازیتوری ستاره دهید!

</div>

