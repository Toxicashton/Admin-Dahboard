
# Review Admin Template

A modern, responsive **admin dashboard template** built for reviewing and managing **ESG (Environmental, Social, and Governance) claims**.  
This project leverages **React, Vite, and SCSS** to deliver a clean, component-based architecture with dynamic routing and theming capabilities.

---

## 🚀 Quick Start

Clone the repository:
```bash
git clone https://github.com/Toxicashton/Admin-Dashboard.git
cd Admin-Dashboard
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open in browser:  
Navigate to [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## 🛠️ Tech Stack

- **Framework:** React (bootstrapped with Vite)  
- **Styling:** SCSS (Sass) for modular and scalable styles  
- **Routing:** React Router DOM v6 for client-side navigation  
- **Icons:** React Icons (Bootstrap Icons set)  
- **State Management:**  
  - Context API → Global UI state (e.g., `LayoutContext` for dynamic TopBar titles)  
  - Local State → Component-specific logic (forms, toggles, etc.)  

---

## 📂 Project Structure

The codebase follows a **feature-based organization strategy**:

```
/src
├── assets/             # Static assets (images, global styles)
│   ├── images/         # Logos, icons, SVGs
│   └── styles/         # Global SCSS (_variables, _common, global.scss)
│
├── components/         # Reusable UI building blocks
│   ├── ui/             # Generic components (Modal, Drawer, Pagination, TagInput)
│   └── features/       # Business-specific components (UserForm, PromptForm)
│
├── contexts/           # React Context Providers (LayoutContext)
├── hooks/              # Custom Hooks (useModal)
├── layout/             # App Shell (Sidebar, TopBar, MainLayout)
├── pages/              # Top-level route components (Dashboard, ManageUsers, etc.)
└── App.jsx             # Main Router configuration
```

---

## 🔑 Key Features & Pages

### 1. Dashboard
- Central hub for viewing ESG requests  
- Searchable data table, pagination, quick actions (edit, delete)  
- Advanced filtering via slide-out `<Drawer>`  

### 2. Create New Request
- Multi-step form for submitting claims  
- Tabbed interface (Business, Zone, Market)  
- Drag-and-drop file upload  
- Conditional rendering for AI prompts with "Exclude" toggle  

### 3. Edit Request Details
- Dynamic detail view (`/dashboard/:requestId`)  
- Breadcrumb navigation in TopBar  
- Editable forms alongside read-only data  

### 4. Manage Users
- User table with custom toggle switch (active/inactive)  
- "Add User" modal with `<UserForm>`  
- Sticky table headers with custom styling  

### 5. Manage Documents
- Repository for uploaded documents  
- Metadata display (Type, Zone, Date, Language)  
- Upload page + standard table actions  

### 6. Upload Document
- Split layout: description + metadata inputs  
- Components: `<LanguageSelector>`, `<TagInput>`  
- Drag-and-drop drop zone  

### 7. Prompt Library
- AI prompt library with category filters + search  
- "Add Prompt" modal using `<PromptForm>`  

### 8. Chat with Document
- AI chat interface linked to documents  
- Responsive flexbox layout for full-screen fit  

### 9. Manage Tags
- Interface for system tags  
- Flexbox layout for equal height sections  
- Add tags via Enter key, remove via X button  

---

## 🎨 Theming & Customization

The application uses **CSS Variables** (`src/assets/styles/_variables.scss`) for easy theming.  
Update these values to customize the look and feel:

- `--color-primary`: Main action color (buttons, links)  
- `--sidebar-bg`: Sidebar background (supports gradients)  
- `--topbar-text`: Header text color  
- `--border-color`: Global border styling  

---

## 🤝 Contribution

1. Fork the repository  
2. Create a feature branch  
   ```bash
   git checkout -b feature/NewFeature
   ```  
3. Commit your changes  
4. Push to your branch  
5. Open a Pull Request  

---



