'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, CreditCard as Edit, Trash2, Shield } from 'lucide-react';

const users = [
  { id: 1, name: 'John Smith', email: 'john.smith@company.com', role: 'Admin', status: 'active', lastLogin: '2 hours ago' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'Operator', status: 'active', lastLogin: '1 day ago' },
  { id: 3, name: 'Mike Chen', email: 'mike.chen@company.com', role: 'Viewer', status: 'active', lastLogin: '3 hours ago' },
  { id: 4, name: 'Emma Davis', email: 'emma.d@company.com', role: 'Operator', status: 'inactive', lastLogin: '15 days ago' },
];

const roles = [
  { name: 'Admin', permissions: 'Full system access', users: 1, color: 'text-red-500' },
  { name: 'Operator', permissions: 'Manage devices and data', users: 2, color: 'text-neon-cyan' },
  { name: 'Viewer', permissions: 'Read-only access', users: 1, color: 'text-green-500' },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neon-cyan">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-neon-cyan text-black hover:bg-neon-cyan/90">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {users.filter(u => u.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Administrators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role === 'Admin').length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass neon-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
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
                  placeholder="Search users..."
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
              <div className="col-span-2">User</div>
              <div>Role</div>
              <div>Status</div>
              <div>Last Login</div>
              <div className="text-right">Actions</div>
            </div>
            {filteredUsers.map((user) => (
              <div key={user.id} className="grid grid-cols-6 gap-4 px-4 py-3 items-center glass rounded-lg hover:bg-primary/5 transition-colors">
                <div className="col-span-2">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div>
                  <Badge variant="outline">{user.role}</Badge>
                </div>
                <div>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                    {user.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{user.lastLogin}</div>
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass neon-border">
        <CardHeader>
          <CardTitle>Roles & Permissions</CardTitle>
          <CardDescription>Manage user roles and access levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.name} className="glass neon-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className={`h-5 w-5 ${role.color}`} />
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{role.permissions}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Users</span>
                    <span className="font-medium">{role.users}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Edit Permissions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
