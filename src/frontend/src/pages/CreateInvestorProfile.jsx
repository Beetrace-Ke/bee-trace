import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Building2, DollarSign, Phone, Mail, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const InvestorSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (!data.termsAccepted) {
      toast({
        title: "Error",
        description: "Please accept the terms and conditions",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      localStorage.setItem('userRole', 'investor');
      localStorage.setItem('userProfile', JSON.stringify(data));
      
      toast({
        title: "Registration Successful!",
        description: "Welcome to BeeTrace! Your investor profile has been created.",
      });
      
      navigate('/investor-dashboard');
    }, 2000);
  };

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto p-4 bg-gradient-to-r from-secondary to-primary rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join as an <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Investor</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Create your investor profile and start funding beekeeping projects
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Investor Registration</CardTitle>
              <CardDescription>
                Please provide your details to create your investor profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        {...register('firstName', { required: 'First name is required' })}
                        className={errors.firstName ? 'border-destructive' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        {...register('lastName', { required: 'Last name is required' })}
                        className={errors.lastName ? 'border-destructive' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Please enter a valid email address'
                          }
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        className="pl-10"
                        placeholder="+254 xxx xxx xxx"
                        {...register('phone', { required: 'Phone number is required' })}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Professional Information</h3>
                  
                  <div>
                    <Label htmlFor="organization">Organization/Company (Optional)</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="organization"
                        className="pl-10"
                        placeholder="Your company or organization"
                        {...register('organization')}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="jobTitle">Job Title/Position (Optional)</Label>
                    <Input
                      id="jobTitle"
                      placeholder="e.g., Investment Manager, Financial Advisor"
                      {...register('jobTitle')}
                    />
                  </div>
                </div>

                {/* Investment Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Investment Profile</h3>
                  
                  <div>
                    <Label htmlFor="investmentRange">Investment Range</Label>
                    <Select onValueChange={(value) => setValue('investmentRange', value)}>
                      <SelectTrigger>
                        <DollarSign className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Select your investment range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">$100 - $1,000</SelectItem>
                        <SelectItem value="medium">$1,000 - $10,000</SelectItem>
                        <SelectItem value="large">$10,000 - $50,000</SelectItem>
                        <SelectItem value="institutional">$50,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="investmentExperience">Investment Experience</Label>
                    <Select onValueChange={(value) => setValue('investmentExperience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (New to investing)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (Some experience)</SelectItem>
                        <SelectItem value="experienced">Experienced (Regular investor)</SelectItem>
                        <SelectItem value="professional">Professional (Investment professional)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                    <Select onValueChange={(value) => setValue('riskTolerance', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your risk tolerance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative (Low risk)</SelectItem>
                        <SelectItem value="moderate">Moderate (Medium risk)</SelectItem>
                        <SelectItem value="aggressive">Aggressive (High risk)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="interestAreas">Interest Areas</Label>
                    <Textarea
                      id="interestAreas"
                      placeholder="e.g., Sustainable agriculture, Environmental impact, Technology innovation"
                      rows={2}
                      {...register('interestAreas')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Investment Goals & Bio (Optional)</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your investment goals and interests..."
                      rows={3}
                      {...register('bio')}
                    />
                  </div>
                </div>

                {/* Accreditation */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accredited"
                    onCheckedChange={(checked) => setValue('accreditedInvestor', checked)}
                  />
                  <Label htmlFor="accredited" className="text-sm">
                    I am an accredited investor (optional)
                  </Label>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    onCheckedChange={(checked) => setValue('termsAccepted', checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:text-primary/80 underline">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:text-primary/80 underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Investor Account'}
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Want to become a beekeeper instead?{' '}
                  <Link to="/beekeeper-signup" className="text-primary hover:text-primary/80 font-medium">
                    Sign up as a Beekeeper
                  </Link>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Already have an account?{' '}
                  <Link to="/wallet-login" className="text-primary hover:text-primary/80 font-medium">
                    Connect your wallet
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default InvestorSignup;