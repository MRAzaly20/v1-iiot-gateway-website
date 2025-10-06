'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Filter, TrendingUp } from 'lucide-react';

const dataPoints = [
  { id: 1, name: 'Temperature Sensor 1', device: 'PLC-001', value: '75.2°F', timestamp: '2 sec ago', quality: 'good', trend: 'up' },
  { id: 2, name: 'Pressure Gauge A', device: 'Sensor-045', value: '120 PSI', timestamp: '1 sec ago', quality: 'good', trend: 'stable' },
  { id: 3, name: 'Motor Speed', device: 'HMI-002', value: '1450 RPM', timestamp: '3 sec ago', quality: 'good', trend: 'down' },
  { id: 4, name: 'Flow Rate', device: 'Meter-078', value: '45.8 L/min', timestamp: '5 sec ago', quality: 'warning', trend: 'stable' },
  { id: 5, name: 'Vibration Level', device: 'Controller-003', value: '2.3 mm/s', timestamp: '10 min ago', quality: 'error', trend: 'up' },
];

export default function DataManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = dataPoints.filter(point =>
    point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    point.device.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neon-cyan">Data Management</h1>
          <p className="text-muted-foreground mt-1">Real-time and historical data monitoring</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button variant="outline" className="neon-border">
            <Filter className="h-4 w-4 mr-2" />
            Filter
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Data Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataPoints.length}</div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Good Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {dataPoints.filter(d => d.quality === 'good').length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {dataPoints.filter(d => d.quality === 'warning').length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {dataPoints.filter(d => d.quality === 'error').length}
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
                  placeholder="Search data points..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-6 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border/50">
              <div>Data Point</div>
              <div>Device</div>
              <div>Current Value</div>
              <div>Quality</div>
              <div>Last Update</div>
              <div className="text-right">Trend</div>
            </div>
            {filteredData.map((point) => (
              <div key={point.id} className="grid grid-cols-6 gap-4 px-4 py-3 items-center glass rounded-lg hover:bg-primary/5 transition-colors">
                <div className="font-medium">{point.name}</div>
                <div className="text-sm text-muted-foreground">{point.device}</div>
                <div className="text-sm font-semibold text-neon-cyan">{point.value}</div>
                <div>
                  <Badge
                    variant={
                      point.quality === 'good' ? 'default' :
                      point.quality === 'warning' ? 'secondary' :
                      'destructive'
                    }
                    className="capitalize"
                  >
                    {point.quality}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{point.timestamp}</div>
                <div className="flex items-center justify-end">
                  <TrendingUp
                    className={`h-4 w-4 ${
                      point.trend === 'up' ? 'text-green-500 rotate-0' :
                      point.trend === 'down' ? 'text-red-500 rotate-180' :
                      'text-muted-foreground rotate-90'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
