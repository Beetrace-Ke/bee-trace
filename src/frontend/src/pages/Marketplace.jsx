
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, TrendingUp, Coins, Users } from 'lucide-react';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';

const Marketplace = () => {
  return (
    <Layout>
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            BeeTrace <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-green-500">Marketplace</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover carbon credits and investment opportunities in sustainable beekeeping
          </p>
        </div>
      </section>

      {/* Marketplace Tabs */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="carbon-credits" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="carbon-credits" className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                Carbon Credits
              </TabsTrigger>
              <TabsTrigger value="investments" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Investment Opportunities
              </TabsTrigger>
            </TabsList>

            <TabsContent value="carbon-credits">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">Pollination Credits #{i}</CardTitle>
                        <Badge variant="secondary">
                          <Leaf className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <CardDescription>
                        Certified pollination services from Kenyan apiaries
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">CO2 Offset:</span>
                          <span className="font-semibold">{10 + i}t CO2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Price:</span>
                          <span className="font-semibold text-green-600">${15 + i * 2}/credit</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Location:</span>
                          <span className="text-sm">Nairobi, Kenya</span>
                        </div>
                        <Button className="w-full mt-4">Purchase Credits</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="investments">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">Hive Expansion Project #{i}</CardTitle>
                        <Badge variant="outline">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                      <CardDescription>
                        Fund sustainable beekeeping operations in Kenya
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Target:</span>
                          <span className="font-semibold">${(5000 + i * 1000).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Raised:</span>
                          <span className="font-semibold text-amber-600">${(2000 + i * 500).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Investors:</span>
                          <span className="text-sm flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {15 + i * 3}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full"
                            style={{ width: `${40 + i * 10}%` }}
                          ></div>
                        </div>
                        <Button className="w-full mt-4">Invest Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

    </Layout>
  );
};

export default Marketplace;
