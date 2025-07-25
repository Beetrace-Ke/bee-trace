import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Building2, Phone, Mail, Briefcase } from 'lucide-react';
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { CreateInvestorProfileThunk } from "@/Redux/action/CreateInvestorProfile";

const InvestorSignup = ({ fetchInvestor }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const dispatch = useDispatch();
  
  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch,
    formState: { errors } 
  } = useForm();

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
      phoneNumber,
      location,
      investorType
    } = data;
    
    // Clean data to match backend InvestorProfilePayload exactly
    const cleanData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      location,
      investorType
    }
    
    try {
      // Wait for the profile creation to complete
      await dispatch(CreateInvestorProfileThunk(cleanData));

      // Fetch the updated investor data
      await fetchInvestor();
    } catch (error) {
      console.error("Profile creation failed:", error);
    }
  }

  const { load, error } = useSelector((state) => state.CreateInvestorProfile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join as an <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Investor</span>
          </h1>
          <p className="text-lg text-gray-600">
            Create your investor profile and start funding beekeeping projects
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800">Investor Registration</CardTitle>
            <CardDescription className="text-gray-600">
              Please provide your details to create your investor profile
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-blue-100">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name *</Label>
                  <Input
                    id="firstName"
                    {...register('firstName', { required: 'First name is required' })}
                    placeholder="Enter your first name"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name *</Label>
                  <Input
                    id="lastName"
                    {...register('lastName', { required: 'Last name is required' })}
                    placeholder="Enter your last name"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200"
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
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    placeholder="your.email@example.com"
                    className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200"
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
                <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    {...register('phoneNumber', { required: 'Phone number is required' })}
                    placeholder="+254 xxx xxx xxx"
                    className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location *</Label>
                <Input
                  id="location"
                  {...register('location', { required: 'Location is required' })}
                  placeholder="e.g., Nairobi, Kenya"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Investor Type */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-blue-100">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Investor Information</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="investorType" className="text-sm font-medium text-gray-700">Investor Type *</Label>
                <Select onValueChange={(value) => setValue('investorType', value)}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select your investor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="Institution">Institution</SelectItem>
                    <SelectItem value="Fund">Fund</SelectItem>
                  </SelectContent>
                </Select>
                {errors.investorType && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    Investment type is required
                  </p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked)}
                  className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <div className="space-y-1">
                  <Label htmlFor="terms" className="text-sm font-medium text-gray-800 cursor-pointer">
                    I agree to the Terms and Conditions and Privacy Policy *
                  </Label>
                  <p className="text-xs text-gray-600">
                    By creating an account, you agree to our terms of service and privacy policy.
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
              className="w-full max-w-md h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={load || !termsAccepted}
            >
              {load ? (
                <div className="flex items-center gap-2">
                  <BeatLoader color="white" loading={load} size={8}/>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Investor Account"
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Additional Links */}
        <div className="text-center mt-8 space-y-3">
          <p className="text-sm text-gray-600">
            Want to become a beekeeper instead?{' '}
            <a href="/beekeeper-signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Sign up as a Beekeeper
            </a>
          </p>
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/wallet-login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Connect your wallet
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestorSignup;