# UserProfile Component System

A comprehensive, responsive user profile button system built for the Discovery5 project using Better Auth.

## 🚀 Features

- **Dynamic States**: Handles loading, authenticated, and unauthenticated states
- **Responsive Design**: Adapts to mobile and desktop viewports
- **Accessible**: Full keyboard navigation and screen reader support
- **Customizable**: Multiple size variants and positioning options
- **Toast Notifications**: Integrated feedback for user actions
- **Type Safe**: Full TypeScript support with proper interfaces

## 📦 Components

### 1. `UserProfile` (Main Component)

The primary component that orchestrates the entire user profile system.

**Props:**

```typescript
interface UserProfileProps {
	size?: "sm" | "md" | "lg" // Button size
	align?: "start" | "center" | "end" // Dropdown alignment
	side?: "top" | "right" | "bottom" | "left" // Dropdown side
	className?: string // Custom styling
	showSignInButton?: boolean // Show sign-in when not authenticated
	signInUrl?: string // Custom sign-in URL
}
```

### 2. `UserProfileDropdown`

The dropdown menu containing user information and actions.

### 3. `UserProfileSkeleton`

Loading state component with size variants.

### 4. `useUserProfile` Hook

Custom hook managing all user profile logic and state.

## 🎯 Usage Examples

### Basic Usage (Navbar)

```tsx
import { UserProfile } from "@/components/UserProfile"

export function Navbar() {
	return (
		<nav>
			<UserProfile />
		</nav>
	)
}
```

### Mobile Responsive

```tsx
import { UserProfile } from "@/components/UserProfile"
import { useIsMobile } from "@/hooks/use-mobile"

export function ResponsiveNav() {
	const isMobile = useIsMobile()

	return (
		<UserProfile
			size={isMobile ? "sm" : "md"}
			align="end"
		/>
	)
}
```

### Custom Positioning

```tsx
<UserProfile
	size="lg"
	align="start"
	side="top"
	className="custom-class"
/>
```

### Hide Sign-in Button

```tsx
<UserProfile showSignInButton={false} />
```

### Advanced Hook Usage

```tsx
import { useUserProfile } from "@/components/UserProfile"

export function CustomComponent() {
	const { user, isAuthenticated, isLoading, handleSignOut } = useUserProfile()

	if (isLoading) return <div>Loading...</div>

	return (
		<div>
			{isAuthenticated ? <p>Welcome, {user.name}!</p> : <p>Please sign in</p>}
		</div>
	)
}
```

## 🎨 Component States

### 1. Loading State

- Shows `UserProfileSkeleton` with animated pulse
- Respects size prop for consistent UI

### 2. Unauthenticated State

- Shows "Sign in" button with user icon
- Responsive text (hidden on mobile)
- Links to configurable sign-in URL

### 3. Authenticated State

- User avatar with fallback to initials
- Dropdown with user info and actions
- Email verification indicator
- Loading states for sign-out action

## 🔧 Integration Points

### Auth Integration

- Uses Better Auth's `useSession` hook
- Handles sign-out with proper error handling
- Toast notifications for user feedback

### Routing Integration

- Navigation to profile management
- Settings page routing
- Configurable sign-in redirect

### Theme Integration

- Uses design system tokens
- Supports light/dark themes
- Consistent with existing UI patterns

## 🎯 Future Enhancements

1. **Profile Management Pages**

   - `/profile` - User profile editing
   - `/settings` - User preferences

2. **Additional Actions**

   - Account deletion
   - Email verification
   - Password management

3. **Enhanced Features**
   - User role indicators
   - Notification badges
   - Quick actions menu

## 🔒 Security Considerations

- Proper session management
- Secure sign-out flow
- CSRF protection through Better Auth
- Input validation on all user actions

## 📱 Responsive Behavior

- **Mobile (< 640px)**: Compact size, icon-only sign-in
- **Tablet (640px - 1024px)**: Medium size with text
- **Desktop (> 1024px)**: Full size with all features

## 🎨 Styling

The components use Tailwind CSS with your design system:

- Surface containers for backgrounds
- Primary colors for interactive elements
- Muted colors for secondary text
- Consistent spacing and typography

## 🧪 Testing Considerations

When testing, consider these scenarios:

- Loading states
- Network errors during sign-out
- Different user data (with/without avatar)
- Various viewport sizes
- Keyboard navigation
- Screen reader compatibility
