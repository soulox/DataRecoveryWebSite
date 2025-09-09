# Code Style Guidelines - OISDRIVE Website

## Project Overview

**EXPERT EN RÉCUPÉRATION DE DONNÉES**

OISDRIVE assures data recovery, sensitive data processing, and large-scale data management. This document defines coding standards and style guidelines for the OISDRIVE website, ensuring consistency and maintainability across the codebase.

### Technical Stack
- **Platform**: Web
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Deployment**: Vercel

## 1. File Organization

### Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Route groups
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
├── lib/                  # Utility functions
│   ├── utils.ts          # General utilities
│   ├── validations.ts    # Form validations
│   └── constants.ts      # App constants
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── styles/               # Additional styles
└── public/               # Static assets
```

### File Naming Conventions
- **Components**: PascalCase (`ContactForm.tsx`, `HeroSection.tsx`)
- **Pages**: lowercase with hyphens (`about-us/page.tsx`)
- **Utilities**: camelCase (`formatDate.ts`, `validateEmail.ts`)
- **Types**: PascalCase with `.types.ts` suffix (`User.types.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- **Hooks**: camelCase with `use` prefix (`useContactForm.ts`)

### Import/Export Patterns
```typescript
// Preferred import order
import React from 'react'
import { NextPage } from 'next'
import { Button } from '@/components/ui/button'
import { ContactForm } from '@/components/forms/ContactForm'
import { formatDate } from '@/lib/utils'
import type { ContactData } from '@/types/Contact.types'

// Named exports preferred
export const ContactPage: NextPage = () => {
  // Component implementation
}

// Default exports only for pages and layouts
export default ContactPage
```

## 2. Code Formatting

### Indentation and Spacing
- **Indentation**: 2 spaces (no tabs)
- **Line Length**: 100 characters maximum
- **Trailing Commas**: Always use in objects and arrays
- **Semicolons**: Always use
- **Quotes**: Single quotes for strings, double quotes for JSX attributes

### Example Formatting
```typescript
// Good
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    notifications: true,
  },
}

// Bad
const userData = {
  name: "John Doe",
  email: "john@example.com"
  preferences:{
    theme:"dark"
    notifications:true
  }
}
```

### Comments Formatting
```typescript
// Single line comment
const API_URL = 'https://api.example.com'

/**
 * Multi-line comment for complex logic
 * @param data - The data to process
 * @returns Processed data
 */
const processData = (data: unknown) => {
  // Implementation
}
```

## 3. Naming Conventions

### Variables and Functions
```typescript
// camelCase for variables and functions
const userName = 'john'
const isLoggedIn = true
const handleSubmit = () => {}

// PascalCase for components and classes
const ContactForm = () => {}
class DataProcessor {}

// UPPER_SNAKE_CASE for constants
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_ATTEMPTS = 3
```

### TypeScript Types
```typescript
// PascalCase for interfaces
interface UserData {
  id: string
  name: string
  email: string
}

// PascalCase for type aliases
type ContactStatus = 'pending' | 'completed' | 'failed'

// PascalCase for enums
enum ServiceType {
  DATA_RECOVERY = 'data_recovery',
  SENSITIVE_PROCESSING = 'sensitive_processing',
}
```

## 4. TypeScript Guidelines

### Type Annotations
```typescript
// Always use explicit return types for functions
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// Use interfaces for object shapes
interface ContactFormData {
  name: string
  email: string
  message: string
  serviceType?: ServiceType
}

// Use type aliases for unions and primitives
type Status = 'loading' | 'success' | 'error'
type ID = string | number
```

### Interface vs Type Aliases
```typescript
// Use interfaces for object shapes that might be extended
interface BaseUser {
  id: string
  name: string
}

interface AdminUser extends BaseUser {
  permissions: string[]
}

// Use type aliases for unions, primitives, and computed types
type UserRole = 'admin' | 'user' | 'guest'
type UserWithRole = BaseUser & { role: UserRole }
```

### Error Handling
```typescript
// Use Result pattern for error handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E }

const fetchUserData = async (id: string): Promise<Result<UserData>> => {
  try {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) {
      return { success: false, error: new Error('Failed to fetch user') }
    }
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}
```

## 5. Component Guidelines

