'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, TestTube } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddDevicePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    type: 'PLC',
    protocol: 'modbus_tcp',
    ipAddress: '',
    port: '502',
    gateway: 'gateway-001',
    pollingInterval: '1000',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/devices');
  };

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
          <h1 className="text-3xl font-bold text-neon-cyan">Add New Device</h1>
          <p className="text-muted-foreground mt-1">Configure a new device connection</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the device identification details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Device Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., PLC-001"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="glass"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Device Type *</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm glass"
                  required
                >
                  <option value="PLC">PLC</option>
                  <option value="Sensor">Sensor</option>
                  <option value="HMI">HMI</option>
                  <option value="Controller">Controller</option>
                  <option value="Meter">Meter</option>
                  <option value="Actuator">Actuator</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                placeholder="Optional device description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm glass"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle>Connection Configuration</CardTitle>
            <CardDescription>Configure the network and protocol settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="protocol">Protocol *</Label>
                <select
                  id="protocol"
                  value={formData.protocol}
                  onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm glass"
                  required
                >
                  <option value="modbus_tcp">Modbus TCP</option>
                  <option value="modbus_rtu">Modbus RTU</option>
                  <option value="opcua">OPC UA</option>
                  <option value="mqtt">MQTT</option>
                  <option value="bacnet">BACnet</option>
                  <option value="snmp">SNMP</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gateway">Gateway *</Label>
                <select
                  id="gateway"
                  value={formData.gateway}
                  onChange={(e) => setFormData({ ...formData, gateway: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm glass"
                  required
                >
                  <option value="gateway-001">Gateway-001</option>
                  <option value="gateway-002">Gateway-002</option>
                  <option value="gateway-003">Gateway-003</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="ipAddress">IP Address *</Label>
                <Input
                  id="ipAddress"
                  placeholder="192.168.1.10"
                  value={formData.ipAddress}
                  onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                  className="glass"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="port">Port *</Label>
                <Input
                  id="port"
                  placeholder="502"
                  value={formData.port}
                  onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                  className="glass"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pollingInterval">Polling Interval (ms) *</Label>
              <Input
                id="pollingInterval"
                type="number"
                placeholder="1000"
                value={formData.pollingInterval}
                onChange={(e) => setFormData({ ...formData, pollingInterval: e.target.value })}
                className="glass"
                required
              />
              <p className="text-xs text-muted-foreground">How often to poll data from the device (in milliseconds)</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button type="button" variant="outline" className="neon-border">
            <TestTube className="h-4 w-4 mr-2" />
            Test Connection
          </Button>
          <div className="flex gap-2">
            <Link href="/devices">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" className="bg-neon-cyan text-black hover:bg-neon-cyan/90">
              <Save className="h-4 w-4 mr-2" />
              Add Device
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
