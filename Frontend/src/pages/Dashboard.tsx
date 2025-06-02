
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CustomersTable from '@/components/dashboard/CustomersTable';
import OrdersTable from '@/components/dashboard/OrdersTable';
import MetricsCards from '@/components/dashboard/MetricsCards';
import SalesChart from '@/components/dashboard/SalesChart';
import OrderDistributionChart from '@/components/dashboard/OrderDistributionChart';
import { Users, ShoppingCart, BarChart3, PieChart } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Restaurant Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Monitor customer activity, track orders, and analyze business metrics
          </p>
        </div>

        {/* Metrics Overview */}
        <MetricsCards />

        {/* Main Content Tabs */}
        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Sales Trends
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Order Distribution
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Records</CardTitle>
                <CardDescription>
                  Browse and filter customer information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomersTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View and filter order records by date and customer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrdersTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Sales Trends</CardTitle>
                <CardDescription>
                  Track sales performance over the past month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SalesChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Distribution by Category</CardTitle>
                <CardDescription>
                  Analyze product category performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrderDistributionChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
