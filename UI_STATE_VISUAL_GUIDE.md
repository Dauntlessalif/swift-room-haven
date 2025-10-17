# 🎨 UI State Guide - Logged In vs Logged Out

## Quick Visual Reference

---

## 👥 Navigation Bar States

### State 1: User NOT Logged In

```
╔══════════════════════════════════════════════════════╗
║  🏨 Swift Room Haven                                 ║
║                                                      ║
║  Home    Rooms    About    Contact    Pet Care      ║
║                                                      ║
║                          [Sign In]    [Sign Up] →   ║
╚══════════════════════════════════════════════════════╝
```

**What Shows:**
- ✅ Sign In button (ghost style, transparent)
- ✅ Sign Up button (white background, prominent)
- ❌ No user avatar
- ❌ No dropdown menu

---

### State 2: User IS Logged In

```
╔══════════════════════════════════════════════════════╗
║  🏨 Swift Room Haven                                 ║
║                                                      ║
║  Home    Rooms    About    Contact    Pet Care      ║
║                                                      ║
║                                             👤  →    ║
╚══════════════════════════════════════════════════════╝
```

**What Shows:**
- ✅ User avatar (circular, gradient)
- ✅ Clickable dropdown menu
- ❌ No Sign In button
- ❌ No Sign Up button

---

## 👤 Avatar Variations

### Regular Customer Avatar

```
     ┌──────┐
     │      │
     │  👤  │  ← Blue-to-purple gradient
     │      │     User icon
     └──────┘
```

**Code:**
```typescript
<User className="h-5 w-5" />
```

---

### Admin User Avatar

```
     ┌──────┐
     │      │
     │  🛡️  │  ← Blue-to-purple gradient
     │      │     Shield icon
     └──────┘
```

**Code:**
```typescript
<Shield className="h-5 w-5" />
```

---

## 📋 Dropdown Menu Contents

### Regular Customer Menu

```
┌─────────────────────────────────┐
│  John Customer                  │  ← Name from session
│  customer@demo.com              │  ← Email from session
├─────────────────────────────────┤
│  👤  My Account                 │  → /customer
│  📅  My Bookings                │  → /customer
│  ⚙️   Settings                  │  → /customer
├─────────────────────────────────┤
│  🚪  Sign Out                   │  → Logout & go to /
└─────────────────────────────────┘
```

**Menu Items:** 4 options

---

### Admin User Menu

```
┌─────────────────────────────────┐
│  Admin User                     │  ← Name from session
│  admin@swiftroomhaven.com       │  ← Email from session
│  Admin                          │  ← Special badge
├─────────────────────────────────┤
│  👤  My Account                 │  → /customer
│  📅  My Bookings                │  → /customer
│  🛡️   Admin Panel               │  → /admin (extra!)
│  ⚙️   Settings                  │  → /customer
├─────────────────────────────────┤
│  🚪  Sign Out                   │  → Logout & go to /
└─────────────────────────────────┘
```

**Menu Items:** 5 options (Admin Panel added)

---

## 🔄 Dynamic Switching

### Login Transition

```
BEFORE LOGIN:
┌────────────────────────────┐
│ [Sign In]    [Sign Up] →  │
└────────────────────────────┘

        ⬇ User signs in
        
AFTER LOGIN:
┌────────────────────────────┐
│                       👤 → │
└────────────────────────────┘
```

**Happens automatically:**
- ✅ Buttons disappear
- ✅ Avatar appears
- ✅ No page refresh needed
- ✅ Instant update

---

### Logout Transition

```
BEFORE LOGOUT:
┌────────────────────────────┐
│                       👤 → │
└────────────────────────────┘

        ⬇ User signs out
        
AFTER LOGOUT:
┌────────────────────────────┐
│ [Sign In]    [Sign Up] →  │
└────────────────────────────┘
```

**Happens automatically:**
- ✅ Avatar disappears
- ✅ Buttons reappear
- ✅ Redirected to home
- ✅ Session cleared

---

## 📱 Mobile View

### Not Logged In (Mobile)

```
┌──────────────────┐
│ 🏨 SRH      ☰   │
└──────────────────┘

Hamburger Menu:
┌──────────────────┐
│ Home             │
│ Rooms            │
│ About            │
│ Contact          │
│ Pet Care         │
├──────────────────┤
│ [Sign In]        │
│ [Sign Up]        │
└──────────────────┘
```

---

### Logged In (Mobile)

```
┌──────────────────┐
│ 🏨 SRH   👤  ☰  │ ← Avatar shows
└──────────────────┘

Avatar Tap:
┌──────────────────┐
│ John Customer    │
│ customer@...     │
├──────────────────┤
│ 👤 My Account    │
│ 📅 My Bookings   │
│ ⚙️  Settings     │
│ 🚪 Sign Out      │
└──────────────────┘

Hamburger Menu:
┌──────────────────┐
│ Home             │
│ Rooms            │
│ About            │
│ Contact          │
│ Pet Care         │
└──────────────────┘
```

