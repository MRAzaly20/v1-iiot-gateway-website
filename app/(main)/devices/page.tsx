'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, Download, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const devices = [
  { id: 1, name: 'PLC-001', type: 'PLC', protocol: 'Modbus TCP', ip: '192.168.1.10', status: 'online', gateway: 'Gateway-001', lastSeen: '2 min ago' },
  { id: 2, name: 'Sensor-045', type: 'Sensor', protocol: 'MQTT', ip: '192.168.1.45', status: 'online', gateway: 'Gateway-001', lastSeen: '1 min ago' },
  { id: 3, name: 'HMI-002', type: 'HMI', protocol: 'OPC UA', ip: '192.168.1.20', status: 'online', gateway: 'Gateway-002', lastSeen: '5 min ago' },
  { id: 4, name: 'Meter-078', type: 'Meter', protocol: 'BACnet', ip: '192.168.1.78', status: 'warning', gateway: 'Gateway-002', lastSeen: '15 min ago' },
  { id: 5, name: 'Controller-003', type: 'Controller', protocol: 'Modbus RTU', ip: '192.168.1.30', status: 'offline', gateway: 'Gateway-003', lastSeen: '2 hours ago' },
];

export default function DevicesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.protocol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neon-cyan">Device Management</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all connected devices</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Link href="/devices/discovery">
            <Button variant="outline" className="neon-border">
              <Search className="h-4 w-4 mr-2" />
              Discover Devices
            </Button>
          </Link>
          <Link href="/devices/add">
            <Button className="bg-neon-cyan text-black hover:bg-neon-cyan/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Device
            </Button>
          </Link>
        </div>
      </div>

      <Card className="glass neon-border">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search devices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="neon-border">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="neon-border">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="neon-border">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-7 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border/50">
              <div>Device</div>
              <div>Type</div>
              <div>Protocol</div>
              <div>IP Address</div>
              <div>Gateway</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>
            {filteredDevices.map((device) => (
              <div key={device.id} className="grid grid-cols-7 gap-4 px-4 py-3 items-center glass rounded-lg hover:bg-primary/5 transition-colors">
                <div className="font-medium">{device.name}</div>
                <div className="text-sm text-muted-foreground">{device.type}</div>
                <div>
                  <Badge variant="outline" className="text-xs">{device.protocol}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">{device.ip}</div>
                <div className="text-sm text-muted-foreground">{device.gateway}</div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${
                    device.status === 'online' ? 'status-online' :
                    device.status === 'warning' ? 'status-warning' :
                    'status-offline'
                  }`} />
                  <span className="text-sm capitalize">{device.status}</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/devices/${device.id}`}>
                    <Button variant="ghost" size="sm">View</Button>
                  </Link>
                  <Link href={`/devices/${device.id}/edit`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devices.length}</div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Online</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {devices.filter(d => d.status === 'online').length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Warning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {devices.filter(d => d.status === 'warning').length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Offline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {devices.filter(d => d.status === 'offline').length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
