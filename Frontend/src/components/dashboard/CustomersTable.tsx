
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Mail, Phone, MapPin } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  gender: 'M' | 'F';
  totalOrders: number;
  totalSpent: number;
  lastVisit: string;
  registrationDate: string;
  status: 'active' | 'inactive';
  membershipLevel: 'bronze' | 'silver' | 'gold' | 'vip';
}

const CustomersTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [membershipFilter, setMembershipFilter] = useState<'all' | 'bronze' | 'silver' | 'gold' | 'vip'>('all');

  // Updated mock data to match SicPama schema structure
  const customers: Customer[] = [
    {
      id: 10001,
      name: '김민수',
      email: 'kim.minsu@naver.com',
      phone: '010-1234-5678',
      address: '서울시 강남구 역삼동 123-45',
      birthDate: '1985-03-15',
      gender: 'M',
      totalOrders: 24,
      totalSpent: 487500,
      lastVisit: '2024-06-01',
      registrationDate: '2023-08-15',
      status: 'active',
      membershipLevel: 'gold'
    },
    {
      id: 10002,
      name: '박서영',
      email: 'park.seoyoung@gmail.com',
      phone: '010-9876-5432',
      address: '서울시 마포구 홍대동 67-89',
      birthDate: '1992-07-22',
      gender: 'F',
      totalOrders: 18,
      totalSpent: 324000,
      lastVisit: '2024-05-30',
      registrationDate: '2023-11-03',
      status: 'active',
      membershipLevel: 'silver'
    },
    {
      id: 10003,
      name: '이준호',
      email: 'lee.junho@kakao.com',
      phone: '010-5555-7777',
      address: '부산시 해운대구 우동 456-78',
      birthDate: '1988-12-08',
      gender: 'M',
      totalOrders: 31,
      totalSpent: 658200,
      lastVisit: '2024-06-02',
      registrationDate: '2023-06-20',
      status: 'active',
      membershipLevel: 'vip'
    },
    {
      id: 10004,
      name: '최유진',
      email: 'choi.yujin@naver.com',
      phone: '010-3333-4444',
      address: '대구시 중구 동성로 234-56',
      birthDate: '1995-04-30',
      gender: 'F',
      totalOrders: 12,
      totalSpent: 168000,
      lastVisit: '2024-04-15',
      registrationDate: '2024-01-10',
      status: 'inactive',
      membershipLevel: 'bronze'
    },
    {
      id: 10005,
      name: '정민철',
      email: 'jung.minchul@gmail.com',
      phone: '010-8888-9999',
      address: '인천시 연수구 송도동 789-12',
      birthDate: '1983-09-18',
      gender: 'M',
      totalOrders: 42,
      totalSpent: 892300,
      lastVisit: '2024-06-01',
      registrationDate: '2023-03-12',
      status: 'active',
      membershipLevel: 'vip'
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesMembership = membershipFilter === 'all' || customer.membershipLevel === membershipFilter;
    return matchesSearch && matchesStatus && matchesMembership;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMembershipColor = (level: string) => {
    switch (level) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="고객명, 이메일, 전화번호로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
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
            variant={statusFilter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('active')}
          >
            활성
          </Button>
          <Button
            variant={statusFilter === 'inactive' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('inactive')}
          >
            비활성
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={membershipFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMembershipFilter('all')}
          >
            모든 등급
          </Button>
          <Button
            variant={membershipFilter === 'vip' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMembershipFilter('vip')}
          >
            VIP
          </Button>
          <Button
            variant={membershipFilter === 'gold' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMembershipFilter('gold')}
          >
            골드
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        {filteredCustomers.length}명 / 전체 {customers.length}명
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>고객 정보</TableHead>
              <TableHead>연락처</TableHead>
              <TableHead>주문 정보</TableHead>
              <TableHead>멤버십</TableHead>
              <TableHead>최근 방문</TableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-gray-50">
                <TableCell>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-gray-500">ID: {customer.id}</div>
                    <div className="text-xs text-gray-400">
                      가입: {formatDate(customer.registrationDate)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-gray-400" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-gray-400" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {customer.address}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{formatCurrency(customer.totalSpent)}</div>
                    <Badge variant="secondary">{customer.totalOrders}회 주문</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getMembershipColor(customer.membershipLevel)}>
                    {customer.membershipLevel.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(customer.lastVisit)}</TableCell>
                <TableCell>
                  <Badge 
                    variant={customer.status === 'active' ? 'default' : 'secondary'}
                    className={customer.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {customer.status === 'active' ? '활성' : '비활성'}
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

export default CustomersTable;
