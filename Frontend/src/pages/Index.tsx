
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { BarChart3, Users, ShoppingCart, TrendingUp, ChefHat, Eye } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Customer Management",
      description: "Browse and filter customer records with detailed contact information and order history."
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      title: "Order Tracking",
      description: "View and manage orders with advanced filtering by date, customer, and status."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Sales Analytics",
      description: "Visualize daily sales trends and track performance over time with interactive charts."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      title: "Key Metrics",
      description: "Monitor total sales, order counts, customer retention, and average order values."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
              <ChefHat className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Restaurant Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Empower your restaurant staff with comprehensive tools to manage customers, track orders, and analyze business performance in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Eye className="mr-2 h-5 w-5" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Preview Section */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
              Comprehensive Restaurant Management
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Everything you need to run your restaurant efficiently
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-3xl font-bold text-blue-900 mb-2">$28,450</div>
                <div className="text-sm text-blue-600">Total Sales</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="text-3xl font-bold text-green-900 mb-2">1,247</div>
                <div className="text-sm text-green-600">Total Orders</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-3xl font-bold text-purple-900 mb-2">523</div>
                <div className="text-sm text-purple-600">Active Customers</div>
              </div>
            </div>
            
            <div className="text-center pt-6">
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  Explore Full Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
