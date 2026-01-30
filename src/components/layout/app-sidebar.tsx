'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Home, Calendar, PlusCircle, Book, Users, HardHat, Box, Settings, LogOut, ShieldCheck, CheckSquare, User, Instagram } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1');

  const menuItems = [
    { href: '/', label: 'لوحة التحكم', icon: Home },
    { href: '/calendar', label: 'المواعيد', icon: Calendar },
    { href: '/reports/new', label: 'يومية جديدة', icon: PlusCircle },
    { href: '/reports', label: 'سجل اليوميات', icon: Book },
    { href: '/tasks', label: 'المهام', icon: CheckSquare },
    { href: '/workers', label: 'العمال', icon: Users },
    { href: '/equipment', label: 'المعدات', icon: HardHat },
    { href: '/inventory', label: 'المخزون', icon: Box },
    { href: '/social-media', label: 'وسائل التواصل', icon: Instagram },
  ];

  return (
    <Sidebar side="right" className="border-l hidden lg:flex">
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2">
                <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <div className="flex flex-col">
                <h2 className="font-headline text-lg font-bold text-primary">رويال للتنظيف</h2>
                <p className="text-xs text-muted-foreground">لوحة تحكم المشرف</p>
            </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  className="w-full justify-start"
                >
                  <span className="me-3"><item.icon className="h-5 w-5" /></span>
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/profile" passHref>
                <SidebarMenuButton isActive={pathname === '/profile'} className="justify-start">
                    <span className="me-3"><User className="h-5 w-5" /></span>
                    <span>الملف الشخصي</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/settings" passHref>
                <SidebarMenuButton isActive={pathname === '/settings'} className="justify-start">
                    <span className="me-3"><Settings className="h-5 w-5" /></span>
                    <span>الإعدادات</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
        </SidebarMenu>
        <div className="w-full border-t my-2" />
         <div className="flex items-center gap-3 p-2">
            <Avatar className="h-10 w-10">
              {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User" />}
              <AvatarFallback>م</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-semibold">محمد المشرف</p>
              <p className="text-xs text-muted-foreground">supervisor@royal.com</p>
            </div>
            <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
      </SidebarFooter>
    </Sidebar>
  );
}
