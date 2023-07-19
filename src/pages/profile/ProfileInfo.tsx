import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Viewer } from "@/state/providers/home/viewr_query_types";
import { Building2, LocateIcon, Mail, MapPin, Twitter } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { gql_request_helper } from "@/state/providers/graphqlClient";
import { Variables, gql } from "graphql-request";
import { FOLLOWUSER, UNFOLLOWUSER } from "@/state/providers/profile/mutations";
import { EditButton } from "@refinedev/mui";
import { MuiModal } from "@/components/shared/MuiModal";
import { UpdateViewer } from "../home/components/UpdateViewer";
dayjs.extend(relativeTime);

interface ProfileInfoProps {
  profile: Viewer;
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  // console.log("profile === ",profile);
  const user = profile;
  const extradetails = {
    company: user?.company,
    email: user?.email,
    location: user?.location,
    twitter: user?.twitterUsername,
  };

  const [yes, setYes] = useState<any>(user?.viewerIsFollowing);
  const [open, setOpen] = useState(false);

  const followMutation = useMutation({
    mutationFn: async (variables: Variables) => {
      const data = await gql_request_helper({
        document: FOLLOWUSER,
        variables,
      });
      return data;
    },
  });
  const unfollowMutation = useMutation({
    mutationFn: async (variables: Variables) => {
      const data = await gql_request_helper({
        document: UNFOLLOWUSER,
        variables,
      });
      return data;
    },
  });

  // const [active, setActive] = useState<string>("");
  // const username = user?.login as string;
  const admin = user?.isViewer;
  //console.log("og user",admin)
  const followThem = (their_id: string) => {
    setYes(true);
    followMutation.mutate({ input: { userId: their_id } });
  };
  const unfollowThem = (their_id: string) => {
    setYes(false);
    unfollowMutation.mutate({ input: { userId: their_id } });
  };

  // console.log("main user === ",user)
  return (
    <div className="h-full w-full dark-styles gap-1">
      <div className="w-full   p-2 flex-col-center gap-1">
        <div className="p-1 h-full w-full flex flex-col md:flex-row items-center gap-2">
          <div className="h-[40%] w-[70%] md:h-full max-w-[200px]  md:w-[15%] rounded-[5%] aspect-square">
            <img
              className="
             h-[100%] w-[100%] rounded-[5%]  m-1"
              src={user?.avatarUrl as string}
              alt=""
              height={"50px"}
              width={"50px"}
            />
          </div>

          <div
            className="text-[15px]  flex flex-col md:flex-row  items-center md:justify-evenly
          p-3  m-2 w-full 
           font-sans  h-full"
          >
            <div className="text-[15px] w-full ">
              <div className=" text-[15px] md:text-xl font-bold  ">
                {user?.name}
              </div>
              {user?.login && (
                <div className="text-[15px] md:text-lg ">@{user?.login}</div>
              )}
              <div className="text-[15px] max-w-[80%]">{user?.bio}</div>
              <div className="text-[15px]">
                Joined {" :"} {dayjs(user?.createdAt).fromNow()}
              </div>
            </div>

            <div className="text-[15px] w-full ">
              <ProfileInfoItemWrapper
                valkey="email"
                value={extradetails?.email}
              />
              <ProfileInfoItemWrapper
                valkey={"company"}
                value={extradetails?.company}
              />
              <ProfileInfoItemWrapper
                valkey="location"
                value={extradetails?.location}
              />
              <ProfileInfoItemWrapper
                valkey={"twitter"}
                value={extradetails?.twitter}
              />
            </div>
          </div>
          <EditButton onClick={() => setOpen(true)}>edit</EditButton>
          <MuiModal open={open} setOpen={setOpen}>
            <UpdateViewer viewer={user} setOpen={setOpen} />
          </MuiModal>
        </div>

        <div className="w-[95%] flex">
          {!admin ? (
            <div>
              {yes ? (
                <button
                  onClick={() => unfollowThem(user?.id as string)}
                  className="bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 
                  text-[12px] rounded-md p-[4px] m-[3px] h-fit w-full "
                >
                  {"Unfollow"}
                </button>
              ) : (
                <button
                  onClick={() => followThem(user?.id as string)}
                  className="bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 
                  text-[12px] rounded-md p-[4px] m-[3px] h-fit "
                >
                  {user?.isFollowingViewer ? "Follow back" : "Follow"}
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

interface ProfileInfoItemWrapperProps {
  value: string | null;
  valkey: string;
}

export const ProfileInfoItemWrapper: React.FC<ProfileInfoItemWrapperProps> = ({
  valkey,
  value,
}) => {
  // console.log("kyett",valkey,value)
  if (!value) {
    return null;
  }

  const WhatIcon = () => {
    // console.log("kye",valkey,value)
    switch (valkey) {
      case "company":
        return <Building2 className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "location":
        return <MapPin className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center">
      {WhatIcon()}
      <div className="text-[15px] ">{value}</div>
    </div>
  );
};
