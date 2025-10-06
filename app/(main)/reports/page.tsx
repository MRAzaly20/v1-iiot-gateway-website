'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, TrendingUp, Activity, CircleAlert as AlertCircle } from 'lucide-react';

const recentReports = [
  { id: 1, name: 'Daily Operations Report', type: 'Operational', date: 'Today, 6:00 AM', size: '2.4 MB', format: 'PDF' },
  { id: 2, name: 'Weekly Performance Summary', type: 'Performance', date: 'Yesterday', size: '1.8 MB', format: 'Excel' },
  { id: 3, name: 'Device Health Analysis', type: 'Diagnostic', date: '2 days ago', size: '3.2 MB', format: 'PDF' },
  { id: 4, name: 'Alarm History Report', type: 'Alarms', date: '3 days ago', size: '1.1 MB', format: 'CSV' },
];

const reportTemplates = [
  { id: 1, name: 'System Overview', description: 'Comprehensive system status and metrics', icon: Activity, frequency: 'Daily' },
  { id: 2, name: 'Device Performance', description: 'Device uptime and performance metrics', icon: TrendingUp, frequency: 'Weekly' },
  { id: 3, name: 'Alarm Analysis', description: 'Alarm trends and statistics', icon: AlertCircle, frequency: 'Monthly' },
  { id: 4, name: 'Compliance Report', description: 'Regulatory compliance documentation', icon: FileText, frequency: 'Monthly' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neon-cyan">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Generate and manage system reports</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-neon-cyan text-black hover:bg-neon-cyan/90">
          <FileText className="h-4 w-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Reports Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground mt-1">this month</p>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">active</p>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Data Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2 GB</div>
            <p className="text-xs text-muted-foreground mt-1">this month</p>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Export Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.8 GB</div>
            <p className="text-xs text-muted-foreground mt-1">total</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass neon-border">
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Pre-configured report templates for quick generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {reportTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.id} className="glass neon-border">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg glass">
                        <Icon className="h-5 w-5 text-neon-cyan" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription className="mt-1">{template.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Frequency</span>
                      <Badge variant="outline">{template.frequency}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Calendar className="h-3 w-3 mr-2" />
                        Schedule
                      </Button>
                      <Button size="sm" className="flex-1 bg-neon-cyan text-black hover:bg-neon-cyan/90">
                        <FileText className="h-3 w-3 mr-2" />
                        Generate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="glass neon-border">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Recently generated and downloaded reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-5 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border/50">
              <div className="col-span-2">Report Name</div>
              <div>Type</div>
              <div>Generated</div>
              <div className="text-right">Actions</div>
            </div>
            {recentReports.map((report) => (
              <div key={report.id} className="grid grid-cols-5 gap-4 px-4 py-3 items-center glass rounded-lg hover:bg-primary/5 transition-colors">
                <div className="col-span-2">
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-muted-foreground">{report.size} • {report.format}</p>
                </div>
                <div>
                  <Badge variant="outline">{report.type}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">{report.date}</div>
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
