
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const SalesChart = () => {
  // Updated mock data with Korean Won and more realistic Korean restaurant sales
  const salesData = [
    { date: '5월 2일', sales: 1250000, orders: 67 },
    { date: '5월 3일', sales: 1890000, orders: 89 },
    { date: '5월 4일', sales: 2150000, orders: 102 },
    { date: '5월 5일', sales: 1675000, orders: 78 },
    { date: '5월 6일', sales: 2340000, orders: 134 },
    { date: '5월 7일', sales: 2890000, orders: 156 },
    { date: '5월 8일', sales: 3120000, orders: 189 },
    { date: '5월 9일', sales: 2765000, orders: 145 },
    { date: '5월 10일', sales: 2456000, orders: 128 },
    { date: '5월 11일', sales: 2890000, orders: 167 },
    { date: '5월 12일', sales: 3345000, orders: 201 },
    { date: '5월 13일', sales: 3567000, orders: 234 },
    { date: '5월 14일', sales: 3234000, orders: 198 },
    { date: '5월 15일', sales: 2987000, orders: 176 },
    { date: '5월 16일', sales: 3456000, orders: 213 },
    { date: '5월 17일', sales: 3789000, orders: 245 },
    { date: '5월 18일', sales: 4123000, orders: 267 },
    { date: '5월 19일', sales: 3876000, orders: 234 },
    { date: '5월 20일', sales: 3567000, orders: 201 },
    { date: '5월 21일', sales: 3890000, orders: 223 },
    { date: '5월 22일', sales: 4234000, orders: 278 },
    { date: '5월 23일', sales: 4567000, orders: 298 },
    { date: '5월 24일', sales: 4123000, orders: 267 },
    { date: '5월 25일', sales: 3876000, orders: 245 },
    { date: '5월 26일', sales: 4345000, orders: 289 },
    { date: '5월 27일', sales: 4678000, orders: 312 },
    { date: '5월 28일', sales: 4890000, orders: 334 },
    { date: '5월 29일', sales: 4567000, orders: 298 },
    { date: '5월 30일', sales: 4234000, orders: 278 },
    { date: '6월 1일', sales: 4789000, orders: 315 }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
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
              <span className="font-medium">매출:</span> {formatCurrency(payload[0].value)}
            </p>
            <p className="text-green-600">
              <span className="font-medium">주문 수:</span> {payload[1]?.value || 0}건
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
          <div className="text-sm text-blue-600">30일 총 매출</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-900">
            {salesData.reduce((sum, day) => sum + day.orders, 0)}건
          </div>
          <div className="text-sm text-green-600">30일 총 주문</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-900">
            {formatCurrency(salesData.reduce((sum, day) => sum + day.sales, 0) / salesData.length)}
          </div>
          <div className="text-sm text-purple-600">일평균 매출</div>
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
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
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
