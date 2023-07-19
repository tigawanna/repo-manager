import { gql_request_helper } from "@/state/providers/graphqlClient";
import { FOLLOWUSER, UNFOLLOWUSER } from "@/state/providers/profile/mutations";
import { useMutation } from "@tanstack/react-query";
import { Variables } from "graphql-request";
import { useState } from "react";
import { Link } from "react-router-dom";

interface PersonCardProps {
  profile: any;
}

export const PersonCard: React.FC<PersonCardProps> = ({ profile }) => {
  const dev = profile;
  const [yes, setYes] = useState<any>(dev?.viewerIsFollowing);

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

  const followThem = (their_id: string) => {
    setYes(true);
    followMutation.mutate({ input: { userId: their_id } });
  };
  const unfollowThem = (their_id: string) => {
    setYes(false);
    unfollowMutation.mutate({ input: { userId: their_id } });
  };

  // console.log("dev.login",dev.login)
  return (
    <div className="h-44 w-[99%] md:w-[31%] lg:w-[25%] m-2 md:m-2">
      <div
        className="w-full h-full flex flex-col 
      justify-between
       hover:shadow-md m-1 p-2 border-[1px] border-black dark:border-white rounded-sm"
      >
        <Link to={"/profile/" + dev?.login}>
          <div className=" flex items-center justify-between min-w-[60%] cursor-pointer w-full">
            <div className="h-full w-16 mx-2">
              <img
                className="h-[80%] w-fit rounded-[50%] m-1 border border-white"
                src={dev?.avatarUrl as string}
                alt=""
                height={"10px"}
                width={"10px"}
              />
            </div>
            <div className="flex flex-col  w-[80%] ">
              <div className="text-[12px] font-bold md:text-[16px]  break-all w-100%]">
                @{dev?.login}
              </div>
              <div
                className="text-[12px]  max-h-[100px] font-normal 
              md:text-[13px] break-word w-[95%] text-ellipsis overflow-hidden"
              >
                {dev?.bio}
              </div>
            </div>
          </div>
        </Link>

        <div className="w-full  flex-center">
          {!dev?.isViewer ? (
            <div className="w-full  flex-center">
              {yes ? (
                <button
                  onClick={() => unfollowThem(dev.id)}
                  className="bg-slate-600 hover:bg-slate-800 text-white w-[90%]
           hover:text-red-200 text-[13px] rounded-md p-[4px] m-[3px] h-fit"
                >
                  {"Unfollow"}
                </button>
              ) : (
                <button
                  onClick={() => followThem(dev.id)}
                  className="bg-slate-600 hover:bg-slate-800 text-white
           hover:text-red-200 text-[13px] rounded-md p-[4px] m-[3px] h-fit w-[90%]"
                >
                  {dev?.isFollowingViewer ? "Follow back" : "Follow"}
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
