import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  MapPin,
  Phone,
  Mail,
  Home,
  Award,
  FileText,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { CreateUserProfileThunk } from "@/Redux/action/CreateUserProfile";

const BeeKeeperSignUp = ({ fetchBeeKeeper }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({});

  const watchedValues = watch();

  const submit = async (data) => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      county,
      location,
      experience,
      certifications,
    } = data;

    // Map experience levels to numbers for backend
    const experienceMap = {
      beginner: 1,
      intermediate: 3,
      experienced: 8,
      expert: 15,
    };

    // Clean data to match BeekeeperProfilePayload
    const cleanData = {
      firstName,
      lastName,
      email,
      phoneNumber: phone,
      county,
      location,
      yearsOfExperience: experienceMap[experience] || 1,
      certifications: certifications ? [certifications] : [],
    };

    try {
      // Wait for the profile creation to complete
      await dispatch(CreateUserProfileThunk(cleanData));

      // Fetch the updated beekeeper data
      await fetchBeeKeeper();
    } catch (error) {
      console.error("Profile creation failed:", error);
    }
  };

  const { load, error } = useSelector((state) => state.CreateUserProfile);

  const kenyanCounties = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Eldoret",
    "Meru",
    "Nyeri",
    "Machakos",
    "Thika",
    "Kitale",
    "Malindi",
    "Kakamega",
    "Kericho",
    "Nanyuki",
    "Voi",
    "Bungoma",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-yellow-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto p-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join as a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">
              Beekeeper
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Create your beekeeper profile and start tracking your hives
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800">
              Beekeeper Registration
            </CardTitle>
            <CardDescription className="text-gray-600">
              Please provide your details to create your beekeeper profile
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-amber-100">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    placeholder="Enter your first name"
                    className="h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-amber-200"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    placeholder="Enter your last name"
                    className="h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-amber-200"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    placeholder="your.email@example.com"
                    className="pl-12 h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-amber-200"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                    placeholder="+254 xxx xxx xxx"
                    className="pl-12 h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-amber-200"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Location Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-amber-100">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Location Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="county"
                    className="text-sm font-medium text-gray-700"
                  >
                    County *
                  </Label>
                  <Select onValueChange={(value) => setValue("county", value)}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-amber-500">
                      <SelectValue placeholder="Select your county" />
                    </SelectTrigger>
                    <SelectContent>
                      {kenyanCounties.map((county) => (
                        <SelectItem key={county} value={county}>
                          {county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.county && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.county.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-sm font-medium text-gray-700"
                  >
                    Specific Location *
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    {...register("location", {
                      required: "Location is required",
                    })}
                    placeholder="e.g., Kiambu Town, Limuru"
                    className="h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-amber-200"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Beekeeping Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-amber-100">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Beekeeping Experience
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="experience"
                    className="text-sm font-medium text-gray-700"
                  >
                    Years of Experience *
                  </Label>
                  <Select
                    onValueChange={(value) => setValue("experience", value)}
                  >
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-amber-500">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">
                        Beginner (0-1 years)
                      </SelectItem>
                      <SelectItem value="intermediate">
                        Intermediate (2-5 years)
                      </SelectItem>
                      <SelectItem value="experienced">
                        Experienced (6-10 years)
                      </SelectItem>
                      <SelectItem value="expert">Expert (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experience && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.experience.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="hiveCount"
                    className="text-sm font-medium text-gray-700"
                  >
                    Number of Hives *
                  </Label>
                  <Input
                    id="hiveCount"
                    type="number"
                    min="0"
                    {...register("hiveCount", {
                      required: "Number of hives is required",
                      min: { value: 0, message: "Number must be 0 or greater" },
                    })}
                    placeholder="0"
                    className="h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-amber-200"
                  />
                  {errors.hiveCount && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.hiveCount.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="certifications"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Award className="h-4 w-4 text-amber-600" />
                  Certifications (Optional)
                </Label>
                <Input
                  id="certifications"
                  type="text"
                  {...register("certifications")}
                  placeholder="e.g., Organic honey certification, Apiary license"
                  className="h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-amber-200"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="bio"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <FileText className="h-4 w-4 text-amber-600" />
                  Bio / Additional Information (Optional)
                </Label>
                <Textarea
                  id="bio"
                  {...register("bio")}
                  placeholder="Tell us about your beekeeping journey, goals, or any additional information..."
                  className="min-h-[100px] border-2 border-gray-200 focus:border-amber-500 focus:ring-amber-200 resize-none"
                  rows={4}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked)}
                  className="mt-1 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium text-gray-800 cursor-pointer"
                  >
                    I agree to the Terms and Conditions and Privacy Policy *
                  </Label>
                  <p className="text-xs text-gray-600">
                    By creating an account, you agree to our terms of service
                    and privacy policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">
                  {error.message || "An error occurred. Please try again."}
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center px-8 pb-8">
            <Button
              type="submit"
              onClick={handleSubmit(submit)}
              className="w-full max-w-md h-12 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={load || !termsAccepted}
            >
              {load ? (
                <div className="flex items-center gap-2">
                  <BeatLoader color="white" loading={load} size={8} />
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Beekeeper Account"
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Additional Links */}
        <div className="text-center mt-8 space-y-3">
          <p className="text-sm text-gray-600">
            Want to invest instead?{" "}
            <a
              href="/investor-signup"
              className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
            >
              Sign up as an Investor
            </a>
          </p>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/wallet-login"
              className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
            >
              Connect your wallet
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeeKeeperSignUp;
