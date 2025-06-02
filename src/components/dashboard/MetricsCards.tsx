
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, ShoppingCart, DollarSign, RefreshCw, Store } from 'lucide-react';

const MetricsCards = () => {
  // Updated mock data to match Korean restaurant metrics
  const metrics = {
    totalSales: 15847300, // Korean Won
    totalOrders: 2847,
    totalCustomers: 1523,
    repeatVisitRate: 72.3,
    averageOrderValue: 15600,
    ordersToday: 89,
    activeStores: 12,
    topStore: '시카파마 강남점'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">총 매출</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-blue-900">
            {formatCurrency(metrics.totalSales)}
          </div>
          <div className="flex items-center space-x-2 text-xs text-blue-600 mt-2">
            <TrendingUp className="h-3 w-3" />
            <span>전월 대비 +15.2%</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">총 주문</CardTitle>
          <ShoppingCart className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-green-900">
            {metrics.totalOrders.toLocaleString()}건
          </div>
          <div className="flex items-center space-x-2 text-xs text-green-600 mt-2">
            <Badge variant="secondary" className="bg-green-200 text-green-800">
              오늘 {metrics.ordersToday}건
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700">총 고객</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-purple-900">
            {metrics.totalCustomers.toLocaleString()}명
          </div>
          <div className="text-xs text-purple-600 mt-2">
            활성 고객 기준
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-700">재방문율</CardTitle>
          <RefreshCw className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-orange-900">
            {metrics.repeatVisitRate}%
          </div>
          <div className="text-xs text-orange-600 mt-2">
            고객 유지율
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-indigo-700">평균 주문 금액</CardTitle>
          <DollarSign className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-indigo-900">
            {formatCurrency(metrics.averageOrderValue)}
          </div>
          <div className="text-xs text-indigo-600 mt-2">
            건당 평균
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-teal-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-teal-700">운영 매장</CardTitle>
          <Store className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-teal-900">
            {metrics.activeStores}개
          </div>
          <div className="text-xs text-teal-600 mt-2">
            최고: {metrics.topStore}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