### Component Structure
```typescript
import React from 'react'
import { Button } from '@/components/ui/button'
import type { ContactFormProps } from './ContactForm.types'

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void
  isLoading?: boolean
  className?: string
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  isLoading = false,
  className,
}) => {
  // Hooks
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })

  // Event handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  // Render
  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Form content */}
    </form>
  )
}
```

### Props Interface Definitions
```typescript
// Always define props interfaces
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

// Use default props with destructuring
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  className,
}) => {
  // Component implementation
}
```

### Custom Hooks
```typescript
// Custom hooks should start with 'use'
export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      await submitContactForm(data)
      setFormData({})
    } catch (error) {
      setErrors({ submit: 'Failed to submit form' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    setFormData,
    isSubmitting,
    errors,
    handleSubmit,
  }
}
```

## 6. Documentation Standards

### JSDoc Requirements
```typescript
/**
 * Validates email address format
 * @param email - The email address to validate
 * @returns True if email is valid, false otherwise
 * @example
 * ```typescript
 * const isValid = validateEmail('user@example.com')
 * console.log(isValid) // true
 * ```
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
```

### Component Documentation
```typescript
/**
 * ContactForm component for handling user inquiries
 * 
 * @example
 * ```tsx
 * <ContactForm
 *   onSubmit={(data) => console.log(data)}
 *   isLoading={false}
 * />
 * ```
 */
export const ContactForm: React.FC<ContactFormProps> = ({ ... }) => {
  // Implementation
}
```

## 7. Testing Standards

### Test File Organization
```
__tests__/
├── components/
│   ├── ContactForm.test.tsx
│   └── HeroSection.test.tsx
├── hooks/
│   └── useContactForm.test.ts
├── lib/
│   └── utils.test.ts
└── pages/
    └── contact.test.tsx
```

### Test Structure (Arrange-Act-Assert)
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { ContactForm } from '@/components/forms/ContactForm'

describe('ContactForm', () => {
  it('should submit form with valid data', async () => {
    // Arrange
    const mockOnSubmit = jest.fn()
    render(<ContactForm onSubmit={mockOnSubmit} />)
    
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })

    // Act
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.click(submitButton)

    // Assert
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
    })
  })
})
```

## 8. Performance Guidelines

### Code Splitting
```typescript
// Use dynamic imports for large components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
})
```

### Bundle Optimization
```typescript
// Use barrel exports sparingly
// Good: Direct imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Avoid: Barrel exports that import everything
import { Button, Input } from '@/components/ui'
```

### State Management
```typescript
// Use React Query for server state
import { useQuery } from '@tanstack/react-query'

const useContactData = () => {
  return useQuery({
    queryKey: ['contact-data'],
    queryFn: fetchContactData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

## 9. Security Guidelines

### Data Validation
```typescript
import { z } from 'zod'

// Define schemas for all user inputs
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// Validate before processing
const validateContactForm = (data: unknown) => {
  return contactFormSchema.safeParse(data)
}
```

### Environment Variables
```typescript
// Use environment variables for sensitive data
const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  contactEmail: process.env.CONTACT_EMAIL,
  recaptchaKey: process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
}

// Validate required environment variables
if (!config.apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is required')
}
```

## 10. Development Workflow

### Git Workflow
```bash
# Branch naming
feature/contact-form
bugfix/form-validation
hotfix/security-patch
chore/update-dependencies

# Commit message format
feat: add contact form with validation
fix: resolve form submission error
docs: update API documentation
style: format code with prettier
refactor: extract form validation logic
test: add unit tests for contact form
```

### Pull Request Requirements
- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] TypeScript errors resolved
- [ ] Accessibility requirements met

## Enforcement and Tools

### ESLint Configuration
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Best Practices Summary

### Code Quality
- Keep functions small and focused (max 20 lines)
- Use meaningful variable and function names
- Write self-documenting code
- Handle errors appropriately
- Follow DRY principles

### Performance
- Implement code splitting for large components
- Use React.memo for expensive components
- Optimize images with Next.js Image component
- Implement proper caching strategies
- Monitor bundle size

### Maintainability
- Write comprehensive tests
- Document complex logic
- Use consistent patterns
- Keep dependencies updated
- Follow SOLID principles

### Collaboration
- Write clear commit messages
- Review code thoroughly
- Document breaking changes
- Share knowledge through documentation
- Maintain consistent coding standards

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Next Review**: [Date + 6 months]  
**Maintainer**: Development Team Lead
