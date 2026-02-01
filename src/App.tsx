import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { ReportsProvider } from '@/context/reports-context';
import { WorkersProvider } from '@/context/workers-context';
import { TasksProvider } from '@/context/tasks-context';
import { AppointmentsProvider } from '@/context/appointments-context';
import { FirebaseClientProvider } from '@/firebase';
import { MaterialsProvider } from '@/context/materials-context';
import { EquipmentProvider } from '@/context/equipment-context';

// Import pages
import Dashboard from '@/pages/Dashboard';
import Calendar from '@/pages/Calendar';
import Equipment from '@/pages/Equipment';
import Inventory from '@/pages/Inventory';
import Profile from '@/pages/Profile';
import Reports from '@/pages/Reports';
import NewReport from '@/pages/NewReport';
import Settings from '@/pages/Settings';
import Tasks from '@/pages/Tasks';
import Workers from '@/pages/Workers';

function App() {
  return (
    <FirebaseClientProvider>
      <EquipmentProvider>
        <MaterialsProvider>
          <AppointmentsProvider>
            <TasksProvider>
              <ReportsProvider>
                <WorkersProvider>
                  <SidebarProvider>
                    <div className={cn("font-body antialiased", 'bg-background')}>
                      <div className="relative flex min-h-screen">
                        <AppSidebar />
                        <div className="flex-1">
                          <Header />
                          <main className="p-4 sm:p-6 lg:p-8">
                            <Routes>
                              <Route path="/" element={<Dashboard />} />
                              <Route path="/calendar" element={<Calendar />} />
                              <Route path="/equipment" element={<Equipment />} />
                              <Route path="/inventory" element={<Inventory />} />
                              <Route path="/profile" element={<Profile />} />
                              <Route path="/reports" element={<Reports />} />
                              <Route path="/reports/new" element={<NewReport />} />
                              <Route path="/settings" element={<Settings />} />
                              <Route path="/tasks" element={<Tasks />} />
                              <Route path="/workers" element={<Workers />} />
                            </Routes>
                          </main>
                        </div>
                      </div>
                      <Toaster />
                    </div>
                  </SidebarProvider>
                </WorkersProvider>
              </ReportsProvider>
            </TasksProvider>
          </AppointmentsProvider>
        </MaterialsProvider>
      </EquipmentProvider>
    </FirebaseClientProvider>
  );
}

export default App;
