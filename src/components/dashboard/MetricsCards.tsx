
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, ShoppingCart, DollarSign, RefreshCw } from 'lucide-react';

const MetricsCards = () => {
  // Mock data - in a real app, this would come from your API
  const metrics = {
    totalSales: 28450.75,
    totalOrders: 1247,
    totalCustomers: 523,
    repeatVisitRate: 68.5,
    averageOrderValue: 22.83,
    ordersToday: 47
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">Total Sales</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">
            {formatCurrency(metrics.totalSales)}
          </div>
          <div className="flex items-center space-x-2 text-xs text-blue-600 mt-2">
            <TrendingUp className="h-3 w-3" />
            <span>+12.5% from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Total Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {metrics.totalOrders.toLocaleString()}
          </div>
          <div className="flex items-center space-x-2 text-xs text-green-600 mt-2">
            <Badge variant="secondary" className="bg-green-200 text-green-800">
              {metrics.ordersToday} today
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">
            {metrics.totalCustomers.toLocaleString()}
          </div>
          <div className="text-xs text-purple-600 mt-2">
            Active customer base
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-700">Repeat Visit Rate</CardTitle>
          <RefreshCw className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-900">
            {metrics.repeatVisitRate}%
          </div>
          <div className="text-xs text-orange-600 mt-2">
            Customer retention
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-indigo-700">Avg Order Value</CardTitle>
          <DollarSign className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-indigo-900">
            {formatCurrency(metrics.averageOrderValue)}
          </div>
          <div className="text-xs text-indigo-600 mt-2">
            Per transaction
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
