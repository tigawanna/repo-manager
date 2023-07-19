import { MuiModal } from "@/components/shared/MuiModal";
import {
  UpdateRepoTagsInput,
  updateRepoTags,
} from "@/state/providers/repos/mutation/updateRepoTags";
import { IRepositoryTopicsNode } from "@/state/providers/repos/query/viewer_one_repos_types";
import { Chip, TextField, useTheme,Tooltip, Card} from "@mui/material";
import { useNotification } from "@refinedev/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Check, Edit, X } from "lucide-react";
import { useState } from "react";


interface RepotopicsFormProps {
  repo_topics: IRepositoryTopicsNode[];
  resourceId: string;
  is_admin: boolean;
  editing:boolean;
}

export function RepoTopicsForm({ repo_topics, resourceId,is_admin,editing }: RepotopicsFormProps) {
  const [topics, setTopics] = useState(repo_topics);

  const [open, setOpen] = useState(false);


  const old_topics = topics.map((topic) => topic.topic.name);
  const removeTopic = (idx: number) => {
    setTopics((prev) => {
      if (editing) {
        return prev.filter((_, i) => i !== idx);
      }
      return prev;
    });
  };

  return (
    <div className="w-full  min-h-[50px]  flex flex-wrap gap-1  border-t p-2  scrollbar-thin overflow-x-scroll">


      {topics.map((topic, idx) => {
        return (
          <Chip
            key={topic.id}
            variant="outlined"
            onClick={() => removeTopic(idx)}
            label={<RepoTopicChip name={topic.topic.name} editing={editing} />}
            size="small"
          />
        );
      })}

        <Chip
          variant="outlined"
          onClick={() => setOpen(true)}
          className="hover:text-purple-600"
          label="Add topic"
          size="small"
        />
      
      <RepoTopicInput
        open={open}
        setOpen={setOpen}
        resourceId={resourceId}
        old_topics={old_topics}
      />
    </div>
  );
}

interface RepoTopicChipProps {
  name: string;
  editing: boolean;
}

export function RepoTopicChip({ editing, name }: RepoTopicChipProps) {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2">
      <h3>{name}</h3>
      {editing && <X className="h-4 w-4 hover:text-red-700" />}
    </div>
  );
}

interface RepoTopicInputProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resourceId: string;
  old_topics: string[];
}

export function RepoTopicInput({ open, setOpen, resourceId, old_topics }: RepoTopicInputProps) {
  const [topics, setTopics] = useState<string[] | null>(old_topics);
  const [topic, setTopic] = useState("");
  const { open: opentoast, close } = useNotification();
  const qc = useQueryClient()
  const theme = useTheme();
  const removeTopic = (idx: number) => {
    setTopics((prev) => {
      if (prev) {
        return prev.filter((_, i) => i !== idx);
      }
      return prev;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };
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
    onError(error:any, variables, context) {
      opentoast?.({
        key: "delere-topics-error",
        type: "error",
        message: "Error updating",
        description: error?.message,
      });
      close?.("update-topics-error");
    },
  });

  const handleSubmit = () => {
    // e.preventDefault();
    setTopics((prev) => {
      if (prev) {
        return [...prev, topic];
      }
      return [topic];
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-center gap-2 rounded-lg">
      <MuiModal open={open} setOpen={setOpen}>
        <Card 
        sx={{
        backgroundColor: theme.palette.background.paper
        }}
        className=" w-full h-full p-5 flex flex-col gap-3 rounded-lg">
          <div className="flex flex-wrap w-full h-full gap-2">
            {topics &&
              topics.map((topic, idx) => {
                return (
                  <Chip
                    key={idx}
                    variant="outlined"
                    onClick={() => removeTopic(idx)}
                    label={<RepoTopicChip name={topic} editing />}
                    size="small"
                  />
                );
              })}
          </div>

          <div className="w-full flex items-center justify-center gap-2">
            <TextField
              id="anme"
              name="name"
              placeholder="topic name"
              className="w-full"
              onChange={handleChange}
              //   onSubmit={handleSubmit}
              //   value={formData.name}
              //   onChange={handleChange}
              size="small"
            />
            <Check
              className="h-6 w-6 hover:text-purple-600"
              size={5}
              onClick={() => handleSubmit()}
            />
          </div>

          {(topics&&topics.length>0) && (
            <button
              onClick={() =>
                mutation.mutate({
                  input: {
                    repositoryId: resourceId,
                    topicNames: topics,
                  },
                })
              }
              className="w-full rounded-md flex items-center justify-center p-2
              border hover:border-purple-400 hover:text-purple-400">
              {mutation.isLoading ? <Loader className="w-5 h-5 animate-spin" /> : "submit"}
            </button>
          )}
        </Card>
      </MuiModal>
    </div>
  );
}
