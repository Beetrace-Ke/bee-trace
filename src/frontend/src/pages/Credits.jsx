import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, MapPin, CircleCheck, ArrowUp } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';

const Credits = () => {
  const [listingPrice, setListingPrice] = useState('');
  const [isListing, setIsListing] = useState(false);

  const myCredits = [
    {
      id: 'CC-2025-001',
      title: '2.5 Tonnes CO₂ Equivalent',
      description: 'Pollination services covering 5km radius - Kitui County',
      pollinationArea: '78.5 km²',
      estimatedTrees: '15,670',
      verificationDate: '2025-01-15',
      status: 'Available',
      potentialValue: '$45-65'
    },
    {
      id: 'CC-2025-002',
      title: '1.8 Tonnes CO₂ Equivalent',
      description: 'Mixed agricultural pollination - Machakos County',
      pollinationArea: '56.3 km²',
      estimatedTrees: '11,250',
      verificationDate: '2025-01-10',
      status: 'Listed',
      potentialValue: '$32-48'
    },
    {
      id: 'CC-2025-003',
      title: '3.2 Tonnes CO₂ Equivalent',
      description: 'Forest edge pollination services - Meru County',
      pollinationArea: '95.8 km²',
      estimatedTrees: '19,120',
      verificationDate: '2025-01-08',
      status: 'Available',
      potentialValue: '$58-82'
    }
  ];

  const marketplaceCredits = [
    {
      id: 'MP-001',
      seller: 'Grace Muthoni',
      location: 'Embu County',
      title: '4.1 Tonnes CO₂ Equivalent',
      description: 'Organic farm pollination with biodiversity enhancement',
      price: 75,
      pollinationArea: '115.2 km²',
      verificationDate: '2025-01-12'
    },
    {
      id: 'MP-002',
      seller: 'Peter Mutinda',
      location: 'Makueni County',
      title: '1.5 Tonnes CO₂ Equivalent',
      description: 'Agroforestry system pollination services',
      price: 28,
      pollinationArea: '42.7 km²',
      verificationDate: '2025-01-14'
    },
    {
      id: 'MP-003',
      seller: 'Mary Wanjiku',
      location: 'West Pokot County',
      title: '2.9 Tonnes CO₂ Equivalent',
      description: 'Community forest pollination initiative',
      price: 52,
      pollinationArea: '83.4 km²',
      verificationDate: '2025-01-11'
    }
  ];

  const handleListCredit = async (creditId) => {
    if (!listingPrice || parseFloat(listingPrice) < 1) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price (minimum $1).",
        variant: "destructive"
      });
      return;
    }

    setIsListing(true);
    
    setTimeout(() => {
      toast({
        title: "Credit Listed Successfully!",
        description: `Your carbon credit ${creditId} is now listed for $${listingPrice}.`,
      });
      setIsListing(false);
      setListingPrice('');
    }, 2000);
  };

  return (
    <Layout>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Carbon Credits Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Monetize your hive's pollination impact through verified carbon credits. 
            Each hive creates measurable environmental benefits within a 5km radius.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600 mb-1">1,247</div>
              <div className="text-sm text-gray-600">Credits Generated</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600 mb-1">$34K</div>
              <div className="text-sm text-gray-600">Total Value Traded</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-amber-600 mb-1">892</div>
              <div className="text-sm text-gray-600">Active Hives</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600 mb-1">2,450km²</div>
              <div className="text-sm text-gray-600">Area Pollinated</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="my-credits" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="my-credits">My Carbon Credits</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="my-credits" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {myCredits.map((credit) => (
                <Card key={credit.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={
                        credit.status === 'Available' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }>
                        {credit.status}
                      </Badge>
                      <Badge variant="outline">{credit.id}</Badge>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {credit.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {credit.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Pollination Area:</span>
                        <p className="font-medium">{credit.pollinationArea}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Est. Trees:</span>
                        <p className="font-medium">{credit.estimatedTrees}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Verified:</span>
                        <p className="font-medium">{credit.verificationDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Market Value:</span>
                        <p className="font-medium text-green-600">{credit.potentialValue}</p>
                      </div>
                    </div>

                    {credit.status === 'Available' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold">
                            List for Sale
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>List Carbon Credit</DialogTitle>
                            <DialogDescription>
                              Set your selling price for {credit.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="price">Listing Price (USD)</Label>
                              <Input
                                id="price"
                                type="number"
                                placeholder="e.g., 55"
                                value={listingPrice}
                                onChange={(e) => setListingPrice(e.target.value)}
                              />
                              <p className="text-xs text-gray-600">
                                Suggested range: {credit.potentialValue}
                              </p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-medium text-blue-900 mb-2">Credit Details:</h4>
                              <div className="text-sm text-blue-800 space-y-1">
                                <p>• {credit.title}</p>
                                <p>• Pollination area: {credit.pollinationArea}</p>
                                <p>• Estimated trees pollinated: {credit.estimatedTrees}</p>
                                <p>• Verification date: {credit.verificationDate}</p>
                              </div>
                            </div>

                            <Button 
                              onClick={() => handleListCredit(credit.id)}
                              disabled={isListing}
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                            >
                              {isListing ? (
                                <div className="flex items-center space-x-2">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                  <span>Listing...</span>
                                </div>
                              ) : (
                                `List for $${listingPrice || '0'}`
                              )}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}

                    {credit.status === 'Listed' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 text-blue-700">
                          <CircleCheck className="h-4 w-4" />
                          <span className="font-medium text-sm">Listed on Marketplace</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {marketplaceCredits.map((credit) => (
                <Card key={credit.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">{credit.seller}</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        ${credit.price}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{credit.location}</span>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {credit.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {credit.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Pollination Area:</span>
                        <p className="font-medium">{credit.pollinationArea}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Verified:</span>
                        <p className="font-medium">{credit.verificationDate}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <span className="text-2xl font-bold text-green-600">${credit.price}</span>
                        <span className="text-sm text-gray-600 ml-1">USD</span>
                      </div>
                      <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold">
                        Purchase Credit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* How Carbon Credits Work */}
        <Card className="border-none shadow-lg mt-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">How Carbon Credits Work</CardTitle>
            <CardDescription className="text-lg">
              Understanding the environmental impact of your beekeeping activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Pollination Services</h3>
                <p className="text-gray-600">Your bees pollinate plants within a 5km radius, enhancing biodiversity and food production.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CircleCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Impact Verification</h3>
                <p className="text-gray-600">Environmental benefits are measured and verified using satellite data and IoT sensors.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowUp className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Monetize Impact</h3>
                <p className="text-gray-600">Sell verified carbon credits to organizations seeking to offset their environmental footprint.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Credits;