"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";

import Loading from "@/components/auth/loading";

interface Convex_Client_Provider_Props {
  children: React.ReactNode;
}

const convex_url = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex_api_key = process.env.NEXT_PUBLIC_CONVEX_API_KEY;

const convex = new ConvexReactClient(convex_url);

const Convex_Client_Provider = ({ children }: Convex_Client_Provider_Props) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default Convex_Client_Provider;
