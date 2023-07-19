import { ErrorrMessageComponent } from "@/components/shared/Errorrmessage";
import { get_repo_jason } from "@/state/providers/repos/query/get_repo_jason";
import { IViewerOneRepoRepository } from "@/state/providers/repos/query/viewer_one_repos_types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronDown, Loader, X } from "lucide-react";
import { useState } from "react";
import { RepoTopicChip } from "./RepotopicsForm";
import { useNotification } from "@refinedev/core";
import {
  UpdateRepoTagsInput,
  updateRepoTags,
} from "@/state/providers/repos/mutation/updateRepoTags";

interface PackageJasonProps {
  repo: IViewerOneRepoRepository;
  editing: boolean;
}

export function PackageJason({ repo, editing }: PackageJasonProps) {
  const theme = useTheme();
  const query = useQuery(["repo-pkg-jason", repo.nameWithOwner], () =>
    get_repo_jason(repo.nameWithOwner)
  );
  const repo_topics = new Set(repo.repositoryTopics.nodes.map((topic) => topic.topic.name));
  const [topics, setTopics] = useState(repo_topics);
  const { open: opentoast, close } = useNotification();
  const qc = useQueryClient();
  const addTopic = (topic: string) => {
    setTopics((prev) => {
      return new Set(prev).add(topic);
    });
  };
  const removeTopic = (topic: string) => {
    setTopics((prev) => {
      const new_set = new Set(prev);
      new_set.delete(topic);
      return new_set;
    });
  };
  const addAllTopics = (topics: string[]) => {
    const new_topics = Array.from(topics);
    setTopics((prev) => {
      return new Set([...prev, ...new_topics]);
    });
  };
  if (query.isLoading) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center">
        <Loader className="w-5 h-5 animate-spin" />
      </div>
    );
  }
  if (query.isError) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center">
        {/* @ts-expect-error */}
        <ErrorrMessageComponent error_message={query.error?.message} />
      </div>
    );
  }
  if (!query.data) {
    return null;
  }
  const data = query.data;
  const repo_deps = Object.keys(data.dependencies);
  const repo_dev_deps = Object.keys(data.devDependencies);

  const mutation = useMutation({
    mutationFn: (vars: UpdateRepoTagsInput) => updateRepoTags(vars),
    onSuccess(data, variables, context) {
      qc.invalidateQueries(["repos"]);

      opentoast?.({
        key: "delere-topics-success",
        type: "success",
        message: "Success",
        description: "Topics updated successfully",
      });
      close?.("update-topics-success");
    },
    onError(error: any, variables, context) {
      opentoast?.({
        key: "delere-topics-error",
        type: "error",
        message: "Error updating",
        description: error?.message,
      });
      close?.("update-topics-error");
    },
  });
  const topics_arr = Array.from(topics);
  return (
    <Card className="w-full h-full flex flex-col items-center justify-center gap-1">
      {editing && (
        <Card className="w-full h-full flex flex-col items-center justify-center gap-2 p-2">
          <Card>
            {topics_arr.map((topic, idx) => {
              return (
                <Chip
                  key={topic}
                  variant="outlined"
                  onClick={() => removeTopic(topic)}
                  label={<RepoTopicChip name={topic} editing={editing} />}
                  size="small"
                />
              );
            })}
          </Card>
          {topics_arr && topics_arr.length > 0 && (
            <button
              onClick={() =>
                mutation.mutate({
                  input: {
                    repositoryId: repo.id,
                    topicNames: topics_arr,
                  },
                })
              }
              className="rounded-lg flex items-center justify-center px-2 py-1
              border hover:border-purple-400 hover:text-purple-400">
              {mutation.isLoading ? <Loader className="w-5 h-5 animate-spin" /> : "submit"}
            </button>
          )}
        </Card>
      )}

      <Accordion className="w-full">
        <AccordionSummary
          expandIcon={<ChevronDown />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography gap={5} variant="caption">
            Dependancies{" "}
            {editing && (
              <Chip
                label="add all to topics"
                variant="filled"
                size="small"
                sx={{
                  boxShadow: 2,
                  marginX: "10px",
                  border: "1px solid",
                  ":hover": {
                    border: "1px solid" + theme.palette.secondary.main,
                    color: theme.palette.secondary.main,
                    boxShadow: "1px 2px 1px 2px " + theme.palette.secondary.main,
                  },
                }}
                onClick={() => addAllTopics(repo_deps)}
              />
            )}
          </Typography>
        </AccordionSummary>

        <AccordionDetails className="w-full h-full flex flex-wrap  gap-2">
          {repo_deps.map((dep) => {
            return (
              <Chip
                key={dep}
                sx={{ border: "1px solid" }}
                label={
                  <div key={dep} className="w-full h-full flex  gap-2">
                    <h3>{dep}</h3>
                    {editing && (
                      <Check
                        className="h-4 w-4 hover:text-green-700"
                        onClick={() => addTopic(dep)}
                      />
                    )}
                    {editing && (
                      <X className="h-4 w-4 hover:text-red-700" onClick={() => removeTopic(dep)} />
                    )}
                  </div>
                }
              />
            );
          })}
        </AccordionDetails>
      </Accordion>

      <Accordion className="w-full flex flex-col gap-1">
        <AccordionSummary
          expandIcon={<ChevronDown />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography variant="caption">
            Dev Dependancies
            {editing && (
              <Chip
                sx={{
                  boxShadow: 2,
                  border: "1px solid",
                  marginX: "10px",
                  ":hover": {
                    border: "1px solid" + theme.palette.secondary.main,
                    color: theme.palette.secondary.main,
                    boxShadow: "1px 2px 1px 2px " + theme.palette.secondary.main,
                  },
                }}
                label="add all to topics"
                onClick={() => addAllTopics(repo_dev_deps)}
                variant="filled"
              />
            )}
          </Typography>
        </AccordionSummary>

        <AccordionDetails className="w-full  flex flex-wrap  gap-2">
          {repo_dev_deps.map((dep) => {
            return (
              <Chip
                size="small"
                key={dep}
                sx={{ border: "1px solid" }}
                label={
                  <div key={dep} className="w-full h-full flex  gap-2">
                    <h3>{dep}</h3>
                    {editing && (
                      <Check
                        className="h-4 w-4 hover:text-green-700"
                        onClick={() => addTopic(dep)}
                      />
                    )}
                    {editing && (
                      <X className="h-4 w-4 hover:text-red-700" onClick={() => removeTopic(dep)} />
                    )}
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
