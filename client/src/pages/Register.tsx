import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';

const registerSchema = z
  .object({
    displayName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const formatAuthError = (err: any) => {
    const code = err?.code || '';
    if (code === 'auth/email-already-in-use') {
      return 'An account with this email address already exists. Please log in instead.';
    }
    if (code === 'auth/weak-password') {
      return 'Password should be at least 6 characters.';
    }
    if (code === 'auth/invalid-email') {
      return 'Please enter a valid email address.';
    }
    return (err as Error).message || 'Registration failed. Please try again.';
  };

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setAuthError(null);
      await registerUser(data.email, data.password, data.displayName);
      navigate('/dashboard');
    } catch (err) {
      setAuthError(formatAuthError(err));
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-slate-200/90 shadow-card">
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block hover:scale-105 transition-transform">
            <img src="/logo.png" alt="TravelMitra" className="h-16 w-auto mx-auto object-contain" />
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create your Mitra Account
          </h2>
          <p className="text-xs text-slate-500">
            Join thousands of Indian travellers enjoying transparent fares & 24/7 care
          </p>
        </div>

        {authError && (
          <Alert variant="error" title="Registration Failed">
            <p className="text-xs leading-relaxed">{authError}</p>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Aarav Sharma"
            leftIcon={<User className="w-4 h-4" />}
            error={errors.displayName?.message}
            {...register('displayName')}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="aarav@example.com"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Minimum 6 characters"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            leftIcon={<UserPlus className="w-4 h-4" />}
            className="w-full mt-4"
          >
            Create Account
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500 pt-2">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};
