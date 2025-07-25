import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    console.log("Selected role:", role);
    setSelectedRole(role);

    // Save role to localStorage
    localStorage.setItem("userRole", role);

    // Redirect to appropriate dashboard
    if (role === "beekeeper") {
      console.log("Navigating to beekeeper dashboard");
      navigate("/dashboard?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai");
    } else {
      console.log("Navigating to investor dashboard");
      navigate("/investor-dashboard?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai");
    }
  };

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Choose Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Role
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Select how you want to participate in the BeeTrace platform
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card
              className={`hover:shadow-lg transition-all cursor-pointer border-2 ${
                selectedRole === "beekeeper"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => handleRoleSelection("beekeeper")}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 bg-gradient-to-r from-primary to-secondary rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Beekeeper</CardTitle>
                <CardDescription>
                  Track your hives, manage honey production, and sell directly
                  to consumers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Monitor hive health and productivity</li>
                  <li>• Track honey harvests and quality</li>
                  <li>• Access marketplace to sell products</li>
                  <li>• Build reputation with transparency</li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className={`hover:shadow-lg transition-all cursor-pointer border-2 ${
                selectedRole === "investor"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => handleRoleSelection("investor")}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 bg-gradient-to-r from-secondary to-primary rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Investor</CardTitle>
                <CardDescription>
                  Support beekeepers and earn returns through honey production
                  investments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Invest in hive development projects</li>
                  <li>• Track ROI through honey sales</li>
                  <li>• Support sustainable beekeeping</li>
                  <li>• Access detailed analytics</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              You can change your role later in your profile settings
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RoleSelection;
