
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const OrderDistributionChart = () => {
  // Mock data for order distribution by category - in a real app, this would come from your API
  const categoryData = [
    { name: 'Main Courses', value: 485, percentage: 42.3, color: '#3B82F6' },
    { name: 'Appetizers', value: 267, percentage: 23.3, color: '#10B981' },
    { name: 'Beverages', value: 198, percentage: 17.2, color: '#F59E0B' },
    { name: 'Desserts', value: 123, percentage: 10.7, color: '#EF4444' },
    { name: 'Salads', value: 74, percentage: 6.5, color: '#8B5CF6' }
  ];

  const timeData = [
    { time: '11:00-12:00', orders: 15 },
    { time: '12:00-13:00', orders: 45 },
    { time: '13:00-14:00', orders: 38 },
    { time: '14:00-15:00', orders: 22 },
    { time: '15:00-16:00', orders: 18 },
    { time: '16:00-17:00', orders: 25 },
    { time: '17:00-18:00', orders: 52 },
    { time: '18:00-19:00', orders: 68 },
    { time: '19:00-20:00', orders: 72 },
    { time: '20:00-21:00', orders: 58 },
    { time: '21:00-22:00', orders: 35 }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-blue-600">
            Orders: <span className="font-medium">{data.value}</span>
          </p>
          <p className="text-gray-600">
            Percentage: <span className="font-medium">{data.percentage}%</span>
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

  return (
    <div className="space-y-8">
      {/* Category Distribution */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Orders by Category</h3>
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
                  <div className="font-bold text-gray-900">{category.value}</div>
                  <div className="text-sm text-gray-500">{category.percentage}%</div>
                </div>
              </div>
            ))}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-lg font-bold text-blue-900">
                {categoryData.reduce((sum, cat) => sum + cat.value, 0)}
              </div>
              <div className="text-sm text-blue-600">Total Orders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Distribution */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Orders by Time of Day</h3>
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
    </div>
  );
};

export default OrderDistributionChart;
