Here is your **complete, production-ready Figma AI prompt** with all changes integrated:

---

### 🎨 **Figma AI Master Prompt: CCTV Manager V1 - Dual-Role Field Service App**

**Project Overview:**
Design a modern, dual-role mobile app called **"CCTV Manager"** for CCTV installation businesses. The app has two distinct portals: **Vendor/Company Portal** and **Technician Portal**. Use a **Violet/Purple color palette** (based on the provided gradient: deep navy → dark purple → vibrant violet → soft lavender → pale lilac) with **Dark Mode as default** and Light Mode option. The UI must be minimal, professional, field-ready, with soft card UI, subtle glassmorphism, and large touch targets.

---

### 🎨 **Color Palette & Theme System**
**Primary Colors (Violet Spectrum):**
- **Deep Navy/Black:** `#0A0C10` (Dark mode background)
- **Dark Purple:** `#1E1B4B` (Card backgrounds)
- **Vibrant Violet:** `#7C3AED` (Primary buttons, active states)
- **Medium Purple:** `#8B5CF6` (Secondary elements, accents)
- **Soft Lavender:** `#A78BFA` (Highlights, icons)
- **Pale Lilac:** `#C4B5FD` (Text on dark, borders)
- **Light Mode Background:** `#F9FAFB`
- **Light Mode Cards:** `#FFFFFF`

**Status Colors:**
- Pending: `#F59E0B` (Amber)
- In Progress: `#3B82F6` (Blue)
- Completed: `#10B981` (Green)
- Paid: `#10B981` (Green)
- Unpaid/Pending Payment: `#EF4444` (Red)

**Theme Toggle:**
- Default: **Dark Mode**
- Include a theme switcher in Profile/Settings screen (Dark/Light/System)

---

### 🔐 **1. Auth & Onboarding Flow**

**Screen A: Login (First Screen - Default)**
- Clean dark layout with violet accents
- App logo (camera icon in violet gradient)
- Title: "CCTV Manager"
- Subtitle: "Smart business management for CCTV professionals"
- Badge: "V1 - Field Edition"
- **Input Fields:**
  - `Email or Phone` (with icon, rounded card)
  - `Password` (with lock icon, show/hide toggle)
- **Buttons/Links:**
  - `Log In` (primary button, vibrant violet gradient, full width)
  - `Forgot Password?` (text link, right-aligned)
  - `New user? Sign Up` (text link, centered below)
- **NO role selection here** - role is determined during registration

**Screen B: Create Account (Sign Up - Progressive Form)**
- Header: "Create Account" with subtitle "Join CCTV Manager" and back arrow
- Progress indicator: "Step 1 of 2"
- **Common Fields (All Users):**
  1. Full Name (required, with person icon)
  2. Phone Number (required, +91 country code, phone icon)
  3. Email Address (required, email icon)
  4. Password (required, lock icon, strength indicator: weak/medium/strong)
  5. Confirm Password (required)
- **Role Selection:**
  - Label: "I am a..."
  - Two large tappable cards:
    - **Vendor/Company Card** (violet accent when selected)
      - Icon: building/storefront
      - Title: "Vendor"
      - Subtitle: "Shop Owner / Manager"
      - Description: "Manage technicians, customers & billing"
    - **Technician Card** (indigo accent when selected)
      - Icon: hardhat/tools
      - Title: "Technician"
      - Subtitle: "Field Installer"
      - Description: "View jobs, log materials & update status"

**Conditional Fields - VENDOR:**
- Section Header: "Company Details" (expandable)
- Fields:
  6. Company/Business Name (required, building icon)
  7. Company Phone Number (required, phone icon)
  8. Company Email (required, primary business email)
  9. Additional Company Email (optional, secondary contact)
  10. Company Address/Location (required, map pin icon, full address with city, state, pincode)
  11. GST Number (optional, for billing)
  12. Company Logo Upload (circular upload area with camera icon, "Upload logo" text)
  13. Business License/Registration Number (optional)
