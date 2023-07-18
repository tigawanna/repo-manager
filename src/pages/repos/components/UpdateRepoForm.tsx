import React, { useState } from "react";
import { Checkbox, Stack, Typography, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { TextField, Box } from "@mui/material";
import {
  UpdateRepositoryInput,
  updateRepository,
} from "@/state/providers/repos/mutation/updateRepo";
import { useNotification } from "@refinedev/core";
import { SaveButton } from "@refinedev/mui";
import { IRepositoriesNode } from "@/state/providers/repos/query/viwer_repo_types";


interface UpdateRepoFormProps {
  input: IRepositoriesNode;
}
export function UpdateRepoForm({ input }: UpdateRepoFormProps) {
  const [formData, setFormData] = useState<UpdateRepositoryInput>({
    name: input.name,
    description: input.description,
    repositoryId: input.id,
    homepageUrl: input.homepageUrl,
    hasIssuesEnabled: input.hasIssuesEnabled,
    hasWikiEnabled: input.hasWikiEnabled,
    template: input.isTemplate,
  });
  const {open,close}=useNotification()
const theme = useTheme()
  const mutation = useMutation({
    mutationFn: (variables: UpdateRepositoryInput) =>
      updateRepository(variables),
    onSuccess(data) {
      console.log("succesfully updated repository", data);
      open?.({
        key: "update-repo-success",
        type: "success",
        message: "Success",
        description: "Repository updated successfully",
      })
      close?.("update-repo-success")
    },
    onError(error:any) {
      console.log("error updating repository", error);
      open?.({
        key: "update-repo-error",
        type: "error",
        message: "Error updating",
        description: error?.message,
      })
      close?.("update-repo-error")
    },
  });
  const updateRepoBooleans = [
    "hasIssuesEnabled",
    "hasWikiEnabled",
    "template",
  ] as const;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // @ts-expect-error
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.repositoryId && formData.repositoryId !== "") {
      mutation.mutate(formData);
    } else {
      throw new Error("repository id required");
    }
  };

  return (
    <Box
      component="form"
      className="flex flex-col w-full p-10 rounded-lg"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: theme.palette.background.paper,
        "& .MuiTextField-root": { m: 1, width: "100%", fontSize: "10px" },
      }}>
      <Typography
        variant="h5"
        sx={{
          color: theme.palette.text.secondary,
          fontWeight: "bold",
        }}
        className="font-bold text-lg p-1 m-1">
        Update {input.nameWithOwner} repository{" "}
      </Typography>
      <TextField
        id="name"
        name="name"
        placeholder="Repository name"
        className="w-full"
        value={formData.name}
        onChange={handleChange}
        size="small"
        helperText="repository name"
      />
      <TextField
        id="description"
        name="description"
        size="small"
        placeholder="Repository description"
        value={formData.description}
        onChange={handleChange}
        helperText="repository description"
        multiline
        rows={4}
      />

      <TextField
        id="homepageUrl"
        name="homepageUrl"
        size="small"
        value={formData.homepageUrl}
        onChange={handleChange}
        type="url"
        helperText="repository homepage url"
      />

      <Stack direction="row" className="w-full gap- flex flex-wrap justify-center items-center">
        {updateRepoBooleans.map((boolean) => (
          <div key={boolean} className="w-fit flex items-center justify-center">
            <Checkbox
              name={boolean}
              checked={formData[boolean]}
              onChange={handleChange}
              size="small"
            />
            <label className="text-sm">{boolean}</label>
          </div>
        ))}
      </Stack>

      <SaveButton
        type="submit"
        variant="outlined"
        color="secondary"
        style={{ width: "100%", marginTop: "20px" }}>
        {mutation.isLoading ? <Loader className="w-4 h-4 animate-spin" /> : "Update"}
      </SaveButton>
    </Box>
  );
}
