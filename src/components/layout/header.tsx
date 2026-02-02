'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bell, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export function Header() {
    const { toast } = useToast();
    const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1');
    const [today, setToday] = useState('');

    useEffect(() => {
        setToday(format(new Date(), 'eeee, d MMMM yyyy', { locale: ar }));
    }, []);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-8">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="font-headline text-lg font-bold text-foreground">
          مرحباً بك
        </h1>
      </div>

      <div className="ms-auto flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            {today && <span>{today}</span>}
        </div>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 p-1 h-auto rounded-full">
              <Avatar className="h-9 w-9">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
                <AvatarFallback>م</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start">
                  <p className="text-sm font-medium">المستخدم</p>
                  <p className="text-xs text-muted-foreground">مدير</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>حسابي</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/profile">الملف الشخصي</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/settings">الإعدادات</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => toast({ title: 'تم تسجيل الخروج', description: 'هذه الميزة لا تعمل بعد.'})}>تسجيل الخروج</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
