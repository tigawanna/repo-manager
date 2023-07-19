import { ErrorrMessageComponent } from "@/components/shared/Errorrmessage";
import { get_repo_jason } from "@/state/providers/repos/query/get_repo_jason";
import { IViewerOneRepoRepository } from "@/state/providers/repos/query/viewer_one_repos_types";
import { Accordion, AccordionDetails, AccordionSummary, Card,Chip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, Loader, X } from "lucide-react";
import { useState } from "react";

interface PackageJasonProps {
  repo: IViewerOneRepoRepository;
}

export function PackageJason({repo}:PackageJasonProps){
    const query = useQuery(
      ["repo-pkg-jason", repo.nameWithOwner],
      () => get_repo_jason(repo.nameWithOwner),
    );
    if(query.isLoading){
        return <div className="w-full h-full min-h-screen flex items-center justify-center">
            <Loader className="w-5 h-5 animate-spin" />
        </div>
    }
    if(query.isError){
        return (
            <div className="w-full h-full min-h-screen flex items-center justify-center">
                {/* @ts-expect-error */}
                <ErrorrMessageComponent error_message={query.error?.message} />
            </div>
        )
    }
    if(!query.data){
        return null
    }
    const data = query.data
    const repo_deps = Object.entries(data.dependencies)
    const repo_dev_deps = Object.entries(data.devDependencies)
return (
  <Card className="w-full h-full flex flex-col items-center justify-center gap-2">
    {/* <Typography variant="body2" className="w-full pl-5 p-2">Package JSON</Typography> */}
    <Accordion>
      <AccordionSummary
        expandIcon={<ChevronDown />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography variant="caption">Dependancies</Typography>
      </AccordionSummary>
      <AccordionDetails className="w-full h-full flex flex-wrap items-center justify-center gap-2">
        {repo_deps.map(([k, v]) => {
          return (
            <Chip
              key={k}
              sx={{ border: "1px solid" }}
              label={
                <div key={k} className="w-full h-full flex  gap-2">
                  <h3>{k}</h3>
                  <Check className="h-4 w-4 hover:text-green-700" />
                </div>
              }
            />
          );
        })}
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary
        expandIcon={<ChevronDown />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography variant="caption">Dev Dependancies</Typography>
      </AccordionSummary>
      <AccordionDetails className="w-full h-full flex flex-wrap items-center justify-center gap-2">
        {repo_dev_deps.map(([k, v]) => {
          return (
            <Chip
              key={k}
              sx={{ border: "1px solid" }}
              label={
                <div key={k} className="w-full h-full flex  gap-2">
                  <h3>{k}</h3>
                  <Check className="h-4 w-4 hover:text-green-700" />
                </div>
              }
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  </Card>
);
}