- **Company Code Generator Section:**
  - Label: "Your Unique Company Code"
  - Helper text: "This code will be shared with technicians to link them to your company"
  - Input field with hashtag icon (#)
  - Placeholder: "e.g., CCTV001 or your brand name"
  - **Real-time Availability Checker:**
    - ✅ Green checkmark: "Available! This code is unique"
    - ❌ Red X: "This code is taken. Try: [suggested alternatives]"
  - Button: "Generate Unique Code" (creates format: BRAND+CITY+NUMBERS)
  - Character limit: 6-12 characters, alphanumeric only
  - Info tooltip: "Technicians will use this code to register under your company"

**Conditional Fields - TECHNICIAN:**
- Section Header: "Link to Company"
- Fields:
  6. Company Code (required, hashtag icon #)
     - Placeholder: "Enter code provided by your company"
     - Helper text: "Ask your vendor/company for their unique code"
     - Demo code display: "Demo code: CCTV001"
     - **Validation on input:**
       - ✅ "Connected to: [Company Name]" with company logo preview
       - ❌ "Company code not found. Please check with your vendor."
     - Search/verify button to validate code
  7. Technician Specialization (optional, dropdown or chips: Installation, Maintenance, Repair, All Services)
  8. Years of Experience (optional, dropdown: 0-1 years, 1-3 years, 3-5 years, 5+ years)

**Final Actions:**
- Checkbox: "I agree to Terms of Service and Privacy Policy" (required)
- Primary button: "Create Account" (violet gradient, full width, disabled until all required fields filled)
- Footer: "Already have an account? Sign In" link

---

### 🧭 **2. Unified Header & Navigation (Both Portals)**

**Top Header Bar:**
- **Left Side:** Circular profile picture (40px diameter, tappable) + User Name text (e.g., "Arun Kumar")
- **Right Side:** "ONLINE" status badge (blue pill, small dot + text) + "Logout" button (icon + text)
- **Interaction:** Tapping the profile picture navigates to **Edit Profile / Details** screen
- **Consistency:** Exact same header structure for both Vendor and Technician portals

**Bottom Navigation Bar:**
- **Vendor Tabs (5 items):**
  - Home (house icon)
  - Customers (people icon)
  - Works (camera icon)
  - Expenses (calculator icon)
  - Bills (document icon)
- **Technician Tabs (4 items):**
  - Home (house icon)
  - My Jobs (briefcase icon)
  - Log (clipboard icon)
  - Bills (document icon)
- **Note:** NO Profile tab in bottom nav for either portal - profile access is unified in the top header

---

### 🏢 **3. Vendor Portal Screens**

**Vendor Dashboard:**
- Header: Unified format (circular profile pic + name, ONLINE badge, Logout)
- Welcome Section: "Welcome, [Name] 👋" (no changes needed)
- **Stats Overview (3 Cards):**
  - Card 1: "Customers" (count + icon, violet accent) → **Tapping navigates to Customers tab**
  - Card 2: "Pending" (count + clock icon, amber accent) → **Tapping navigates to Works tab**
  - Card 3: "Earnings This Month" (₹ amount + rupee icon, green accent) → **Tapping navigates to Bills tab**
- **Team Overview Card:**
  - Title: "Your Team"
  - Subtitle: "X technicians · Y active today"
  - Right arrow (→)
  - **Interaction: Tapping navigates to new "Team Management" screen**
- **Quick Actions Section:**
  - Label: "QUICK ACTIONS"
  - Button 1: "Add Customer" (bright violet, + icon, large)
  - Button 2: "Create Work" (dark card, camera icon)
- **Recent Works Section:**
  - Header: "RECENT WORKS" with "See all >" link
  - Work cards with: Customer name, work type, assigned technician, status badge (Pending/In Progress/Completed)

**Team Management Screen (NEW):**
- Header: "Team Management" with back arrow
- Search bar: "Search technicians..."
- **Technician List Cards:**
  - Circular avatar, name, phone number
  - Status indicator: Online/Offline (green/gray dot)
  - Active jobs count
  - **Permission Toggles:**
    - "Expense Logging" (toggle switch: Enable/Disable)
    - "Bill Generation" (toggle switch: Enable/Disable)
  - Visual feedback: Enabled = green, Disabled = gray
- Action button: "Add Technician" (FAB, bottom right)

**Customers Screen:**
- Header: "Customers" with total count
- Search bar: "Search customers..."
- Customer cards with: Avatar (initial), name, status badge (Active/Pending/Maintenance), phone, address, camera count
- FAB: "Add Customer" (bottom right, violet)

**Add Customer Screen:**
- Header: "Add Customer" with back arrow
- Form fields:
  - Customer Name (required)
  - Phone Number (required, +91)
  - Site Address (required)
  - Site Details (e.g., "8 cameras, 1 DVR, 500m cable")
  - Notes (optional)
- Button: "Save Customer" (violet gradient, full width)

**Work Orders Screen:**
- Header: "Work Orders" with filter pills (All/Pending/In Progress/Completed)
- Work cards with: Customer name, work type, deadline, assigned technician, status badge
- FAB: "Create Work" (bottom right, violet)

**Create Work Order Modal:**
- Title: "Create Work Order"
- Fields:
  - Customer (searchable dropdown)
  - Work Type (e.g., "Camera Installation")
  - Deadline (date picker)
  - No. of Cameras (number input)
  - Assign Technician (dropdown with availability)
- Button: "Create Work Order" (violet gradient)

**Expense Calculator Screen:**
- Header: "Expense Calculator" with subtitle "Estimate job cost"
- Components section: List of items (name, qty, price, auto-total per item)
- "Add Item" button
- Labor Charge section: Input field for labor & miscellaneous
- Cost Summary card: Components total + Labor total = Grand Total (violet gradient card)
- Button: "Generate Bill" (violet gradient, full width)

**Billing Screen:**
- Header: "Billing" with invoice count
- Summary cards: Total Billed, Pending, Paid (with amounts)
- Recent Invoices list: Customer name, invoice number, date, items count, amount, status badge (Paid/Pending)
- FAB: "Create Invoice" (bottom right, violet)

---

### 👷 **4. Technician Portal Screens**

**Technician Dashboard:**
- Header: Unified format (circular profile pic + name, ONLINE badge, Logout)
- Welcome: "Hi, [Name] 👷"
- Stats cards: "My Jobs", "Today", "Hours Logged"
- **Access Permissions Badge:**
  - "Expense Log: Enabled" (green badge) or "Ask vendor to enable" (gray/locked)
  - "Billing: Disabled" (gray badge) or "Enabled" (green)
- **My Assigned Jobs Section:**
  - Job cards with: Customer name, work type, location, status, hours logged
  - Interaction: Tapping opens Job Detail screen

**Job Detail & Logging Screen:**
- Header: Customer name, work type, status badge
- Job info: Location, camera count, deadline
- **Update Status Section:**
  - Segmented control: "Pending" → "In Progress" → "Done"
- **Hours Worked Section:**
  - Label: "Total hours on site"
  - Input: Numeric field (e.g., "2.5 hours")
- **Materials Used Section:**
  - "Add Item" button (only if Expense Logging permission enabled)
  - List of items: Item name, qty, price, auto-total
  - Materials Total card
  - If permission disabled: Show locked state with "Ask vendor to enable" message
- **Site Notes Section:**
  - Textarea: "Any observations, issues, or instructions from the site..."
- Button: "Save Progress" (violet gradient, full width)

**Technician Profile/Edit Screen:**
- Large circular avatar (100px) with initial
- Name, role badge ("Field Technician")
- **Access Permissions Card:**
  - "Expense Logging: Enabled/Disabled"
  - "Bill Generation: Enabled/Disabled"
- **Theme Toggle:**
  - Label: "Appearance"
  - Options: Dark/Light/System (toggle or dropdown)
- Button: "Logout" (red/dark gradient, full width)

---

### 🎨 **5. UI/UX & Figma Implementation Guidelines**

**Design System:**
- **Backgrounds:** Dark mode (`#0A0C10`), Light mode (`#F9FAFB`)
- **Cards:** Dark (`#1E1B4B` with `#FFFFFF08` stroke), Light (`#FFFFFF` with `#E5E7EB` stroke)
- **Primary Accent:** Violet spectrum (`#7C3AED` for buttons, `#8B5CF6` for secondary)
- **Typography:** Clean sans-serif (Inter or SF Pro)
  - H1: 24px Bold
  - H2: 20px SemiBold
  - Body: 16px Regular
  - Caption: 12px Medium
- **Spacing:** 16px horizontal padding, 12px vertical inside cards
- **Border Radius:** 16px for cards, 12px for buttons, 50% for circular avatars
- **Touch Targets:** Minimum 48px height

**Component Variants:**
- Buttons: Default/Hover/Pressed/Disabled states
- Status Badges: Pending/In Progress/Completed/Paid variants
- Input Fields: Default/Focused/Error/Disabled states
- Toggle Switches: On/Off states with violet accent

**Auto-Layout & Constraints:**
- Use Auto Layout for all cards, lists, and sections
- Set responsive constraints for mobile (390x844 frame)
- Create component libraries for reuse

**Prototype Interactions:**
- Login → Dashboard (role-based routing)
- Stats Cards → Respective tabs (Customers → Customers tab, etc.)
- Team Overview Card → Team Management screen
- Profile Picture → Edit Profile screen
- Job Card → Job Detail & Logging screen
- Permission Toggles → Visual state changes
- Theme Toggle → Dark/Light mode switch

**Generate all screens with:**
- Consistent violet/purple color scheme
- Dark mode as default (include light mode variants)
- Proper auto-layout structures
- Component variants for all interactive elements
- Clickable prototype flows matching the workflow above
- Global color and text styles set up

---

### ✅ **Ready to Generate!**

Copy this entire prompt and paste it into Figma AI. It will create a complete, production-ready dual-role CCTV management app with all your requested features, unified navigation, violet color palette, and dark/light mode support! 🚀