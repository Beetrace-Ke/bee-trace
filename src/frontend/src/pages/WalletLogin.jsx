import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Shield, Zap, Key, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { login } from "@/utils/auth";

const WalletLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setLoadingMessage("Connecting to wallet...");
      
      // Wallet connection logic
      await login();
      
      setLoadingMessage("Checking user profile...");
      
      // Check if user already has a role selected
      const existingRole = localStorage.getItem("userRole");
      
      setLoadingMessage("Redirecting...");
      
      if (existingRole) {
        // User already selected a role, go to their dashboard
        if (existingRole === "beekeeper") {
          navigate('/dashboard?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai');
        } else if (existingRole === "investor") {
          navigate('/investor-dashboard?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai');
        }
      } else {
        // No role selected yet, go to role selection
        navigate('/role-selection?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoadingMessage("Login failed. Please try again.");
      setTimeout(() => {
        setIsLoading(false);
        setLoadingMessage("");
      }, 2000);
    }
  };

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Connect Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Wallet
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose your preferred wallet to access the BeeTrace platform
            </p>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <Card className="w-80">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">Connecting...</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {loadingMessage}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="space-y-4">
            <Card
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={!isLoading ? handleLogin : undefined}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white rounded-lg border">
                    <img
                      src="https://identity.ic0.app/favicon.ico"
                      alt="Internet Identity"
                      className="h-6 w-6"
                    />
                  </div>
                  <div>
                    <CardTitle>Internet Identity</CardTitle>
                    <CardDescription>
                      Secure authentication for Internet Computer
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={!isLoading ? handleLogin : undefined}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>NFID</CardTitle>
                    <CardDescription>
                      Next-generation identity for Web3
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Don't have a wallet?{" "}
              <Link
                to="/learn-wallet"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Learn how to create one
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WalletLogin;