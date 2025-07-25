import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUp,
  CircleCheck,
  Sparkles,
  Hexagon,
  Zap,
  Leaf,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Enhanced Background with multiple layers and more geometric elements */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/20 to-secondary/10"></div>

        {/* Multiple honeycomb patterns with different sizes and positions */}
        <div className="absolute inset-0 honeycomb-pattern animate-honeycomb-shift"></div>
        <div className="absolute inset-0 honeycomb-pattern-dense opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full hexagon-pattern opacity-30"></div>

        {/* Large geometric accent shapes */}
        <div className="absolute top-10 right-10 w-40 h-40 opacity-10">
          <Hexagon className="w-full h-full text-primary animate-geometric-rotate" />
        </div>
        <div className="absolute bottom-10 left-10 w-32 h-32 opacity-10">
          <Hexagon
            className="w-full h-full text-secondary animate-geometric-rotate"
            style={{ animationDelay: "2s" }}
          />
        </div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 opacity-15">
          <Hexagon
            className="w-full h-full text-primary/80 animate-geometric-rotate"
            style={{ animationDelay: "4s" }}
          />
        </div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 opacity-15">
          <Hexagon
            className="w-full h-full text-secondary/80 animate-geometric-rotate"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Additional geometric elements */}
        <div className="absolute top-20 left-1/2 w-16 h-16 opacity-20">
          <Zap className="w-full h-full text-primary/60 animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-14 h-14 opacity-20">
          <Leaf className="w-full h-full text-secondary/60 animate-bounce" />
        </div>

        {/* Floating honeycomb cells */}
        <div className="absolute top-1/4 left-1/6 w-8 h-8 opacity-25">
          <div className="w-full h-full bg-amber-300 transform rotate-45 animate-float"></div>
        </div>
        <div className="absolute top-3/4 right-1/6 w-6 h-6 opacity-25">
          <div
            className="w-full h-full bg-green-300 transform rotate-45 animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
        <div className="absolute top-1/2 left-1/12 w-10 h-10 opacity-20">
          <div
            className="w-full h-full bg-amber-400 transform rotate-45 animate-float"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        {/* Large background geometric shapes */}
        <div className="absolute -top-20 -right-20 w-80 h-80 opacity-5">
          <div className="w-full h-full border-4 border-amber-300 transform rotate-12 rounded-full"></div>
        </div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 opacity-5">
          <div className="w-full h-full border-4 border-green-300 transform -rotate-12"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Centered Content */}
        <div className="text-center space-y-8">
          <div className="space-y-6 animate-slide-up max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="glass-card bg-primary/10 text-primary border-primary/20 backdrop-blur-sm px-4 py-2"
            >
              <CircleCheck className="h-4 w-4 mr-2" />
              Powered by Internet Computer (ICP)
              <Sparkles className="h-3 w-3 ml-2 text-primary/70" />
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Trace, Fund,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary">
                Sustain
              </span>{" "}
              Kenyan Honey
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Empower 2 million Kenyan beekeepers with blockchain-powered honey
              traceability, tokenized crowdfunding, and pollination carbon
              credits marketplace.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link to="/wallet-login?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
              <Button
                size="lg"
                className="btn-modern bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Connect Wallet
                <ArrowUp className="ml-2 h-5 w-5 rotate-45" />
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button
                size="lg"
                variant="outline"
                className="btn-modern border-2 border-secondary text-secondary hover:bg-secondary/10 font-semibold px-8 py-4 h-auto glass-card transition-all duration-300"
              >
                Explore Marketplace
              </Button>
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div
            className="grid grid-cols-3 gap-8 pt-8 border-t border-border animate-slide-up max-w-2xl mx-auto"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-center group">
              <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                11K
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Current Tonnes
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-primary/60 to-primary mx-auto mt-2 rounded-full"></div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-secondary group-hover:scale-110 transition-transform duration-300">
                55K
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Potential Tonnes
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-secondary/60 to-secondary mx-auto mt-2 rounded-full"></div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-accent-foreground group-hover:scale-110 transition-transform duration-300">
                2M
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Beekeepers
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-accent-foreground/60 to-accent-foreground mx-auto mt-2 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
