import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Globe, Target, DollarSign } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      value: "400%",
      label: "Yield Increase",
      description: "Modern hives produce 20-40kg vs 5-10kg traditional",
      color: "text-amber-600",
      bgColor: "from-amber-50 to-amber-100",
      icon: TrendingUp,
      accent: "border-amber-200"
    },
    {
      value: "98%",
      label: "Export Untapped",
      description: "Kenya exports only 2% of honey production potential",
      color: "text-green-600",
      bgColor: "from-green-50 to-green-100",
      icon: Globe,
      accent: "border-green-200"
    },
    {
      value: "5km",
      label: "Pollination Radius",
      description: "Environmental impact per hive monetized as carbon credits",
      color: "text-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      icon: Target,
      accent: "border-blue-200"
    },
    {
      value: "$2M",
      label: "Capital Gap",
      description: "Investment needed for modern hive adoption",
      color: "text-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      icon: DollarSign,
      accent: "border-purple-200"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background geometric pattern */}
      <div className="absolute inset-0 hexagon-pattern opacity-30"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Opportunity in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kenya's beekeeping sector has massive untapped potential. BeeTrace bridges the gap 
            between traditional practices and modern, sustainable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className={`card-modern border-none shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br ${stat.bgColor} ${stat.accent} stagger-animation geometric-accent relative overflow-hidden`}>
              <CardContent className="p-8 text-center relative z-10">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>

                {/* Value */}
                <div className={`text-5xl font-bold ${stat.color} mb-3 transition-all duration-300 hover:scale-110`}>
                  {stat.value}
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  {stat.description}
                </p>

                {/* Progress bar decoration */}
                <div className="mt-4 h-1 bg-white rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${stat.color.replace('text-', 'from-').replace('-600', '-400')} ${stat.color.replace('text-', 'to-').replace('-600', '-600')} rounded-full animate-pulse`} 
                       style={{width: `${75 + index * 5}%`}}></div>
                </div>
              </CardContent>

              {/* Geometric corner accent */}
              <div className="geometric-corner"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;