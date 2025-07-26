import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  MapPin,
  CirclePlus,
  DollarSign,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { CreateHiveThunk } from "@/Redux/action/CreateHive";

const AddBeehive = ({ fetchBeehives }) => {
  const [formData, setFormData] = useState({
    location: "",
    county: "",
    installationDate: undefined,
    estimatedYield: "",
    targetInvestment: "",
  });
  const [formProgress, setFormProgress] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { load, error } = useSelector((state) => state.CreateHive || {});

  // Calculate form completion progress
  const calculateProgress = () => {
    const fields = ["location", "county", "estimatedYield", "targetInvestment"];
    const completed = fields.filter((field) => formData[field]).length;
    const dateCompleted = formData.installationDate ? 1 : 0;
    return ((completed + dateCompleted) / 5) * 100;
  };

  useEffect(() => {
    setFormProgress(calculateProgress());
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormProgress(calculateProgress());
  };

  const registerBeehive = async () => {
    if (
      !formData.location ||
      !formData.county ||
      !formData.installationDate ||
      !formData.estimatedYield ||
      !formData.targetInvestment
    ) {
      toast({
        title: "Form Incomplete",
        description:
          "Please fill in all fields before registering the beehive.",
        variant: "destructive",
      });
      return;
    }

    // Prepare data for backend
    const cleanData = {
      location: formData.location,
      county: formData.county,
      installationDate: formData.installationDate.toISOString(),
      estimatedYield: parseFloat(formData.estimatedYield),
      targetInvestment: parseFloat(formData.targetInvestment),
    };

    try {
      // Wait for the beehive creation to complete
      await dispatch(CreateHiveThunk(cleanData));

      // Generate beehive ID for success message
      const hiveId = `BH-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 1000)
      ).padStart(3, "0")}`;

      toast({
        title: "Beehive Registered Successfully!",
        description: `Beehive ${hiveId} has been added to your apiary.`,
      });

      navigate("/dashboard?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai");

      // Fetch the updated beehives data
      if (fetchBeehives) {
        await fetchBeehives();
      }
    } catch (error) {
      console.error("Beehive registration failed:", error);
      toast({
        title: "Registration Failed",
        description: "Failed to register beehive. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Add New Beehive
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Register a new beehive in your apiary to start tracking production,
            attract investments, and build your sustainable beekeeping business.
          </p>
        </div>

        {/* Form Section */}
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CirclePlus className="h-5 w-5 text-orange-500" />
              <span>Beehive Details</span>
            </CardTitle>
            <CardDescription>
              Enter information about your new beehive to register it in your
              apiary
            </CardDescription>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Form Completion</span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(formProgress)}%
                </span>
              </div>
              <Progress value={formProgress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Beehive Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  placeholder="e.g., Mwingi Farm, Site A, GPS: -0.9345, 38.0604"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* County */}
            <div className="space-y-2">
              <Label htmlFor="county">County</Label>
              <Select
                onValueChange={(value) => handleInputChange("county", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select county" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kitui">Kitui</SelectItem>
                  <SelectItem value="machakos">Machakos</SelectItem>
                  <SelectItem value="makueni">Makueni</SelectItem>
                  <SelectItem value="meru">Meru</SelectItem>
                  <SelectItem value="embu">Embu</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Installation Date */}
            <div className="space-y-2">
              <Label>Installation Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.installationDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.installationDate
                      ? format(formData.installationDate, "PPP")
                      : "Pick installation date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.installationDate}
                    onSelect={(date) =>
                      setFormData((prev) => ({
                        ...prev,
                        installationDate: date,
                      }))
                    }
                    disabled={(date) =>
                      date > new Date() || date < new Date("2020-01-01")
                    }
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Estimated Yield */}
            <div className="space-y-2">
              <Label htmlFor="estimatedYield">
                Estimated Annual Yield (kg)
              </Label>
              <Input
                id="estimatedYield"
                type="number"
                step="0.1"
                placeholder="e.g., 30.5"
                value={formData.estimatedYield}
                onChange={(e) =>
                  handleInputChange("estimatedYield", e.target.value)
                }
              />
              <p className="text-xs text-gray-500">
                Expected honey production per year from this hive
              </p>
            </div>

            {/* Target Investment */}
            <div className="space-y-2">
              <Label htmlFor="targetInvestment">Target Investment ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="targetInvestment"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 500.00"
                  value={formData.targetInvestment}
                  onChange={(e) =>
                    handleInputChange("targetInvestment", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-gray-500">
                Amount needed for hive setup, maintenance, and equipment
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">
                  {error.message || "An error occurred. Please try again."}
                </p>
              </div>
            )}

            {/* Register Button */}
            <Button
              onClick={registerBeehive}
              disabled={load || formProgress < 100}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
            >
              {load ? (
                <div className="flex items-center space-x-2">
                  <BeatLoader color="white" loading={load} size={8} />
                  <span>Registering Beehive...</span>
                </div>
              ) : (
                "Register Beehive"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddBeehive;