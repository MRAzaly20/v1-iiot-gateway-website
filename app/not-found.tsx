'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, RefreshCw } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="glass neon-border max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="text-8xl font-bold text-neon-cyan">404</div>
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Link href="/dashboard">
              <Button className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/90">
                <Home className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full neon-border"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Page
            </Button>
          </div>
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground text-center mb-3">
              Quick Links:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/devices">
                <Button variant="outline" size="sm" className="w-full">
                  Devices
                </Button>
              </Link>
              <Link href="/monitoring">
                <Button variant="outline" size="sm" className="w-full">
                  Monitoring
                </Button>
              </Link>
              <Link href="/alarms">
                <Button variant="outline" size="sm" className="w-full">
                  Alarms
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="outline" size="sm" className="w-full">
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
