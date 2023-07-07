import React from "react";
import { sample_repos } from "@/state/providers/repos/sample_repos";
import { Card, CardMedia} from "@mui/material";
import { Edit, GitFork, Lock } from "lucide-react";

import { MuiModal } from "@/components/shared/MuiModal";
import {Chip} from '@mui/material';
import { CardMenu } from "@/components/shared/CardMenu";
import MenuItem from "@mui/material/MenuItem";
import { UpdateRepoForm } from "./UpdateRepoForm";


interface OneRepoProps {}

export function OneRepo({}: OneRepoProps) {
  const [repo, setRepos] = React.useState(sample_repos.viewer.repositories.edges[3].node);
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Card className="min-h-screen w-full  flex flex-col">
      <div className="w-full flex flex-col md:flex-row  justify-between p-3 gap-2 ">
        <div className="w-full  flex flex-col md:flex-row justify-between p-3">
          <div className="w-full flex flex-col  gap-5 p-2">
            <div className="flex flex-col gap-2">
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-700 gap-2 ">
                <h1 className="w-full text-4xl md:text-6xl font-bold p-1">{repo.name}</h1>
                <h3 className="w-full text-xl md:text-2xl font-bold p-1">{repo.nameWithOwner}</h3>
              </a>
              <h4>{}</h4>

              <div className="w-full flex flex-wrap gap-1">
                {repo.isPrivate && <Lock className="w-5 h-5 text-red-400" />}
                {repo.isFork && <GitFork className="w-5 h-5 text-purple-400" />}
                <Edit className="w-5 h-5 " onClick={() => setOpen(true)} />
                <CardMenu>
                  <MenuItem
                    sx={{
                      fontSize: "12px",
                      ":hover": {
                        color: "blue",
                      },
                    }}
                    onClick={() => setOpen(true)}>
                    Edit
                  </MenuItem>

                  <MenuItem
                    sx={{
                      fontSize: "12px",
                      ":hover": {
                        color: "red",
                      },
                    }}
                    onClick={() => setOpen(true)}>
                    Delete
                  </MenuItem>
                </CardMenu>
              </div>
            </div>
            <div>
              <h4 className="text-sm md:text-base font-medium">{repo.description}</h4>
              <div className="w-full flex flex-wrap gap-1 border-t p-2 scrollbar-thin">
                {repo.repositoryTopics.nodes.map((topic) => {
                  return (
                  <Chip key={topic.id}  variant="outlined" label={topic.topic.name}/>
                  );
                })}
              </div>
            </div>
          </div>

          {/* <IconButton aria-label="settings">
                  <MoreVertIcon />
              </IconButton> */}

          <CardMedia
            component="img"
            height={50}
            className="w-full md:w-[10%] md:max-w-[350px] lg:max-w-[500px] shadow rounded object-cover"
            image={repo.openGraphImageUrl}
            alt={repo.nameWithOwner}
            width={50}
          />
        </div>
      </div>

      <MuiModal 
        open={open} setOpen={setOpen}>
          {/* @ts-expect-error */}
          <UpdateRepoForm input={repo} />
      </MuiModal>
    </Card>
  );
}
