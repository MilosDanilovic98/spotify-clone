import { createContext, useContext, useEffect, useState } from "react";

import { UserDetails } from "@/types";

import {
  User,
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { createBrowserClient } from "@supabase/ssr";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  spotifyToken: string | null;
  spotifyRefreshToken: string | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [spotifyToken, setSpotifyToken] = useState(
    session?.provider_token ?? null
  );
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useState(
    session?.provider_refresh_token ?? null
  );
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const supaBaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const getUserSession = async () => {
    const { data, error } = await supaBaseClient.auth.getSession();
    return data;
  };
  const getUserDetails = () => supabase.from("users").select("*").single();
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];

          if (userDetailsPromise.status === "fulfilled")
            setUserDetails(userDetailsPromise.value.data as UserDetails);

          setIsLoadingData(false);
        }
      );
      Promise.allSettled([getUserSession()]).then((results) => {
        if (results[0].status === "fulfilled") {
          setSpotifyToken(results[0]?.value?.session?.provider_token as string);
          setSpotifyRefreshToken(
            results[0]?.value?.session?.provider_refresh_token as string
          );
        }
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    spotifyToken,
    spotifyRefreshToken,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
