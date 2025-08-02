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
import { Search, CirclePlus, User, ArrowUp, CircleCheck } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import Layout from "@/components/Layout";

const BeeKeeperDashboard = ({ beeKeeper }) => {
  const {
    id,
    firstName,
    email,
    phoneNumber,
    address,
    batchesTracked,
    fundsRaised,
    creditsEarned,
    totalInvestment,
  } = beeKeeper;

  const [userStats] = useState({
    batchesTracked: batchesTracked || 12,
    fundsRaised: fundsRaised || 1250,
    creditsEarned: creditsEarned || 8,
    totalInvestment: totalInvestment || 750,
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {firstName || "Beekeeper"}
              </h1>
              <p className="text-gray-600 mt-1">
                Track your honey, manage investments, and earn carbon credits
              </p>
              {email && (
                <p className="text-sm text-gray-500 mt-1">Email: {email}</p>
              )}
              {phoneNumber && (
                <p className="text-sm text-gray-500">Phone: {phoneNumber}</p>
              )}
              {address && (
                <p className="text-sm text-gray-500">Address: {address}</p>
              )}
            </div>
            <Badge className="bg-green-100 text-green-700 px-3 py-1">
              <CircleCheck className="h-3 w-3 mr-1" />
              Account Verified
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Batches Tracked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">
                {userStats.batchesTracked}
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                +3 this month
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Funds Raised ($)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                ${userStats.fundsRaised}
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                +$450 this month
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Carbon Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {userStats.creditsEarned}
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                +2 this month
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                My Investments ($)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                ${userStats.totalInvestment}
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                8% annual return
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards - Updated to 4 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <Link to="/add-beehive?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CirclePlus className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Add Beehive
                </CardTitle>
                <CardDescription>
                  Register a new beehive to your apiary and start tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Add New Hive
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <Link to="/track-honey?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Track Honey
                </CardTitle>
                <CardDescription>
                  Create NFT records for your honey batches and ensure
                  authenticity
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                  Start Tracking
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <Link to="/invest?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-green-400 to-green-500 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CirclePlus className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Invest Now
                </CardTitle>
                <CardDescription>
                  Fund modern hives and earn returns while supporting beekeepers
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Browse Projects
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <Link to="/credits?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Sell Credits
                </CardTitle>
                <CardDescription>
                  Monetize your hive's pollination impact through carbon credits
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Manage Credits
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest platform interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      New honey batch tracked
                    </p>
                    <p className="text-sm text-gray-600">
                      Batch #HK-2025-012 • 25kg • Kitui County
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Investment received
                    </p>
                    <p className="text-sm text-gray-600">
                      $150 funded for Modern Hive Project #23
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Carbon credit generated
                    </p>
                    <p className="text-sm text-gray-600">
                      1.2 tonnes CO2 equivalent for pollination services
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

export default BeeKeeperDashboard;
