
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const OrderDistributionChart = () => {
  // Updated mock data for Korean restaurant menu categories
  const categoryData = [
    { name: '버거류', value: 1245, percentage: 38.7, color: '#3B82F6' },
    { name: '치킨류', value: 867, percentage: 26.9, color: '#10B981' },
    { name: '사이드', value: 523, percentage: 16.2, color: '#F59E0B' },
    { name: '음료', value: 398, percentage: 12.4, color: '#EF4444' },
    { name: '디저트', value: 187, percentage: 5.8, color: '#8B5CF6' }
  ];

  const timeData = [
    { time: '11:00-12:00', orders: 23 },
    { time: '12:00-13:00', orders: 89 },
    { time: '13:00-14:00', orders: 67 },
    { time: '14:00-15:00', orders: 34 },
    { time: '15:00-16:00', orders: 28 },
    { time: '16:00-17:00', orders: 45 },
    { time: '17:00-18:00', orders: 78 },
    { time: '18:00-19:00', orders: 134 },
    { time: '19:00-20:00', orders: 156 },
    { time: '20:00-21:00', orders: 98 },
    { time: '21:00-22:00', orders: 56 }
  ];

  const storeData = [
    { store: '강남점', orders: 456, sales: 8900000 },
    { store: '홍대점', orders: 389, sales: 7200000 },
    { store: '부산점', orders: 367, sales: 6800000 },
    { store: '인천점', orders: 234, sales: 4500000 },
    { store: '대구점', orders: 198, sales: 3800000 }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-blue-600">
            주문: <span className="font-medium">{data.value}건</span>
          </p>
          <p className="text-gray-600">
            비율: <span className="font-medium">{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${percentage}%`}
      </text>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Category Distribution */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">카테고리별 주문 분포</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={CustomLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend with Stats */}
          <div className="space-y-3">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium text-gray-800">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{category.value}건</div>
                  <div className="text-sm text-gray-500">{category.percentage}%</div>
                </div>
              </div>
            ))}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-lg font-bold text-blue-900">
                {categoryData.reduce((sum, cat) => sum + cat.value, 0)}건
              </div>
              <div className="text-sm text-blue-600">총 주문 수</div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Distribution */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">시간대별 주문 분포</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="time" 
                stroke="#6B7280"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value}건`, '주문 수']}
              />
              <Bar 
                dataKey="orders" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Store Performance */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">매장별 성과</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={storeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="store" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  name === 'sales' ? formatCurrency(Number(value)) : `${value}건`,
                  name === 'sales' ? '매출' : '주문 수'
                ]}
              />
              <Bar 
                dataKey="sales" 
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderDistributionChart;
