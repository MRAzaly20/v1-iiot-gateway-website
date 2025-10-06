'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Bell, BellOff, Check } from 'lucide-react';

const alarms = [
  { id: 1, severity: 'critical', device: 'PLC-001', message: 'High temperature detected', value: '95°F', threshold: '85°F', time: '2 min ago', acknowledged: false },
  { id: 2, severity: 'high', device: 'Sensor-045', message: 'Communication timeout', value: '-', threshold: '5s', time: '15 min ago', acknowledged: false },
  { id: 3, severity: 'medium', device: 'Gateway-003', message: 'Buffer at 85%', value: '85%', threshold: '80%', time: '1 hour ago', acknowledged: true },
  { id: 4, severity: 'low', device: 'HMI-002', message: 'Low disk space warning', value: '12%', threshold: '15%', time: '2 hours ago', acknowledged: true },
  { id: 5, severity: 'critical', device: 'Controller-003', message: 'Connection lost', value: '-', threshold: '-', time: '3 hours ago', acknowledged: false },
];

export default function AlarmsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredAlarms = alarms
    .filter(alarm => {
      if (filter === 'unacknowledged') return !alarm.acknowledged;
      if (filter === 'acknowledged') return alarm.acknowledged;
      return true;
    })
    .filter(alarm =>
      alarm.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alarm.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neon-cyan">Alarms & Events</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage system alarms</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button variant="outline" className="neon-border">
            <Filter className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button variant="outline" className="neon-border">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Alarms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alarms.length}</div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Unacknowledged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {alarms.filter(a => !a.acknowledged).length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {alarms.filter(a => a.severity === 'critical').length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Acknowledged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {alarms.filter(a => a.acknowledged).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass neon-border">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alarms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'unacknowledged' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('unacknowledged')}
              >
                Unacknowledged
              </Button>
              <Button
                variant={filter === 'acknowledged' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('acknowledged')}
              >
                Acknowledged
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredAlarms.map((alarm) => (
              <div key={alarm.id} className="glass rounded-lg p-4 hover:bg-primary/5 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`h-2 w-2 rounded-full mt-2 ${
                      alarm.severity === 'critical' ? 'status-offline' :
                      alarm.severity === 'high' ? 'bg-orange-500' :
                      alarm.severity === 'medium' ? 'status-warning' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{alarm.device}</span>
                        <Badge
                          variant={
                            alarm.severity === 'critical' ? 'destructive' :
                            alarm.severity === 'high' ? 'destructive' :
                            alarm.severity === 'medium' ? 'secondary' :
                            'outline'
                          }
                          className="capitalize"
                        >
                          {alarm.severity}
                        </Badge>
                        {alarm.acknowledged && (
                          <Badge variant="outline" className="text-green-500">
                            <Check className="h-3 w-3 mr-1" />
                            Acknowledged
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alarm.message}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Value: {alarm.value}</span>
                        <span>Threshold: {alarm.threshold}</span>
                        <span>{alarm.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!alarm.acknowledged && (
                      <Button variant="outline" size="sm">
                        <Check className="h-4 w-4 mr-2" />
                        Acknowledge
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <BellOff className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
