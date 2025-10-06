'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, CreditCard as Edit, Copy } from 'lucide-react';
import Link from 'next/link';

const protocols = [
  { id: 1, name: 'Modbus TCP Standard', protocol: 'Modbus TCP', devices: 15, enabled: true, description: 'Standard Modbus TCP configuration' },
  { id: 2, name: 'OPC UA Server', protocol: 'OPC UA', devices: 8, enabled: true, description: 'OPC UA server connection' },
  { id: 3, name: 'MQTT Broker', protocol: 'MQTT', devices: 22, enabled: true, description: 'MQTT broker for IoT devices' },
  { id: 4, name: 'BACnet IP', protocol: 'BACnet', devices: 5, enabled: false, description: 'BACnet IP for HVAC systems' },
  { id: 5, name: 'SNMP v3', protocol: 'SNMP', devices: 12, enabled: true, description: 'SNMP v3 for network devices' },
];

export default function ProtocolsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProtocols = protocols.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.protocol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neon-cyan">Protocol Configuration</h1>
          <p className="text-muted-foreground mt-1">Manage communication protocol templates</p>
        </div>
        <Link href="/protocols/add">
          <Button className="mt-4 md:mt-0 bg-neon-cyan text-black hover:bg-neon-cyan/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Protocol Template
          </Button>
        </Link>
      </div>

      <Card className="glass neon-border">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search protocol templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredProtocols.map((protocol) => (
              <Card key={protocol.id} className="glass neon-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{protocol.name}</CardTitle>
                      <CardDescription className="mt-1">{protocol.description}</CardDescription>
                    </div>
                    <Badge variant={protocol.enabled ? 'default' : 'secondary'} className="ml-2">
                      {protocol.enabled ? 'Active' : 'Disabled'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Protocol Type</span>
                    <Badge variant="outline">{protocol.protocol}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Devices Using</span>
                    <span className="font-medium">{protocol.devices}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Copy className="h-3 w-3 mr-2" />
                      Clone
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {['Modbus TCP', 'OPC UA', 'MQTT', 'BACnet', 'SNMP'].map((name) => {
          const count = protocols.filter(p => p.protocol === name).length;
          return (
            <Card key={name} className="glass neon-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">{name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{count}</div>
                <p className="text-xs text-muted-foreground mt-1">templates</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
