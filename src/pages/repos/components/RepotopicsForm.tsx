import { MuiModal } from "@/components/shared/MuiModal";
import { RepositoryTopicsNode } from "@/state/providers/repos/types";
import { Chip, TextField } from "@mui/material";
import { Check, Edit, X } from "lucide-react";
import { useState } from "react";

interface RepotopicsFormProps {
  repo_topics: RepositoryTopicsNode[];
}

export function RepoTopicsForm({ repo_topics }: RepotopicsFormProps) {
  const [topics, setTopics] = useState(repo_topics);
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);

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
      <Edit className="h-5 w-5 hover:text-purple-600" onClick={() => setEditing(!editing)} />

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

      {(topics.length < 1 || editing) && (
        <Chip variant="outlined" 
        onClick={() => setOpen(true)}
        className="hover:text-purple-600" label="Add topic" size="small" />
      )}
      <RepoTopicInput open={open} setOpen={setOpen} />
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
}

export function RepoTopicInput({ open, setOpen }: RepoTopicInputProps) {
  const [topics, setTopics] = useState<string[]|null>(null);
  const [topic, setTopic] = useState("");

  const removeTopic = (idx: number) => {
    setTopics((prev) => {
        if(prev){
            return prev.filter((_, i) => i !== idx);
        }
        return prev
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };
  const handleSubmit = () => {
    // e.preventDefault();
    setTopics((prev) => {
        if(prev){
            return [...prev, topic];
        }
        return [topic];
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-center gap-2 rounded-lg">
      <MuiModal open={open} setOpen={setOpen}>
        <div className="bg-slate-950 w-full h-full p-5 flex flex-col gap-3 rounded-lg">

          <div className="flex flex-wrap w-full h-full gap-2">
            {topics&&topics.map((topic, idx) => {
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
            <Check className="h-6 w-6 hover:text-purple-600"size={5} onClick={()=>handleSubmit()}/>
          </div>
          <button className="w-full rounded-md border hover:border-purple-400 hover:text-purple-400">submit</button>
        </div>
      </MuiModal>
    </div>
  );
}
