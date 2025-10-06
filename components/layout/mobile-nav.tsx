'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Radio, Database, ChartBar as BarChart3, Shield, Cloud, Wrench, Sparkles, Activity } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
      { name: 'Discovery', href: '/devices/discovery' },
      { name: 'Drivers', href: '/devices/drivers' },
      { name: 'Connection Tester', href: '/devices/tester' },
      { name: 'Tag Browser', href: '/devices/tags' },
      { name: 'Protocol Converter', href: '/devices/converter' },
    ],
  },
  {
    name: 'Data Management',
    icon: Database,
    children: [
      { name: 'Transformation', href: '/data/transformer' },
      { name: 'Buffer', href: '/data/buffer' },
      { name: 'Database Integration', href: '/data/database' },
      { name: 'Alarms', href: '/data/alarms' },
      { name: 'Edge Analytics', href: '/data/analytics' },
    ],
  },
  {
    name: 'Monitoring',
    icon: BarChart3,
    children: [
      { name: 'Traffic Monitor', href: '/monitor/traffic' },
      { name: 'Health', href: '/monitor/health' },
      { name: 'Alerts', href: '/monitor/alerts' },
      { name: 'Topology', href: '/monitor/topology' },
    ],
  },
  {
    name: 'Security',
    icon: Shield,
    children: [
      { name: 'Certificates', href: '/security/certificates' },
      { name: 'Access Control', href: '/security/access' },
      { name: 'Audit Trail', href: '/security/audit' },
      { name: 'Updates', href: '/security/update' },
    ],
  },
  {
    name: 'Integration',
    icon: Cloud,
    children: [
      { name: 'Cloud Platforms', href: '/integration/cloud' },
      { name: 'Edge Deployment', href: '/integration/edge' },
      { name: 'API Management', href: '/integration/api' },
      { name: 'Multi-Gateway', href: '/integration/multi-gateway' },
    ],
  },
  {
    name: 'Productivity',
    icon: Wrench,
    children: [
      { name: 'Configuration', href: '/tools/config' },
      { name: 'Templates', href: '/tools/templates' },
      { name: 'Scheduler', href: '/tools/scheduler' },
      { name: 'Simulator', href: '/tools/simulator' },
    ],
  },
  {
    name: 'Enterprise',
    icon: Sparkles,
    children: [
      { name: 'High Availability', href: '/enterprise/ha' },
      { name: 'ML/AI Integration', href: '/enterprise/ai' },
      { name: 'Data Governance', href: '/enterprise/governance' },
      { name: 'Rules Engine', href: '/enterprise/rules' },
      { name: 'OEE Dashboard', href: '/enterprise/oee' },
    ],
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-neon-cyan" />
          <span className="font-bold text-lg">IIoT Gateway</span>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <Accordion type="multiple" className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const hasChildren = item.children && item.children.length > 0;

              if (!hasChildren) {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href!}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-lg transition-all',
                      'hover:bg-primary/10 hover:text-primary',
                      isActive && 'bg-primary/20 text-primary neon-border-cyan'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              }

              return (
                <AccordionItem key={item.name} value={item.name} className="border-none">
                  <AccordionTrigger className="px-3 py-3 rounded-lg hover:bg-primary/10 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-8 mt-2 space-y-1">
                      {item.children!.map((child) => {
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
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}
