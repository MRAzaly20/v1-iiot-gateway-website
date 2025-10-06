'use client';

import { useState, useEffect } from 'react';
import { Bell, Menu, Server, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MobileNav } from './mobile-nav';
import { cn } from '@/lib/utils';

export function Header() {
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'online' | 'offline'>('connecting');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Device discovered: PLC-001', time: '2 min ago', unread: true },
    { id: 2, message: 'High temperature alarm triggered', time: '15 min ago', unread: true },
    { id: 3, message: 'Firmware update available', time: '1 hour ago', unread: false },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnectionStatus('online');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-40 w-full glass-strong neon-border border-b">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 glass-strong">
              <MobileNav />
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-neon-blue" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-semibold hover:text-primary">
                  Gateway-001
                  <span className="ml-2 text-xs text-muted-foreground">▼</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="glass-strong">
                <DropdownMenuLabel>Select Gateway</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full status-online" />
                    Gateway-001 (Current)
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full status-online" />
                    Gateway-002
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full status-offline" />
                    Gateway-003
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {connectionStatus === 'connecting' && (
              <>
                <Wifi className="h-4 w-4 text-neon-cyan animate-pulse" />
                <span className="text-sm text-neon-cyan animate-pulse">Connecting...</span>
              </>
            )}
            {connectionStatus === 'online' && (
              <>
                <div className="h-2 w-2 rounded-full status-online" />
                <span className="text-sm text-green-500">Connected</span>
              </>
            )}
            {connectionStatus === 'offline' && (
              <>
                <WifiOff className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-500">Offline</span>
              </>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500"
                    variant="destructive"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 glass-strong">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    'flex flex-col items-start gap-1 p-3',
                    notification.unread && 'bg-primary/10'
                  )}
                >
                  <div className="flex items-center gap-2 w-full">
                    {notification.unread && (
                      <div className="h-2 w-2 rounded-full bg-neon-cyan flex-shrink-0" />
                    )}
                    <span className="text-sm flex-1">{notification.message}</span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">{notification.time}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
