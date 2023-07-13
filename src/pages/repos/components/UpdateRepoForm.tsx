import React, { useState } from "react";
import { Button, Checkbox, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { TextField, Box } from "@mui/material";
import { RepositoriesNode } from "@/state/providers/repos/types";
import {
  UpdateRepositoryInput,
  updateRepository,
} from "@/state/providers/repos/mutation/updateRepo";

interface UpdateRepoFormProps {
  input: RepositoriesNode;
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
  const mutation = useMutation({
    mutationFn: (variables: UpdateRepositoryInput) =>
      updateRepository(variables),
    onSuccess(data) {
      console.log("succesfully updated repository", data);
    },
    onError(error) {
      console.log("error updating repository", error);
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
      className="flex flex-col w-full p-6 rounded-lg bg-slate-900"
      onSubmit={handleSubmit}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%", fontSize: "10px" },
      }}
    >
      <h1 className="font-bold text-lg p-1 m-1 border-b">
        Update {input.nameWithOwner} repository{" "}
      </h1>
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

      <Stack
        direction="row"
        className="w-full gap- flex flex-wrap justify-center items-center"
      >
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

      <Button
        type="submit"
        variant="outlined"
        color="secondary"
        style={{ width: "100%", marginTop: "20px" }}
      >
        {mutation.isLoading ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          "Update"
        )}
      </Button>
    </Box>
  );
}
