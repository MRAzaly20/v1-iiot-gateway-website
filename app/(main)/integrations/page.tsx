'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Webhook, Database, Cloud, Code, ExternalLink } from 'lucide-react';

const integrations = [
  { id: 1, name: 'REST API', type: 'api', status: 'active', description: 'RESTful API for data access', requests: '12.5K/day', icon: Code },
  { id: 2, name: 'Webhook - Alert System', type: 'webhook', status: 'active', description: 'Sends alarms to monitoring system', events: '145', icon: Webhook },
  { id: 3, name: 'Cloud Storage', type: 'cloud', status: 'active', description: 'AWS S3 data export', synced: '2.1 GB', icon: Cloud },
  { id: 4, name: 'Database Export', type: 'database', status: 'inactive', description: 'PostgreSQL data replication', records: '0', icon: Database },
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neon-cyan">Integrations</h1>
          <p className="text-muted-foreground mt-1">Connect with external systems and services</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-neon-cyan text-black hover:bg-neon-cyan/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.length}</div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {integrations.filter(i => i.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">API Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5K</div>
            <p className="text-xs text-muted-foreground mt-1">today</p>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Webhooks Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground mt-1">today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <Card key={integration.id} className="glass neon-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg glass">
                      <Icon className="h-5 w-5 text-neon-cyan" />
                    </div>
                    <div>
                      <CardTitle>{integration.name}</CardTitle>
                      <CardDescription className="mt-1">{integration.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={integration.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                    {integration.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {integration.requests && (
                    <div className="glass p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">API Requests</p>
                      <p className="text-lg font-semibold mt-1">{integration.requests}</p>
                    </div>
                  )}
                  {integration.events && (
                    <div className="glass p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Events Sent</p>
                      <p className="text-lg font-semibold mt-1">{integration.events}</p>
                    </div>
                  )}
                  {integration.synced && (
                    <div className="glass p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Data Synced</p>
                      <p className="text-lg font-semibold mt-1">{integration.synced}</p>
                    </div>
                  )}
                  {integration.records && (
                    <div className="glass p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Records</p>
                      <p className="text-lg font-semibold mt-1">{integration.records}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    View Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="glass neon-border">
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>Manage API keys and access tokens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 glass rounded-lg">
            <div>
              <p className="font-medium">Primary API Key</p>
              <p className="text-sm text-muted-foreground font-mono mt-1">sk_live_••••••••••••••••1234</p>
            </div>
            <Button variant="outline" size="sm">Copy</Button>
          </div>
          <div className="flex items-center justify-between p-4 glass rounded-lg">
            <div>
              <p className="font-medium">Secondary API Key</p>
              <p className="text-sm text-muted-foreground font-mono mt-1">sk_live_••••••••••••••••5678</p>
            </div>
            <Button variant="outline" size="sm">Copy</Button>
          </div>
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Generate New API Key
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
