# R1 Launch Pad App Framework

This document is based on the full transcript description of the R1 Launch Pad app.  
It organizes the raw narration into a structured, detailed blueprint to be used as the foundation for rebuilding the app.

---

## 1. Landing Page Layout

- **Header**
  - Title: `Launchpad R1`
  - Icon: Paper airplane style

- **Search Bar**
  - Placeholder text: *Search or Add*
  - Directs to a search window with results and options

- **Top Icons (Row under Search)**
  1. **List / Group Toggle**
     - Dynamically switches between full expand and grouped collapse view of categories
  2. **Favorites Star (Global)**
     - Opens list of favorite sites (turns gold if at least one favorite exists)
     - Allows removing favorites (does not delete from category)
  3. **Theme Icon**
     - Opens theme customization window
  4. **Trash (Global Delete)**
     - Options: Delete all, delete all except favorites, or select specific links

- **Categories Section**
  - User-created categories displayed
  - Sites are nested within categories
  - Categories can expand/collapse individually
  - "Collapse All" option visible once a category is expanded

---

## 2. Site Item Layout (Within Categories)

- **Displayed Elements**
  - Site icon (favicon if available)
  - Description (editable)
  - Three action icons:
    1. **Favorite** → toggle (gray ↔ gold)
    2. **Edit (Pencil)** → opens edit window (description, URL, category dropdown)
    3. **Trash** → delete confirmation prompt

- **Editing Rules**
  - Description: editable
  - URL: editable
  - Category: selectable only from predefined list (not free text)

---

## 3. Search & Add Flow

- **Search Box**
  - On typing → moves to dedicated search window
  - Shows "Search your links" results first
  - If none → offers up to 3 suggested URLs (with "Add:" prefix)
  - Fourth option: *Search {term} on the web* → launches DuckDuckGo

- **Adding a Site**
  - Selecting suggestion → opens "Add Site" form:
    - Description (editable)
    - URL (editable)
    - Category dropdown (predefined categories: education, entertainment, finance, gaming, health, music, news, personal, reference, shopping, social, sports, tech, tools, travel, work, other)
    - Buttons: **Cancel** | **Add**
  - On Add → site appears under chosen category on landing page

---

## 4. Favorites System

- **Per-Site Favorite**
  - Star icon toggles gold ↔ gray
  - Gold indicates favorited

- **Global Favorite List**
  - Opens list of all favorited sites
  - X button removes from favorites (but not from categories)
  - Confirmation prompts on removal

- **Global Favorite Icon**
  - Turns gold when at least one favorite exists

---

## 5. Delete System

- **Site-Level Delete**
  - Trash icon → confirmation: "Are you sure you want to delete {site}?"

- **Global Delete Menu**
  - Options:
    1. Delete All Links
    2. Delete All Except Favorites
    3. Select Links to Delete (checkbox list)
  - Confirmation prompts always required

---

## 6. Theme Customization

- **Theme Window**
  - Default options: ~100 predefined colors (Alice Blue, Teak White, Aqua, etc.)
  - Preview updates window with chosen color
  - Cancel (X), Toggle Light/Dark mode, "Rabbit Me!" (applies Rabbit colors)
  - OK → applies theme globally

- **Custom Theme Creation**
  - After choosing a base color → "Lab" checkbox unlocks modifier panel
  - Modifiers: Bold, Cool, Darker, Glow, Invert, Lighter, Metallic, Monochrome, Muted, Vibrant, Vintage, Warm
  - User applies modifier + light/dark toggle
  - Save → stores one custom theme as "My Custom Theme"
  - Only one custom theme can exist at a time (new one overwrites previous)

---

## 7. Navigation Rules

- **Default State**
  - All categories collapsed
  - List/Group icon toggles expand/collapse all

- **Dynamic Indicators**
  - Favorite star icons turn gold when active
  - Theme preview updates instantly within modal
  - Delete menus always confirm with exact count of links affected

---

## 8. Future Staging Plan (Suggested)

- **Stage 1:** Core Layout (Landing page, categories, site items, search bar)
- **Stage 2:** Search & Add Functionality (link suggestions, add form, categories logic)
- **Stage 3:** Site Actions (favorite toggle, edit, delete per-site)
- **Stage 4:** Global Actions (global favorites list, global delete menu)
- **Stage 5:** Theme Engine (predefined colors, modifiers, custom theme)
- **Stage 6:** Cloud Integration & Persistence (store categories, sites, favorites, and themes in backend/cloud)

---

