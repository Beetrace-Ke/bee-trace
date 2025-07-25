import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, MapPin, CircleCheck, ArrowUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { getBeeKeeperByOwner } from '@/Redux/action/GetBeeKeeperByOwner';
import { Notification } from "@/components/utils/Notifications";
import Loader from "@/components/utils/Loader";

const Profile = () => {
  const dispatch = useDispatch();
  
  // Get state from Redux store
  const { beeKeeper, loading, error } = useSelector((state) => state.beekeeper);

  const fetchBeeKeeper = () => {
    dispatch(getBeeKeeperByOwner());
  };

  useEffect(() => {
    fetchBeeKeeper();
  }, []);

  // Fallback data 
  const getUserProfile = () => {
    if (beeKeeper) {
      return {
        name: `${beeKeeper.firstName || ''} ${beeKeeper.lastName || ''}`.trim() || "Beekeeper",
        email: beeKeeper.email || "Not provided",
        location: beeKeeper.address || "Location not set",
        memberSince: beeKeeper.createdAt ? new Date(beeKeeper.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently joined",
        walletBalance: {
          bee: beeKeeper.walletBalance?.bee || 0,
          icp: beeKeeper.walletBalance?.icp || 0
        },
        totalEarnings: beeKeeper.totalEarnings || 0,
        verification: beeKeeper.isVerified ? "Verified Beekeeper" : "Pending Verification"
      };
    }
    
    // Fallback data
    return {
      name: "Beekeeper",
      email: "Not provided",
      location: "Location not set",
      memberSince: "Recently joined",
      walletBalance: {
        bee: 0,
        icp: 0
      },
      totalEarnings: 0,
      verification: "Pending Verification"
    };
  };

  const userProfile = getUserProfile();

  const myBatches = beeKeeper?.batches || [
    {
      id: "HK-2025-001",
      quantity: "25kg",
      location: "Farm Site A",
      harvestDate: "2025-01-05",
      quality: "Organic Certified",
      status: "NFT Minted",
      buyers: 3
    },
    {
      id: "HK-2025-002", 
      quantity: "18kg",
      location: "Farm Site B",
      harvestDate: "2025-01-12",
      quality: "Premium Grade",
      status: "NFT Minted",
      buyers: 2
    }
  ];

  const myInvestments = beeKeeper?.investments || [
    {
      project: "Modern Hives Project",
      invested: 200,
      currentValue: 218,
      return: 9.0,
      status: "Active"
    },
    {
      project: "Quality Upgrade Initiative",
      invested: 150,
      currentValue: 165,
      return: 10.0,
      status: "Active"
    }
  ];

  const myCredits = beeKeeper?.carbonCredits || [
    {
      id: "CC-2025-001",
      tonnes: 2.5,
      area: "78.5 km²",
      status: "Listed",
      price: 55
    },
    {
      id: "CC-2025-002",
      tonnes: 1.8,
      area: "56.3 km²", 
      status: "Available",
      price: null
    }
  ];

  if (!beeKeeper && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Card className="border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
              <p className="text-gray-600 mb-4">Please complete your beekeeper profile first.</p>
              <Button onClick={fetchBeeKeeper} className="bg-amber-500 hover:bg-amber-600 text-white">
                Retry Loading Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <Notification />
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50">
          <Navbar />
          
          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Profile Header */}
            <Card className="border-none shadow-lg mb-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={beeKeeper?.profileImage || "/placeholder-avatar.jpg"} />
                    <AvatarFallback className="text-xl font-bold bg-amber-100 text-amber-700">
                      {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
                        <div className="flex items-center space-x-2 text-gray-600 mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{userProfile.location}</span>
                        </div>
                        {beeKeeper?.phoneNumber && (
                          <p className="text-sm text-gray-500 mt-1">Phone: {beeKeeper.phoneNumber}</p>
                        )}
                      </div>
                      <Badge className={`mt-2 md:mt-0 ${
                        beeKeeper?.isVerified 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        <CircleCheck className="h-3 w-3 mr-1" />
                        {userProfile.verification}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Member Since</span>
                        <p className="font-medium">{userProfile.memberSince}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">$BEE Balance</span>
                        <p className="font-medium text-amber-600">{userProfile.walletBalance.bee}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">ICP Balance</span>
                        <p className="font-medium text-blue-600">{userProfile.walletBalance.icp}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Earnings</span>
                        <p className="font-medium text-green-600">${userProfile.totalEarnings}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    Download History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Tabs */}
            <Tabs defaultValue="batches" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="batches">My Batches</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
                <TabsTrigger value="credits">Carbon Credits</TabsTrigger>
              </TabsList>

              <TabsContent value="batches" className="space-y-4">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Honey Batch History</CardTitle>
                    <CardDescription>
                      All your tracked honey batches with NFT verification
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {myBatches.length > 0 ? (
                      <div className="space-y-4">
                        {myBatches.map((batch) => (
                          <div key={batch.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <div className="flex-grow">
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge variant="outline" className="border-amber-500 text-amber-700">
                                  {batch.id}
                                </Badge>
                                <Badge className={
                                  batch.status === 'NFT Minted' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-blue-100 text-blue-700'
                                }>
                                  {batch.status}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600">Quantity:</span>
                                  <p className="font-medium">{batch.quantity}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Location:</span>
                                  <p className="font-medium">{batch.location}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Harvest Date:</span>
                                  <p className="font-medium">{batch.harvestDate}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Quality:</span>
                                  <p className="font-medium">{batch.quality}</p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Interested Buyers</div>
                              <div className="text-lg font-bold text-green-600">{batch.buyers || 0}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No honey batches tracked yet.</p>
                        <Button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white">
                          Start Tracking Honey
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="investments" className="space-y-4">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Investment Portfolio</CardTitle>
                    <CardDescription>
                      Your investments in beekeeping projects across Kenya
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {myInvestments.length > 0 ? (
                      <div className="space-y-4">
                        {myInvestments.map((investment, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex-grow">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-medium text-gray-900">{investment.project}</h3>
                                <Badge className={
                                  investment.status === 'Active' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-blue-100 text-blue-700'
                                }>
                                  {investment.status}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600">Invested:</span>
                                  <p className="font-medium">${investment.invested}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Current Value:</span>
                                  <p className="font-medium">${investment.currentValue}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Return Rate:</span>
                                  <p className="font-medium">{investment.return}%</p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-green-600">
                                <ArrowUp className="h-4 w-4 mr-1" />
                                <span className="font-bold">
                                  +${investment.currentValue - investment.invested}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No investments made yet.</p>
                        <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">
                          Browse Investment Opportunities
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="credits" className="space-y-4">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Carbon Credits Portfolio</CardTitle>
                    <CardDescription>
                      Environmental impact credits from your beekeeping activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {myCredits.length > 0 ? (
                      <div className="space-y-4">
                        {myCredits.map((credit) => (
                          <div key={credit.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex-grow">
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge variant="outline" className="border-blue-500 text-blue-700">
                                  {credit.id}
                                </Badge>
                                <Badge className={
                                  credit.status === 'Available' 
                                    ? 'bg-green-100 text-green-700' 
                                    : credit.status === 'Listed'
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-gray-100 text-gray-700'
                                }>
                                  {credit.status}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600">CO₂ Equivalent:</span>
                                  <p className="font-medium">{credit.tonnes} tonnes</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Pollination Area:</span>
                                  <p className="font-medium">{credit.area}</p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              {credit.price ? (
                                <div>
                                  <div className="text-sm text-gray-600">
                                    {credit.status === 'Sold' ? 'Sold for' : 'Listed at'}
                                  </div>
                                  <div className="text-lg font-bold text-green-600">${credit.price}</div>
                                </div>
                              ) : (
                                <div className="text-sm text-gray-600">Not Listed</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No carbon credits generated yet.</p>
                        <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                          Learn About Carbon Credits
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;