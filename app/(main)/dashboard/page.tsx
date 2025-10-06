'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Server, Radio, TriangleAlert as AlertTriangle, TrendingUp } from 'lucide-react';

const metrics = [
  { name: 'Active Gateways', value: '12', change: '+2', icon: Server, color: 'text-neon-cyan' },
  { name: 'Connected Devices', value: '148', change: '+15', icon: Radio, color: 'text-neon-blue' },
  { name: 'Data Points/sec', value: '2,450', change: '+120', icon: Activity, color: 'text-neon-gold' },
  { name: 'Active Alarms', value: '3', change: '-2', icon: AlertTriangle, color: 'text-red-500' },
];

const recentAlarms = [
  { id: 1, device: 'PLC-001', message: 'High temperature detected', severity: 'critical', time: '2 min ago' },
  { id: 2, device: 'Sensor-045', message: 'Communication timeout', severity: 'high', time: '15 min ago' },
  { id: 3, device: 'Gateway-003', message: 'Buffer at 85%', severity: 'medium', time: '1 hour ago' },
];

const gatewayStatus = [
  { name: 'Gateway-001', status: 'online', devices: 25, uptime: '99.9%', latency: '12ms' },
  { name: 'Gateway-002', status: 'online', devices: 18, uptime: '99.7%', latency: '18ms' },
  { name: 'Gateway-003', status: 'warning', devices: 12, uptime: '98.5%', latency: '45ms' },
  { name: 'Gateway-004', status: 'offline', devices: 0, uptime: '0%', latency: '-' },
];

export default function DashboardPage() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neon-cyan">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Industrial IoT Gateway Management Overview</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {mounted ? time.toLocaleTimeString() : '--:--:--'}
          </div>
          <Button variant="outline" className="neon-border">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.name} className="glass neon-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.name}
                </CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                    {metric.change}
                  </span>{' '}
                  from last hour
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle>Recent Alarms</CardTitle>
            <CardDescription>Latest system alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlarms.map((alarm) => (
              <div key={alarm.id} className="flex items-start gap-4 p-3 rounded-lg glass">
                <div className={`h-2 w-2 rounded-full mt-2 ${
                  alarm.severity === 'critical' ? 'status-offline' :
                  alarm.severity === 'high' ? 'status-warning' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{alarm.device}</p>
                    <Badge variant={
                      alarm.severity === 'critical' ? 'destructive' :
                      alarm.severity === 'high' ? 'default' :
                      'secondary'
                    } className="ml-2">
                      {alarm.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alarm.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alarm.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">View All Alarms</Button>
          </CardContent>
        </Card>

        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle>Gateway Status</CardTitle>
            <CardDescription>Overview of all gateway nodes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {gatewayStatus.map((gateway) => (
              <div key={gateway.name} className="p-4 rounded-lg glass">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${
                      gateway.status === 'online' ? 'status-online' :
                      gateway.status === 'warning' ? 'status-warning' :
                      'status-offline'
                    }`} />
                    <span className="font-medium">{gateway.name}</span>
                  </div>
                  <Badge variant="outline">{gateway.devices} devices</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Uptime:</span>
                    <span className="ml-2">{gateway.uptime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Latency:</span>
                    <span className="ml-2">{gateway.latency}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass neon-border">
        <CardHeader>
          <CardTitle>System Resources</CardTitle>
          <CardDescription>Gateway resource utilization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">CPU Usage</span>
              <span className="text-sm text-muted-foreground">45%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Memory Usage</span>
              <span className="text-sm text-muted-foreground">62%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '62%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Disk Usage</span>
              <span className="text-sm text-muted-foreground">38%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '38%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Network Throughput</span>
              <span className="text-sm text-muted-foreground">78%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