---

## 🎯 Booking Flow States

### Logged Out User Tries to Book

```
┌─────────────────────────────┐
│ User clicks "Reserve Now"   │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ ❌ BLOCKED                  │
│                             │
│ [Sign In Required Toast]    │
│                             │
│ 🔐 Auth Modal Opens         │
└─────────────────────────────┘

Navigation Still Shows:
┌────────────────────────────┐
│ [Sign In]    [Sign Up] →  │
└────────────────────────────┘
```

---

### Logged In User Books

```
┌─────────────────────────────┐
│ User clicks "Reserve Now"   │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ ✅ ALLOWED                  │
│                             │
│ Reservation Modal Opens     │
│ Info Auto-filled            │
└─────────────────────────────┘

Navigation Still Shows:
┌────────────────────────────┐
│                       👤 → │
└────────────────────────────┘
```

---

## 🔐 Session Indicator

### Active Session (Logged In)

```
Navigation:     Storage:           Backend:
┌─────────┐     ┌──────────┐      ┌─────────┐
│   👤    │ ←→  │ Session  │  ←→  │ Active  │
│         │     │ Token    │      │ Session │
└─────────┘     └──────────┘      └─────────┘

User can:
✅ Book rooms
✅ View bookings
✅ Update profile
✅ Access protected pages
```

---

### No Session (Logged Out)

```
Navigation:     Storage:           Backend:
┌─────────┐     ┌──────────┐      ┌─────────┐
│Sign In  │     │  Empty   │      │   No    │
│Sign Up  │     │          │      │ Session │
└─────────┘     └──────────┘      └─────────┘

User can:
✅ Browse public pages
✅ View room listings
❌ Cannot book
❌ Cannot access profile
❌ Cannot see bookings
```

---

## 🎨 Color & Style Guide

### Sign In Button (Logged Out)
```css
variant="ghost"
className="text-white hover:text-white hover:bg-white/20"
```

**Appearance:**
- Transparent background
- White text
- Subtle hover effect

---

### Sign Up Button (Logged Out)
```css
className="bg-white text-blue-600 hover:bg-blue-50"
```

**Appearance:**
- White background
- Blue text
- Prominent, stands out

---

### User Avatar (Logged In)
```css
className="rounded-full bg-gradient-to-br from-blue-500 to-purple-600"
```

**Appearance:**
- Circular shape
- Gradient: Blue → Purple
- Icon: User or Shield
- Size: 40x40px

---

## ✅ Quick Check

### How to Know If User is Logged In

```
Look at Navigation Bar:

See [Sign In] [Sign Up]?
   → NOT logged in
   → Cannot book rooms

See 👤 avatar?
   → IS logged in
   → Can book rooms
```

---

## 🧪 Visual Testing Checklist

### Test Logged Out State
- [ ] Navigate to home page
- [ ] ✅ See [Sign In] and [Sign Up] buttons
- [ ] ✅ No avatar visible
- [ ] Try to book a room
- [ ] ✅ Auth modal opens
- [ ] ✅ Cannot proceed to booking

### Test Logged In State
- [ ] Sign in with customer credentials
- [ ] ✅ Buttons disappear
- [ ] ✅ Avatar appears (blue-purple gradient)
- [ ] ✅ Click avatar opens dropdown
- [ ] ✅ See name and email in dropdown
- [ ] Try to book a room
- [ ] ✅ Booking modal opens immediately
- [ ] ✅ Info is auto-filled

### Test Admin State
- [ ] Sign in with admin credentials
- [ ] ✅ Shield icon in avatar (not regular user icon)
- [ ] ✅ "Admin" badge in dropdown
- [ ] ✅ "Admin Panel" option in menu
- [ ] ✅ Can access /admin page

### Test Transitions
- [ ] Sign in
- [ ] ✅ Watch buttons → avatar transition (instant)
- [ ] Refresh page
- [ ] ✅ Avatar persists (session saved)
- [ ] Sign out
- [ ] ✅ Watch avatar → buttons transition (instant)
- [ ] ✅ Redirected to home page

---

## 📊 State Summary

| User State | Navigation UI | Can Book? | Special Features |
|-----------|---------------|-----------|------------------|
| **Logged Out** | [Sign In] [Sign Up] | ❌ No | Must authenticate first |
| **Customer** | 👤 (User icon) | ✅ Yes | Auto-fill info, view bookings |
| **Admin** | 👤 (Shield icon) | ✅ Yes | Admin panel access, special badge |

---

**Guide Version:** 1.0.0  
**Status:** ✅ Complete  
**Last Updated:** October 17, 2025
