'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Save, RefreshCw, Download, Upload } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neon-cyan">System Settings</h1>
          <p className="text-muted-foreground mt-1">Configure gateway and system parameters</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle>Gateway Configuration</CardTitle>
            <CardDescription>Basic gateway settings and identification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gatewayName">Gateway Name</Label>
              <Input
                id="gatewayName"
                defaultValue="Gateway-001"
                className="glass"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gatewayId">Gateway ID</Label>
              <Input
                id="gatewayId"
                defaultValue="GW-001-ABC123"
                className="glass"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Building A, Floor 2"
                className="glass"
              />
            </div>
            <Button className="bg-neon-cyan text-black hover:bg-neon-cyan/90 w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Gateway Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle>Network Configuration</CardTitle>
            <CardDescription>Network and connectivity settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ipAddress">IP Address</Label>
              <Input
                id="ipAddress"
                defaultValue="192.168.1.100"
                className="glass"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subnet">Subnet Mask</Label>
              <Input
                id="subnet"
                defaultValue="255.255.255.0"
                className="glass"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gateway">Default Gateway</Label>
              <Input
                id="gateway"
                defaultValue="192.168.1.1"
                className="glass"
              />
            </div>
            <Button className="bg-neon-cyan text-black hover:bg-neon-cyan/90 w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Network Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="glass neon-border">
        <CardHeader>
          <CardTitle>Data Collection Settings</CardTitle>
          <CardDescription>Configure data polling and storage parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pollingRate">Default Polling Rate (ms)</Label>
              <Input
                id="pollingRate"
                type="number"
                defaultValue="1000"
                className="glass"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bufferSize">Buffer Size (MB)</Label>
              <Input
                id="bufferSize"
                type="number"
                defaultValue="100"
                className="glass"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retentionDays">Data Retention (days)</Label>
              <Input
                id="retentionDays"
                type="number"
                defaultValue="30"
                className="glass"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 glass rounded-lg">
            <div>
              <p className="font-medium">Enable Data Compression</p>
              <p className="text-sm text-muted-foreground">Compress historical data to save storage</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <Button className="bg-neon-cyan text-black hover:bg-neon-cyan/90">
            <Save className="h-4 w-4 mr-2" />
            Save Data Settings
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>Current system status and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Firmware Version</span>
              <Badge variant="outline">v2.5.1</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">System Uptime</span>
              <span className="text-sm">15 days, 4 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Backup</span>
              <span className="text-sm">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database Size</span>
              <span className="text-sm">2.4 GB</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle>Backup & Restore</CardTitle>
            <CardDescription>Manage system configuration backups</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full neon-border">
              <Download className="h-4 w-4 mr-2" />
              Download Configuration Backup
            </Button>
            <Button variant="outline" className="w-full neon-border">
              <Upload className="h-4 w-4 mr-2" />
              Restore from Backup
            </Button>
            <Button variant="destructive" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Factory Reset
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
