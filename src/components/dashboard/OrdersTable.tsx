
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Search, User, Clock, Store } from 'lucide-react';

interface Order {
  id: number;
  customerId: number;
  customerName: string;
  storeId: number;
  storeName: string;
  orderDate: string;
  items: Array<{
    menuName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: 'completed' | 'preparing' | 'cancelled' | 'refunded';
  paymentMethod: 'card' | 'cash' | 'mobile';
  orderType: 'dine-in' | 'takeout' | 'delivery';
}

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'preparing' | 'cancelled' | 'refunded'>('all');
  const [orderTypeFilter, setOrderTypeFilter] = useState<'all' | 'dine-in' | 'takeout' | 'delivery'>('all');
  const [dateFilter, setDateFilter] = useState('');

  // Updated mock data to match SicPama schema structure
  const orders: Order[] = [
    {
      id: 20001,
      customerId: 10001,
      customerName: '김민수',
      storeId: 1,
      storeName: '시카파마 강남점',
      orderDate: '2024-06-02T12:30:00',
      items: [
        { menuName: '스파이시 치킨 버거', quantity: 1, price: 8500 },
        { menuName: '감자튀김 (L)', quantity: 1, price: 3000 },
        { menuName: '콜라 (L)', quantity: 1, price: 2500 }
      ],
      totalAmount: 14000,
      discountAmount: 1000,
      finalAmount: 13000,
      status: 'completed',
      paymentMethod: 'card',
      orderType: 'dine-in'
    },
    {
      id: 20002,
      customerId: 10002,
      customerName: '박서영',
      storeId: 2,
      storeName: '시카파마 홍대점',
      orderDate: '2024-06-02T14:15:00',
      items: [
        { menuName: '치즈 버거 세트', quantity: 1, price: 9500 },
        { menuName: '오니언링', quantity: 1, price: 3500 }
      ],
      totalAmount: 13000,
      discountAmount: 500,
      finalAmount: 12500,
      status: 'preparing',
      paymentMethod: 'mobile',
      orderType: 'takeout'
    },
    {
      id: 20003,
      customerId: 10003,
      customerName: '이준호',
      storeId: 3,
      storeName: '시카파마 부산점',
      orderDate: '2024-06-02T18:45:00',
      items: [
        { menuName: '더블 치킨 버거', quantity: 2, price: 11000 },
        { menuName: '치킨 너겟 (10pc)', quantity: 1, price: 6500 },
        { menuName: '사이다 (L)', quantity: 2, price: 2500 }
      ],
      totalAmount: 33500,
      discountAmount: 2000,
      finalAmount: 31500,
      status: 'completed',
      paymentMethod: 'card',
      orderType: 'delivery'
    },
    {
      id: 20004,
      customerId: 10004,
      customerName: '최유진',
      storeId: 1,
      storeName: '시카파마 강남점',
      orderDate: '2024-06-01T11:20:00',
      items: [
        { menuName: '베지 버거', quantity: 1, price: 7500 },
        { menuName: '스무디 (딸기)', quantity: 1, price: 4000 }
      ],
      totalAmount: 11500,
      discountAmount: 0,
      finalAmount: 11500,
      status: 'cancelled',
      paymentMethod: 'cash',
      orderType: 'dine-in'
    },
    {
      id: 20005,
      customerId: 10005,
      customerName: '정민철',
      storeId: 4,
      storeName: '시카파마 인천점',
      orderDate: '2024-06-01T19:30:00',
      items: [
        { menuName: '프리미엄 스테이크 버거', quantity: 1, price: 13500 },
        { menuName: '웨지 포테이토', quantity: 1, price: 4500 },
        { menuName: '아이스 아메리카노', quantity: 1, price: 3000 }
      ],
      totalAmount: 21000,
      discountAmount: 1500,
      finalAmount: 19500,
      status: 'completed',
      paymentMethod: 'card',
      orderType: 'dine-in'
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm) ||
                         order.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesOrderType = orderTypeFilter === 'all' || order.orderType === orderTypeFilter;
    const matchesDate = !dateFilter || order.orderDate.startsWith(dateFilter);
    return matchesSearch && matchesStatus && matchesOrderType && matchesDate;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderTypeColor = (orderType: string) => {
    switch (orderType) {
      case 'dine-in':
        return 'bg-purple-100 text-purple-800';
      case 'takeout':
        return 'bg-orange-100 text-orange-800';
      case 'delivery':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="고객명, 주문번호, 매장명으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="pl-10 w-full lg:w-48"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            전체
          </Button>
          <Button
            variant={statusFilter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('completed')}
          >
            완료
          </Button>
          <Button
            variant={statusFilter === 'preparing' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('preparing')}
          >
            준비중
          </Button>
          <Button
            variant={statusFilter === 'cancelled' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('cancelled')}
          >
            취소
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={orderTypeFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOrderTypeFilter('all')}
          >
            전체 타입
          </Button>
          <Button
            variant={orderTypeFilter === 'dine-in' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOrderTypeFilter('dine-in')}
          >
            매장식사
          </Button>
          <Button
            variant={orderTypeFilter === 'takeout' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOrderTypeFilter('takeout')}
          >
            포장
          </Button>
          <Button
            variant={orderTypeFilter === 'delivery' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOrderTypeFilter('delivery')}
          >
            배달
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        {filteredOrders.length}건 / 전체 {orders.length}건
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>주문 정보</TableHead>
              <TableHead>고객 & 매장</TableHead>
              <TableHead>주문 일시</TableHead>
              <TableHead>메뉴 내역</TableHead>
              <TableHead>금액</TableHead>
              <TableHead>결제</TableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell>
                  <div>
                    <div className="font-medium">#{order.id}</div>
                    <Badge className={getOrderTypeColor(order.orderType)}>
                      {order.orderType === 'dine-in' ? '매장식사' : 
                       order.orderType === 'takeout' ? '포장' : '배달'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-gray-500">ID: {order.customerId}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Store className="h-3 w-3 text-gray-400" />
                      {order.storeName}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {formatDateTime(order.orderDate)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <div className="text-sm font-medium mb-1">
                      {order.items.length}개 상품
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index}>
                          {item.menuName} x{item.quantity}
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-gray-400">
                          +{order.items.length - 2}개 더
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">
                      {formatCurrency(order.finalAmount)}
                    </div>
                    {order.discountAmount > 0 && (
                      <div className="text-xs text-red-600">
                        할인: -{formatCurrency(order.discountAmount)}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {order.paymentMethod === 'card' ? '카드' : 
                   order.paymentMethod === 'cash' ? '현금' : '모바일'}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status === 'completed' ? '완료' :
                     order.status === 'preparing' ? '준비중' :
                     order.status === 'cancelled' ? '취소' : '환불'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersTable;
