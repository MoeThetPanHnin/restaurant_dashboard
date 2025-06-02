
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const SalesChart = () => {
  // Mock data for the past 30 days - in a real app, this would come from your API
  const salesData = [
    { date: 'May 2', sales: 1250.50, orders: 45 },
    { date: 'May 3', sales: 1890.25, orders: 52 },
    { date: 'May 4', sales: 2150.75, orders: 61 },
    { date: 'May 5', sales: 1675.00, orders: 48 },
    { date: 'May 6', sales: 2340.25, orders: 67 },
    { date: 'May 7', sales: 2890.50, orders: 78 },
    { date: 'May 8', sales: 3120.75, orders: 85 },
    { date: 'May 9', sales: 2765.25, orders: 72 },
    { date: 'May 10', sales: 2456.50, orders: 69 },
    { date: 'May 11', sales: 2890.75, orders: 76 },
    { date: 'May 12', sales: 3345.25, orders: 89 },
    { date: 'May 13', sales: 3567.50, orders: 94 },
    { date: 'May 14', sales: 3234.75, orders: 87 },
    { date: 'May 15', sales: 2987.25, orders: 81 },
    { date: 'May 16', sales: 3456.50, orders: 92 },
    { date: 'May 17', sales: 3789.75, orders: 98 },
    { date: 'May 18', sales: 4123.25, orders: 105 },
    { date: 'May 19', sales: 3876.50, orders: 96 },
    { date: 'May 20', sales: 3567.75, orders: 89 },
    { date: 'May 21', sales: 3890.25, orders: 94 },
    { date: 'May 22', sales: 4234.50, orders: 108 },
    { date: 'May 23', sales: 4567.75, orders: 115 },
    { date: 'May 24', sales: 4123.25, orders: 102 },
    { date: 'May 25', sales: 3876.50, orders: 97 },
    { date: 'May 26', sales: 4345.75, orders: 110 },
    { date: 'May 27', sales: 4678.25, orders: 118 },
    { date: 'May 28', sales: 4890.50, orders: 123 },
    { date: 'May 29', sales: 4567.75, orders: 115 },
    { date: 'May 30', sales: 4234.25, orders: 108 },
    { date: 'Jun 1', sales: 4789.50, orders: 120 }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-blue-600">
              <span className="font-medium">Sales:</span> {formatCurrency(payload[0].value)}
            </p>
            <p className="text-green-600">
              <span className="font-medium">Orders:</span> {payload[1]?.value || 0}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-900">
            {formatCurrency(salesData.reduce((sum, day) => sum + day.sales, 0))}
          </div>
          <div className="text-sm text-blue-600">Total Sales (30 days)</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-900">
            {salesData.reduce((sum, day) => sum + day.orders, 0)}
          </div>
          <div className="text-sm text-green-600">Total Orders (30 days)</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-900">
            {formatCurrency(salesData.reduce((sum, day) => sum + day.sales, 0) / salesData.length)}
          </div>
          <div className="text-sm text-purple-600">Average Daily Sales</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => value.split(' ')[1]}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#salesGradient)"
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
