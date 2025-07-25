import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, MapPin, Phone, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const BeekeeperSignup = () => {
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
      localStorage.setItem('userRole', 'beekeeper');
      localStorage.setItem('userProfile', JSON.stringify(data));
      
      toast({
        title: "Registration Successful!",
        description: "Welcome to BeeTrace! Your beekeeper profile has been created.",
      });
      
      navigate('/dashboard');
    }, 2000);
  };

  const kenyanCounties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Meru", "Nyeri", "Machakos", 
    "Thika", "Kitale", "Malindi", "Kakamega", "Kericho", "Nanyuki", "Voi", "Bungoma"
  ];

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto p-4 bg-gradient-to-r from-primary to-secondary rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join as a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Beekeeper</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Create your beekeeper profile and start tracking your hives
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Beekeeper Registration</CardTitle>
              <CardDescription>
                Please provide your details to create your beekeeper profile
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

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Location</h3>
                  
                  <div>
                    <Label htmlFor="county">County</Label>
                    <Select onValueChange={(value) => setValue('county', value)}>
                      <SelectTrigger>
                        <MapPin className="h-4 w-4 mr-2" />
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
                  </div>

                  <div>
                    <Label htmlFor="location">Specific Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Kiambu Town, Limuru"
                      {...register('location', { required: 'Location is required' })}
                    />
                    {errors.location && (
                      <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
                    )}
                  </div>
                </div>

                {/* Beekeeping Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Beekeeping Experience</h3>
                  
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select onValueChange={(value) => setValue('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                        <SelectItem value="experienced">Experienced (6-10 years)</SelectItem>
                        <SelectItem value="expert">Expert (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="hiveCount">Number of Hives</Label>
                    <Input
                      id="hiveCount"
                      type="number"
                      placeholder="0"
                      {...register('hiveCount', { required: 'Number of hives is required' })}
                    />
                    {errors.hiveCount && (
                      <p className="text-sm text-destructive mt-1">{errors.hiveCount.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="certifications">Certifications (Optional)</Label>
                    <Input
                      id="certifications"
                      placeholder="e.g., Organic honey certification, Apiary license"
                      {...register('certifications')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Brief Bio (Optional)</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your beekeeping journey..."
                      rows={3}
                      {...register('bio')}
                    />
                  </div>
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
                  {isSubmitting ? 'Creating Account...' : 'Create Beekeeper Account'}
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Want to invest instead?{' '}
                  <Link to="/investor-signup" className="text-primary hover:text-primary/80 font-medium">
                    Sign up as an Investor
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

export default BeekeeperSignup;