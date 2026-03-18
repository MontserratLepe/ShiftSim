"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function MiMexicoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // We check if the "Access Token" exists in the browser's temporary session
    const auth = sessionStorage.getItem("mimexico_auth");

    if (auth === "true") {
      setIsAuthorized(true);
    } else {
      // If no token, kick them back to the home page
      router.push('/');
    }
  }, [router]);

  // While checking, show a black screen so they don't see the game for a split second
  if (!isAuthorized) {
    return <div className="min-h-screen bg-black"></div>;
  }

  return <>{children}</>;
}