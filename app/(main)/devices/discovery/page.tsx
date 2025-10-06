'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Play, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DeviceDiscoveryPage() {
  const [scanning, setScanning] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState([
    { id: 1, ip: '192.168.1.15', protocol: 'Modbus TCP', type: 'PLC', selected: false },
    { id: 2, ip: '192.168.1.25', protocol: 'OPC UA', type: 'HMI', selected: false },
    { id: 3, ip: '192.168.1.50', protocol: 'MQTT', type: 'Sensor', selected: false },
  ]);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 3000);
  };

  const toggleDevice = (id: number) => {
    setDiscoveredDevices(devices =>
      devices.map(d => d.id === id ? { ...d, selected: !d.selected } : d)
    );
  };

  const selectedCount = discoveredDevices.filter(d => d.selected).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link href="/devices">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-neon-cyan">Device Discovery</h1>
          <p className="text-muted-foreground mt-1">Automatically discover devices on the network</p>
        </div>
      </div>

      <Card className="glass neon-border">
        <CardHeader>
          <CardTitle>Scan Configuration</CardTitle>
          <CardDescription>Configure the network range and protocols to scan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startIp">Start IP</Label>
              <Input
                id="startIp"
                placeholder="192.168.1.1"
                defaultValue="192.168.1.1"
                className="glass"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endIp">End IP</Label>
              <Input
                id="endIp"
                placeholder="192.168.1.255"
                defaultValue="192.168.1.255"
                className="glass"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeout">Timeout (ms)</Label>
              <Input
                id="timeout"
                type="number"
                placeholder="5000"
                defaultValue="5000"
                className="glass"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Protocols to Scan</Label>
            <div className="flex flex-wrap gap-2">
              {['Modbus TCP', 'Modbus RTU', 'OPC UA', 'MQTT', 'BACnet', 'SNMP'].map((protocol) => (
                <Badge key={protocol} variant="outline" className="cursor-pointer hover:bg-primary/10">
                  {protocol}
                </Badge>
              ))}
            </div>
          </div>
          <Button
            onClick={handleScan}
            disabled={scanning}
            className="bg-neon-cyan text-black hover:bg-neon-cyan/90 w-full md:w-auto"
          >
            {scanning ? (
              <>
                <div className="h-4 w-4 mr-2 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Scan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {discoveredDevices.length > 0 && (
        <Card className="glass neon-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Discovered Devices</CardTitle>
                <CardDescription>
                  {discoveredDevices.length} devices found | {selectedCount} selected
                </CardDescription>
              </div>
              {selectedCount > 0 && (
                <Button className="bg-neon-cyan text-black hover:bg-neon-cyan/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Selected ({selectedCount})
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border/50">
                <div>Select</div>
                <div>IP Address</div>
                <div>Protocol</div>
                <div>Device Type</div>
                <div className="text-right">Actions</div>
              </div>
              {discoveredDevices.map((device) => (
                <div key={device.id} className="grid grid-cols-5 gap-4 px-4 py-3 items-center glass rounded-lg">
                  <div>
                    <input
                      type="checkbox"
                      checked={device.selected}
                      onChange={() => toggleDevice(device.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </div>
                  <div className="font-mono text-sm">{device.ip}</div>
                  <div>
                    <Badge variant="outline">{device.protocol}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{device.type}</div>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
