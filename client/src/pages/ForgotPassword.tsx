import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setErrorMsg(null);
      setSuccessMsg(null);
      await resetPassword(data.email);
      setSuccessMsg(`Password reset instructions have been dispatched to ${data.email}.`);
    } catch (err) {
      setErrorMsg((err as Error).message);
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
            Reset your Password
          </h2>
          <p className="text-xs text-slate-500">
            Enter your registered email and we'll send you a password recovery link
          </p>
        </div>

        {successMsg && (
          <Alert variant="success" title="Email Sent">
            <p className="text-xs leading-relaxed">{successMsg}</p>
          </Alert>
        )}

        {errorMsg && (
          <Alert variant="error" title="Reset Request Failed">
            <p className="text-xs leading-relaxed">{errorMsg}</p>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email')}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            leftIcon={<Send className="w-4 h-4" />}
            className="w-full mt-2"
          >
            Send Reset Instructions
          </Button>
        </form>

        <div className="text-center pt-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
