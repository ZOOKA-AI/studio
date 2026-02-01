#!/bin/bash
# Convert Next.js pages to React pages

# Dashboard (main page)
cp src/app/page.tsx src/pages/Dashboard.tsx
# Remove 'use client' directive if exists and export default
sed -i "/^'use client';$/d" src/pages/Dashboard.tsx
sed -i "s/export default function SupervisorDashboardPage/export default function Dashboard/" src/pages/Dashboard.tsx

# Calendar
cp src/app/calendar/page.tsx src/pages/Calendar.tsx
sed -i "/^'use client';$/d" src/pages/Calendar.tsx
sed -i "s/export default function CalendarPage/export default function Calendar/" src/pages/Calendar.tsx

# Equipment
cp src/app/equipment/page.tsx src/pages/Equipment.tsx
sed -i "/^'use client';$/d" src/pages/Equipment.tsx
sed -i "s/export default function EquipmentPage/export default function Equipment/" src/pages/Equipment.tsx

# Inventory
cp src/app/inventory/page.tsx src/pages/Inventory.tsx
sed -i "/^'use client';$/d" src/pages/Inventory.tsx
sed -i "s/export default function InventoryPage/export default function Inventory/" src/pages/Inventory.tsx

# Profile
cp src/app/profile/page.tsx src/pages/Profile.tsx
sed -i "/^'use client';$/d" src/pages/Profile.tsx
sed -i "s/export default function ProfilePage/export default function Profile/" src/pages/Profile.tsx

# Reports
cp src/app/reports/page.tsx src/pages/Reports.tsx
sed -i "/^'use client';$/d" src/pages/Reports.tsx
sed -i "s/export default function ReportsPage/export default function Reports/" src/pages/Reports.tsx

# New Report
cp src/app/reports/new/page.tsx src/pages/NewReport.tsx
sed -i "/^'use client';$/d" src/pages/NewReport.tsx
sed -i "s/export default function NewReportPage/export default function NewReport/" src/pages/NewReport.tsx

# Settings
cp src/app/settings/page.tsx src/pages/Settings.tsx
sed -i "/^'use client';$/d" src/pages/Settings.tsx
sed -i "s/export default function SettingsPage/export default function Settings/" src/pages/Settings.tsx

# Tasks
cp src/app/tasks/page.tsx src/pages/Tasks.tsx
sed -i "/^'use client';$/d" src/pages/Tasks.tsx
sed -i "s/export default function TasksPage/export default function Tasks/" src/pages/Tasks.tsx

# Workers
cp src/app/workers/page.tsx src/pages/Workers.tsx
sed -i "/^'use client';$/d" src/pages/Workers.tsx
sed -i "s/export default function WorkersPage/export default function Workers/" src/pages/Workers.tsx

echo "All pages converted!"
