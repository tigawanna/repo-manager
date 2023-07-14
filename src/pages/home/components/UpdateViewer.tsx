import {
  updateViewer,
  UpdateViewerInput,
} from "@/state/providers/profile/update-user";
import {
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  styled,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SaveButton } from "@refinedev/mui";
import { Loader } from "lucide-react";

interface UpdateViewerProps {
  viewer: UpdateViewerInput;
}

export function UpdateViewer({ viewer }: UpdateViewerProps) {
  const qc = useQueryClient();
  const [input, setInput] = useState<UpdateViewerInput>({
    name: viewer.name ?? "",
    email: viewer.email ?? "",
    blog: viewer.blog ?? "",
    company: viewer.company ?? "",
    location: viewer.location ?? "",
    hireable: viewer.hireable,
    bio: viewer.bio ?? "",
    twitter_username: viewer.twitter_username ?? "",
  });
  const mutation = useMutation(
    {
      mutationFn: (vars: UpdateViewerInput) => updateViewer(vars),
      onSettled(data, error, variables, context) {
        qc.invalidateQueries(["viewer"]);
      },
    },
  );

  const FormCard = styled(Card)(({ theme }) => ({
    color: theme.palette.secondary.contrastText,
  }));

  const handleChange = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <FormCard className="w-full p-5 rounded-md">
      <FormGroup
        onSubmit={(e) => {
          e.preventDefault();
          console.log("new user input", input);
        }}
        className="w-full h-full flex flex-col items-center justify-center gap-3"
      >
        <Stack direction="row" spacing={2}>
          <TextField
            id="name"
            name="name"
            size="small"
            value={input.name}
            onChange={handleChange}
            type="text"
            placeholder={"github user name"}
          />
          <TextField
            id="email"
            name="email"
            size="small"
            value={input.email}
            onChange={handleChange}
            type="text"
            placeholder={"github user email"}
          />
        </Stack>
        <FormControlLabel
        className="w-full p-1 flex flex-col-reverse items-start justify-start"
          control={
            <TextareaAutosize
              className="min-w-[80%] p-2"
              id={"bio"}
              name={"bio"}
              value={input.bio}
              onChange={handleChange}
            />
          }
          label={"bio"}
        />

        <Stack direction="row" spacing={2}>
          <TextField
            id="company"
            name="company"
            size="small"
            value={input.company}
            onChange={handleChange}
            type="text"
            placeholder={"currently working at"}
          />
          <TextField
            id="twitter_username"
            name="twitter_username"
            size="small"
            value={input.twitter_username}
            onChange={handleChange}
            type="text"
            placeholder={"twitter username"}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <FormControlLabel
            control={
              <Checkbox
                id="hireable"
                name={"hireable"}
                checked={input.hireable}
                inputProps={{ "aria-label": "controlled" }}
                onChange={handleChange}
                size="small"
              />
            }
            label="hireable"
          />

          <TextField
            id="location"
            name="location"
            size="small"
            value={input.location}
            onChange={handleChange}
            type="text"
            placeholder={"location"}
          />
          <TextField
            id="blog"
            name="blog"
            size="small"
            value={input.blog}
            onChange={handleChange}
            type="text"
            placeholder={"blog site"}
          />
        </Stack>

        {mutation.isError && (
          <div className="w-full rounded p-2 flex text-sm items-center justify-center bg-red-400 text-red-950">
            {/* @ts-expect-error */}
            {mutation?.error?.message}
          </div>
        )}
        <SaveButton >
          {mutation.isLoading
            ? <Loader className="w-4 h-4 animate-spin" />
            : "Update"}
        </SaveButton>
      </FormGroup>
    </FormCard>
  );
}
