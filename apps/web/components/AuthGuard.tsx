'use client';

import React, { useEffect, useState } from 'react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      window.location.href = '/login';
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-400 font-medium">
        Authenticating session...
      </div>
    );
  }

  return <>{children}</>;
}
