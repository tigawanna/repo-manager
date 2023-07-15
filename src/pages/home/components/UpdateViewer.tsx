import { updateViewer, UpdateViewerInput } from "@/state/providers/profile/update-user";
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
import { useTheme } from "@mui/material/styles";
import { useNotification } from "@refinedev/core";

interface UpdateViewerProps {
  viewer: UpdateViewerInput;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateViewer({ viewer, setOpen }: UpdateViewerProps) {
  const theme = useTheme();
  const { open, close } = useNotification();
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
  const mutation = useMutation({
    mutationFn: (vars: UpdateViewerInput) => updateViewer(vars),
    onSuccess() {
      qc.invalidateQueries(["viewer"]);
      open?.({
        key: "update-viewer-success",
        type: "success",
        message: "Success",
        description: "viewr updated successfully",
      });
      close?.("update-viewer-success");
      setOpen(false);
    },
    onError(error: any, variables, context) {
      open?.({
        key: "update-viewer-error",
        type: "error",
        message: "Error",
        description: "error updating viewer" + error?.message,
      });
      close?.("update-viewer-error");
    },
  });

  const FormCard = styled(Card)(({ theme }) => ({
    color: theme.palette.secondary.contrastText,
  }));

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setInput((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  return (
    // <form className={background}>
    <FormGroup
      sx={{
        padding: 5,
        borderRadius: 5,
        backgroundColor: theme.palette.background.paper,
      }}
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   console.log("new user input", input);
      // }}
      className="w-full h-full flex flex-col items-center justify-center gap-3">
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
          {mutation?.error?.message}
        </div>
      )}
      <SaveButton onClick={() => mutation.mutate(input)}>
        {mutation.isLoading ? <Loader className="w-4 h-4 animate-spin" /> : "Update"}
      </SaveButton>
    </FormGroup>
    // </form>
  );
}
