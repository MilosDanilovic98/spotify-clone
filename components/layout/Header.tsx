"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

import { useRouter } from "next/navigation";

import Button from "@/components/buttons/Button";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();

  const supaBaseClient = useSupabaseClient();
  const { user, session } = useUser();

  const handleLogout = async () => {
    const { error } = await supaBaseClient.auth.signOut();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
    }
  };

  useEffect(() => {
    const test = async () => {
      let counter = 50;
      const response = await fetch(
        "https://api.spotify.com/v1/recommendations",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session?.provider_token,
          },
        }
      );

      const data = await response.json();
      console.log(data)
      //   const timer = ms => new Promise(res => setTimeout(res, ms))
      //   let bla=data.items
      //   console.log(bla)
      //   while (data.total > counter){
      //     const response = await fetch(
      //         `https://api.spotify.com/v1/me/tracks?limit=50&&offset=${counter}`,
      //         {
      //           headers: {
      //             "Content-Type": "application/json",
      //             Authorization: "Bearer " + session?.provider_token,
      //           },
      //         }
      //     );
      //     const data=await response.json()
      //     bla=bla.concat(data.items)
      //     counter+=50
      //     await timer(1000);
      //   }
      //
      //
      //   console.log(bla)
    };

    if (session) {
      console.log(session?.provider_token);
      test();
    }
  }, [session]);

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className
      )}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex items-center gap-x-2 md:hidden">
          <button className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4 ">
              <Button className="bg-white px-6 py-2" onClick={handleLogout}>
                Logout
              </Button>
              <Button
                className="bg-white"
                onClick={() => router.push("/account")}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className="bg-transparent font-medium text-neutral-300"
                >
                  Sing Up
                </Button>
              </div>
              <div>
                <Button onClick={onOpen} className="bg-white px-6 py-2">
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
