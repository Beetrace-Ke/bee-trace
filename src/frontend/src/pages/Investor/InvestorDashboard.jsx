import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  ArrowUp,
  BarChart3,
  Wallet,
  PieChart,
  Eye,
} from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import Layout from "@/components/Layout";

const InvestorDashboard = ({ investor }) => {
  const {
    id,
    firstName,
    email,
    phoneNumber,
    address,
    totalInvested,
    totalReturns,
    activeProjects,
    averageROI,
    pendingDividends,
  } = investor;

  const [portfolioStats] = useState({
    totalInvested: totalInvested || 15750,
    totalReturns: totalReturns || 2340,
    activeProjects: activeProjects || 8,
    averageROI: averageROI || 14.8,
    pendingDividends: pendingDividends || 450,
  });

  const [investments] = useState([
    {
      id: 1,
      projectName: "Modern Hive Project #23",
      location: "Kitui County",
      invested: 2500,
      currentValue: 2875,
      roi: 15,
      status: "Active",
      nextDividend: "2025-02-15",
    },
    {
      id: 2,
      projectName: "Pollination Network #45",
      location: "Machakos County",
      invested: 1800,
      currentValue: 2106,
      roi: 17,
      status: "Active",
      nextDividend: "2025-02-20",
    },
    {
      id: 3,
      projectName: "Honey Processing Unit #12",
      location: "Meru County",
      invested: 3200,
      currentValue: 3648,
      roi: 14,
      status: "Completed",
      nextDividend: "N/A",
    },
  ]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {firstName || "Investor"}
              </h1>
              <p className="text-gray-600 mt-1">
                Monitor your beekeeping investments and returns
              </p>
              {email && (
                <p className="text-sm text-gray-500 mt-1">Email: {email}</p>
              )}
              {phoneNumber && (
                <p className="text-sm text-gray-500">Phone: {phoneNumber}</p>
              )}
              {address && (
                <p className="text-sm text-gray-500">Address: {Location}</p>
              )}
            </div>
            <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
              <DollarSign className="h-3 w-3 mr-1" />
              Verified Investor
            </Badge>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Invested
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                ${portfolioStats.totalInvested.toLocaleString()}
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                Principal amount
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Returns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                ${portfolioStats.totalReturns.toLocaleString()}
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.3% this quarter
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">
                {portfolioStats.activeProjects}
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <Target className="h-3 w-3 mr-1" />
                All performing well
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Average ROI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {portfolioStats.averageROI}%
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <BarChart3 className="h-3 w-3 mr-1" />
                Above market avg
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Dividends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                ${portfolioStats.pendingDividends}
              </div>
              <div className="flex items-center mt-2 text-sm text-blue-600">
                <Wallet className="h-3 w-3 mr-1" />
                Due this month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <Link to="/invest">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  New Investments
                </CardTitle>
                <CardDescription>
                  Discover new beekeeping projects to fund
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Browse Projects
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-green-400 to-green-500 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PieChart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Portfolio Analysis
              </CardTitle>
              <CardDescription>
                Detailed breakdown of your investments
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Withdraw Funds
              </CardTitle>
              <CardDescription>
                Cash out your returns and dividends
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                Withdraw
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Market Insights
              </CardTitle>
              <CardDescription>
                Honey market trends and forecasts
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                View Insights
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Investment Portfolio */}
        <Card className="border-none shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Active Investments
            </CardTitle>
            <CardDescription>Your current investment portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investments.map((investment) => (
                <div
                  key={investment.id}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {investment.projectName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {investment.location}
                        </p>
                      </div>
                      <Badge
                        variant={
                          investment.status === "Active"
                            ? "default"
                            : "secondary"
                        }
                        className="ml-2"
                      >
                        {investment.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-8 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Invested</p>
                      <p className="font-semibold text-gray-900">
                        ${investment.invested}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Value</p>
                      <p className="font-semibold text-green-600">
                        ${investment.currentValue}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ROI</p>
                      <p className="font-semibold text-blue-600">
                        +{investment.roi}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Next Dividend</p>
                      <p className="font-semibold text-gray-900">
                        {investment.nextDividend}
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="ml-4">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest investment transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Dividend received
                    </p>
                    <p className="text-sm text-gray-600">
                      $125 from Modern Hive Project #23
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">New investment</p>
                    <p className="text-sm text-gray-600">
                      $500 invested in Pollination Network #67
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Project completion
                    </p>
                    <p className="text-sm text-gray-600">
                      Honey Processing Unit #12 reached target yield
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ChatWidget />
    </Layout>
  );
};

export default InvestorDashboard;
