'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Radio, Database, ChartBar as BarChart3, Shield, Cloud, Wrench, Sparkles, Activity, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Device Management',
    icon: Radio,
    children: [
      { name: 'Devices', href: '/devices' },
      { name: 'Add Device', href: '/devices/add' },
      { name: 'Discovery', href: '/devices/discovery' },
    ],
  },
  {
    name: 'Protocols',
    href: '/protocols',
    icon: Activity,
  },
  {
    name: 'Data Management',
    href: '/data',
    icon: Database,
  },
  {
    name: 'Alarms & Events',
    href: '/alarms',
    icon: BarChart3,
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
  },
  {
    name: 'Integration',
    href: '/integrations',
    icon: Cloud,
  },
  {
    name: 'Users & Roles',
    href: '/users',
    icon: Shield,
  },
  {
    name: 'System Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Device Management']);

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  return (
    <div
      className={cn(
        'hidden md:flex flex-col glass-strong neon-border h-screen sticky top-0 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-neon-cyan" />
            <span className="font-bold text-lg">IIoT Gateway</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hover:bg-primary/10"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.name);
            const hasChildren = item.children && item.children.length > 0;

            if (!hasChildren) {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href!}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-all',
                    'hover:bg-primary/10 hover:text-primary',
                    isActive && 'bg-primary/20 text-primary neon-border-cyan',
                    collapsed && 'justify-center'
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
                </Link>
              );
            }

            return (
              <div key={item.name} className="space-y-1">
                <button
                  onClick={() => !collapsed && toggleExpanded(item.name)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all',
                    'hover:bg-primary/10 hover:text-primary',
                    collapsed && 'justify-center'
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="text-sm font-medium flex-1 text-left">{item.name}</span>
                      <ChevronRight
                        className={cn(
                          'h-4 w-4 transition-transform',
                          isExpanded && 'rotate-90'
                        )}
                      />
                    </>
                  )}
                </button>

                {!collapsed && isExpanded && item.children && (
                  <div className="ml-4 space-y-1 border-l border-border pl-4">
                    {item.children.map((child) => {
                      const isActive = pathname === child.href;
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            'block px-3 py-2 rounded-lg text-sm transition-all',
                            'hover:bg-primary/10 hover:text-primary',
                            isActive && 'bg-primary/20 text-primary font-medium'
                          )}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea>

      {!collapsed && (
        <div className="p-4 border-t border-border">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-all"
          >
            <Settings className="h-5 w-5" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>
      )}
    </div>
  );
}
