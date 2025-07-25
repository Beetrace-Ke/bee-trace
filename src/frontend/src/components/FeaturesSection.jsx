import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, CirclePlus, User, Sparkles, CheckCircle } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Blockchain Traceability",
      description: "Create immutable NFT records for every honey batch, combating adulteration and building consumer trust.",
      badge: "Core Feature",
      badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
      cardGradient: "from-amber-50 via-amber-50 to-white",
      iconGradient: "from-amber-400 to-amber-600",
      benefits: ["Prevent honey adulteration", "Boost export confidence", "Increase market value"]
    },
    {
      icon: CirclePlus,
      title: "Tokenized Crowdfunding",
      description: "Fund modern hives through $BEE tokens, enabling beekeepers to increase yields from 5-10kg to 20-40kg.",
      badge: "Innovation",
      badgeColor: "bg-green-100 text-green-700 border-green-200",
      cardGradient: "from-green-50 via-green-50 to-white",
      iconGradient: "from-green-400 to-green-600",
      benefits: ["Access to modern equipment", "Higher honey yields", "Sustainable returns"]
    },
    {
      icon: User,
      title: "Carbon Credit Trading",
      description: "Monetize pollination services within a 5km radius per hive through blockchain-verified carbon credits.",
      badge: "Environmental",
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
      cardGradient: "from-blue-50 via-blue-50 to-white",
      iconGradient: "from-blue-400 to-blue-600",
      benefits: ["Additional revenue stream", "Environmental impact tracking", "Climate action rewards"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 honeycomb-pattern-dense opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <Badge className="mb-6 bg-gradient-to-r from-amber-100 to-green-100 text-gray-700 border-none px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Platform Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Three Pillars of Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our platform addresses Kenya's beekeeping challenges through innovative blockchain solutions, 
            creating value for beekeepers, investors, and the environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <Card key={index} className={`card-modern border-none shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br ${feature.cardGradient} relative overflow-hidden group stagger-animation`}>
              <CardHeader className="pb-6 relative">
                {/* Icon container with enhanced design */}
                <div className="mb-6 relative">
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${feature.iconGradient} rounded-3xl shadow-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  {/* Floating sparkle */}
                  <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
                </div>

                {/* Badge with enhanced styling */}
                <div className="flex items-center justify-center mb-4">
                  <Badge className={`${feature.badgeColor} px-4 py-1 text-sm font-semibold rounded-full shadow-md`}>
                    {feature.badge}
                  </Badge>
                </div>

                <CardTitle className="text-2xl font-bold text-gray-900 text-center mb-4">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed text-center text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 text-center mb-4 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-center justify-center group/item">
                        <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-green-500 rounded-full mr-3 group-hover/item:scale-125 transition-transform"></div>
                        <span className="text-center">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent line */}
                <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
              </CardContent>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;