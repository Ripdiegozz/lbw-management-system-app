import { useState } from 'react';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { type LoginRequestBody, type ApiError, type UserPublic } from '@/core';
import { LoginService } from '@/core/services/auth-service';
import { UsersService } from '@/core/services/users-service';

const isLoggedIn = () => {
  return localStorage.getItem('access_token') !== null;
};

const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery<UserPublic | null, Error>({
    queryKey: ['currentUser'],
    queryFn: UsersService.readUserMe,
    enabled: isLoggedIn()
  });

  const login = async (data: LoginRequestBody) => {
    const response = await LoginService.loginAccessToken({ requestBody: data });
    localStorage.setItem('access_token', response.jwt);
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: '/' });
    },
    onError: (err: ApiError) => {
      let errDetail = (err.body as any)?.detail;

      if (err instanceof AxiosError) {
        errDetail = err.message;
      }

      if (Array.isArray(errDetail)) {
        errDetail = 'Algo salió mal';
      }

      setError(errDetail);
    }
  });

  const logout = () => {
    localStorage.removeItem('access_token');
    navigate({ to: '/login' });
  };

  return {
    loginMutation,
    logout,
    user,
    isLoading,
    error,
    resetError: () => setError(null)
  };
};

export { isLoggedIn };
export default useAuth;
