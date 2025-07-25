import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { MapPin, CirclePlus, ArrowUp, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { toast } from '@/hooks/use-toast';

const Invest = () => {
  const [selectedInvestment, setSelectedInvestment] = useState(0);
  const [isInvesting, setIsInvesting] = useState(false);

  const projects = [
    {
      id: 1,
      beekeeper: "Mary Wanjiku",
      location: "Kitui County",
      description: "Modern Langstroth hives to increase honey production from 8kg to 35kg per hive",
      goal: 800,
      funded: 520,
      returnRate: 12,
      timeline: "18 months",
      hivesNeeded: 4,
      currentHives: 2,
      image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      beekeeper: "Peter Mutinda",
      location: "Machakos County",
      description: "Transitioning from traditional log hives to modern frame hives for better honey quality",
      goal: 1200,
      funded: 360,
      returnRate: 15,
      timeline: "24 months",
      hivesNeeded: 6,
      currentHives: 1,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      beekeeper: "Grace Muthoni",
      location: "Meru County",
      description: "Expanding apiary with queen breeding program and modern honey processing equipment",
      goal: 1500,
      funded: 1125,
      returnRate: 10,
      timeline: "20 months",
      hivesNeeded: 8,
      currentHives: 5,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      beekeeper: "Samuel Kiprotich",
      location: "Embu County",
      description: "Establishing new apiary site with modern hives and bee-friendly plants cultivation",
      goal: 600,
      funded: 180,
      returnRate: 8,
      timeline: "12 months",
      hivesNeeded: 3,
      currentHives: 0,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      beekeeper: "Ruth Nyambura",
      location: "Makueni County",
      description: "Organic honey certification and premium packaging equipment for export market",
      goal: 950,
      funded: 665,
      returnRate: 14,
      timeline: "16 months",
      hivesNeeded: 5,
      currentHives: 3,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      beekeeper: "David Ochieng",
      location: "West Pokot County",
      description: "Community beekeeping cooperative with shared processing and marketing facilities",
      goal: 2000,
      funded: 400,
      returnRate: 11,
      timeline: "30 months",
      hivesNeeded: 10,
      currentHives: 2,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop"
    }
  ];

  const handleInvest = async (projectId, amount) => {
    setIsInvesting(true);
    
    // Simulate investment process
    setTimeout(() => {
      const project = projects.find(p => p.id === projectId);
      toast({
        title: "Investment Successful!",
        description: `You've invested $${amount} in ${project?.beekeeper}'s project. Expected return: ${project?.returnRate}% annually.`,
      });
      setIsInvesting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Investment Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fund modern beekeeping equipment and earn returns while supporting 
            Kenyan beekeepers in their journey to higher yields and sustainable practices.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600 mb-1">$127K</div>
              <div className="text-sm text-gray-600">Total Funded</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-amber-600 mb-1">234</div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600 mb-1">12.3%</div>
              <div className="text-sm text-gray-600">Avg Return</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600 mb-1">1,567</div>
              <div className="text-sm text-gray-600">Investors</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const fundedPercentage = (project.funded / project.goal) * 100;
            
            return (
              <Card key={project.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }}>
                  <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{project.beekeeper}</h3>
                      <div className="flex items-center space-x-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-green-100 text-green-700">
                      {project.returnRate}% Annual Return
                    </Badge>
                    <Badge variant="outline">
                      {project.timeline}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-700 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Funding Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">${project.funded} raised</span>
                      <span className="text-gray-600">Goal: ${project.goal}</span>
                    </div>
                    <Progress value={fundedPercentage} className="h-2" />
                    <div className="text-xs text-gray-600 mt-1">
                      {Math.round(fundedPercentage)}% funded
                    </div>
                  </div>

                  {/* Hive Progress */}
                  <div className="flex justify-between text-sm">
                    <span>Current Hives: {project.currentHives}</span>
                    <span>Target: {project.hivesNeeded}</span>
                  </div>

                  {/* Investment Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold">
                        <CirclePlus className="h-4 w-4 mr-2" />
                        Invest Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Invest in {project.beekeeper}'s Project</DialogTitle>
                        <DialogDescription>
                          Choose your investment amount. Minimum $10, Maximum $500.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        <div>
                          <div className="flex justify-between mb-4">
                            <span className="font-medium">Investment Amount</span>
                            <span className="text-lg font-bold text-amber-600">${selectedInvestment}</span>
                          </div>
                          <Slider
                            value={[selectedInvestment]}
                            onValueChange={(value) => setSelectedInvestment(value[0])}
                            max={500}
                            min={10}
                            step={10}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-600 mt-1">
                            <span>$10</span>
                            <span>$500</span>
                          </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Expected Annual Return:</span>
                              <span className="font-semibold text-green-600">{project.returnRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Projected Annual Earnings:</span>
                              <span className="font-semibold text-green-600">
                                ${Math.round(selectedInvestment * (project.returnRate / 100))}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Investment Timeline:</span>
                              <span className="font-semibold">{project.timeline}</span>
                            </div>
                          </div>
                        </div>

                        <Button 
                          onClick={() => handleInvest(project.id, selectedInvestment)}
                          disabled={isInvesting || selectedInvestment < 10}
                          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold"
                        >
                          {isInvesting ? (
                            <div className="flex items-center space-x-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Processing...</span>
                            </div>
                          ) : (
                            `Confirm Investment of $${selectedInvestment}`
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How It Works Section */}
        <Card className="border-none shadow-lg mt-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">How Investment Works</CardTitle>
            <CardDescription className="text-lg">
              Simple, transparent, and secure blockchain-powered investing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CirclePlus className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Choose Project</h3>
                <p className="text-gray-600">Browse vetted beekeeping projects and select one that matches your investment goals.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fund with $BEE</h3>
                <p className="text-gray-600">Invest using our platform tokens, with amounts starting from just $10.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Earn Returns</h3>
                <p className="text-gray-600">Receive annual returns as beekeepers increase their honey production and sales.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Invest;