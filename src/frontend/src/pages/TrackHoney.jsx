import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
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
  CircleCheck,
  Search,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { CreateHoneyBatchThunk } from "@/Redux/action/CreateHoneyBatch";
import { GetMyHivesThunk } from "@/Redux/action/GetMyHives";

const formatQuality = (quality) => {
  const capitalizedQuality = quality.charAt(0).toUpperCase() + quality.slice(1);
  return { [capitalizedQuality]: "" };
};

// Utility function to extract variant key for display
const getDisplayStatus = (status) => {
  if (typeof status === "string") return status;
  if (status && typeof status === "object") {
    const keys = Object.keys(status);
    return keys.length > 0 ? keys[0] : "Unknown";
  }
  return "Unknown";
};

// Utility function to extract variant key for styling
const extractVariantKey = (variant) => {
  if (typeof variant === "string") return variant;
  if (variant && typeof variant === "object") {
    const keys = Object.keys(variant);
    return keys.length > 0 ? keys[0] : null;
  }
  return null;
};

const getHiveStatusColor = (status) => {
  const statusString = extractVariantKey(status)?.toLowerCase() || "";

  switch (statusString) {
    case "active":
      return "bg-green-100 text-green-700";
    case "inactive":
      return "bg-red-100 text-red-700";
    case "maintenance":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const TrackHoney = () => {
  const [formData, setFormData] = useState({
    hiveId: "",
    location: "",
    county: "",
    quantity: "",
    quality: "",
    harvestDate: undefined,
  });
  const [generatedNFT, setGeneratedNFT] = useState(null);
  const [formProgress, setFormProgress] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const dispatch = useDispatch();
  const { load, CreateHoneyBatch, error } = useSelector(
    (state) => state.CreateHoneyBatch
  );
  const {
    load: hivesLoading,
    GetMyHives: myHives,
    error: hivesError,
  } = useSelector((state) => state.GetMyHives);

  // Fetch hives on component mount
  useEffect(() => {
    dispatch(GetMyHivesThunk());
  }, [dispatch]);

  // Calculate form completion progress
  const calculateProgress = () => {
    const fields = ["hiveId", "location", "county", "quantity", "quality"];
    const completed = fields.filter((field) => formData[field]).length;
    const dateCompleted = formData.harvestDate ? 1 : 0;
    return ((completed + dateCompleted) / 6) * 100;
  };

  useEffect(() => {
    setFormProgress(calculateProgress());
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-populate location and county when hive is selected
    if (field === "hiveId" && myHives) {
      const selectedHive = myHives.find((hive) => hive.id === value);
      if (selectedHive) {
        setFormData((prev) => ({
          ...prev,
          [field]: value,
          location: selectedHive.location,
          county: selectedHive.county,
        }));
      }
    }

    setFormProgress(calculateProgress());
  };

  const generateNFT = async () => {
    if (
      !formData.hiveId ||
      !formData.location ||
      !formData.county ||
      !formData.quantity ||
      !formData.quality ||
      !formData.harvestDate
    ) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all fields before generating NFT.",
        variant: "destructive",
      });
      return;
    }

    // Prepare data for backend
    const cleanData = {
      hiveId: formData.hiveId,
      location: formData.location,
      county: formData.county,
      quantity: parseInt(formData.quantity),
      quality: formatQuality(formData.quality),
      harvestDate: formData.harvestDate.toISOString(),
    };

    try {
      // Dispatch the Redux action
      const result = await dispatch(CreateHoneyBatchThunk(cleanData));

      // If successful, create the NFT preview
      if (result.type === "CreateHoneyBatch/fulfilled") {
        const batchId = `HK-${new Date().getFullYear()}-${String(
          Math.floor(Math.random() * 1000)
        ).padStart(3, "0")}`;
        setGeneratedNFT({
          id: batchId,
          hiveId: formData.hiveId,
          location: formData.location,
          county: formData.county,
          quantity: formData.quantity,
          quality: formData.quality,
          harvestDate: formData.harvestDate,
          mintedAt: new Date(),
          blockchain: "Internet Computer (ICP)",
          status: "Verified",
        });

        toast({
          title: "NFT Generated Successfully!",
          description: `Honey batch ${batchId} has been recorded on the blockchain.`,
        });
      }
    } catch (error) {
      console.error("Honey batch creation failed:", error);
      toast({
        title: "Creation Failed",
        description: "Failed to create honey batch. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Track Your Honey Batch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create an immutable NFT record for your honey batch to ensure
            authenticity and build consumer trust in the global market.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-amber-500" />
                <span>Honey Batch Details</span>
              </CardTitle>
              <CardDescription>
                Enter information about your honey batch to create a blockchain
                record
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
              {/* Hive Selection */}
              <div className="space-y-2">
                <Label htmlFor="hiveId">Select Hive</Label>
                <Select
                  value={formData.hiveId}
                  onValueChange={(value) => handleInputChange("hiveId", value)}
                  disabled={hivesLoading}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        hivesLoading
                          ? "Loading hives..."
                          : myHives?.length === 0
                          ? "No hives available"
                          : "Select a hive"
                      }
                    >
                      {formData.hiveId && `Hive ID: ${formData.hiveId}`}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {hivesLoading ? (
                      <SelectItem value="loading" disabled>
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Loading hives...</span>
                        </div>
                      </SelectItem>
                    ) : myHives && myHives.length > 0 ? (
                      myHives.map((hive) => (
                        <SelectItem key={hive.id} value={hive.id}>
                          <div className="flex flex-col w-full">
                            <span className="font-medium">
                              Hive ID: {hive.id}
                            </span>
                            <span className="text-sm text-gray-500">
                              {hive.location} • {hive.county}
                            </span>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                className={`text-xs ${getHiveStatusColor(
                                  hive.status
                                )}`}
                              >
                                {getDisplayStatus(hive.status)}
                              </Badge>
                              <span className="text-xs text-gray-400">
                                Est. Yield: {hive.estimatedYield}kg
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-hives" disabled>
                        No hives found. Please create a hive first.
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {hivesError && (
                  <p className="text-sm text-red-600">
                    Failed to load hives. Please refresh the page.
                  </p>
                )}
              </div>

              {/* Location - Auto-populated from selected hive */}
              <div className="space-y-2">
                <Label htmlFor="location">Farm Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="Location will be auto-filled when you select a hive"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="pl-10"
                    disabled={!formData.hiveId}
                  />
                </div>
                {formData.hiveId && (
                  <p className="text-xs text-blue-600">
                    Auto-populated from selected hive. You can modify if needed.
                  </p>
                )}
              </div>

              {/* County - Auto-populated from selected hive */}
              <div className="space-y-2">
                <Label htmlFor="county">County</Label>
                <Select
                  value={formData.county}
                  onValueChange={(value) => handleInputChange("county", value)}
                  disabled={!formData.hiveId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="County will be auto-filled when you select a hive" />
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
                {formData.hiveId && (
                  <p className="text-xs text-blue-600">
                    Auto-populated from selected hive. You can modify if needed.
                  </p>
                )}
              </div>

              {/* Harvest Date */}
              <div className="space-y-2">
                <Label>Harvest Date</Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.harvestDate && "text-muted-foreground"
                      )}
                      disabled={!formData.hiveId}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.harvestDate
                        ? format(formData.harvestDate, "PPP")
                        : "Pick harvest date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.harvestDate}
                      onSelect={(date) => {
                        setFormData((prev) => ({ ...prev, harvestDate: date }));
                        setCalendarOpen(false);
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("2020-01-01")
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (kg)</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="e.g., 25"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", e.target.value)
                  }
                  disabled={!formData.hiveId}
                />
              </div>

              {/* Quality */}
              <div className="space-y-2">
                <Label htmlFor="quality">Quality Grade</Label>
                <Select
                  onValueChange={(value) => handleInputChange("quality", value)}
                  disabled={!formData.hiveId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organic">Organic Certified</SelectItem>
                    <SelectItem value="premium">Premium Grade</SelectItem>
                    <SelectItem value="standard">Standard Grade</SelectItem>
                    <SelectItem value="raw">Raw Unprocessed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Error Display */}
              {(error || hivesError) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">
                    {error?.message ||
                      hivesError?.message ||
                      "An error occurred. Please try again."}
                  </p>
                </div>
              )}

              {/* Generate Button */}
              <Button
                onClick={generateNFT}
                disabled={load || formProgress < 100 || !myHives?.length}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3"
              >
                {load ? (
                  <div className="flex items-center space-x-2">
                    <BeatLoader color="white" loading={load} size={8} />
                    <span>Creating Honey Batch...</span>
                  </div>
                ) : !myHives?.length ? (
                  "No Hives Available - Create a Hive First"
                ) : (
                  "Generate NFT Record"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>NFT Preview</CardTitle>
              <CardDescription>
                Live preview of your honey batch NFT record
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedNFT ? (
                <div className="space-y-4">
                  <div className="p-6 border-2 border-amber-200 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-green-100 text-green-700">
                        <CircleCheck className="h-3 w-3 mr-1" />
                        Verified on ICP
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-amber-500 text-amber-700"
                      >
                        {generatedNFT.id}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Kenyan Honey Batch NFT
                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Hive ID:</span>
                        <p className="font-medium">{generatedNFT.hiveId}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Location:</span>
                        <p className="font-medium">{generatedNFT.location}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">County:</span>
                        <p className="font-medium capitalize">
                          {generatedNFT.county}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Quantity:</span>
                        <p className="font-medium">
                          {generatedNFT.quantity} kg
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Quality:</span>
                        <p className="font-medium">{generatedNFT.quality}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Harvest Date:</span>
                        <p className="font-medium">
                          {format(generatedNFT.harvestDate, "MMM dd, yyyy")}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Minted:</span>
                        <p className="font-medium">
                          {format(generatedNFT.mintedAt, "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-amber-200">
                      <p className="text-xs text-gray-600">
                        Blockchain: {generatedNFT.blockchain} • Status:{" "}
                        {generatedNFT.status}
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-green-700">
                      <CircleCheck className="h-4 w-4" />
                      <span className="font-medium">
                        NFT Successfully Generated!
                      </span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      Your honey batch is now permanently recorded on the
                      Internet Computer blockchain.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No NFT Generated Yet
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Complete the form and click "Generate NFT Record" to see
                    your honey batch NFT preview.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackHoney;