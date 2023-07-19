import { Button, Typography, Card, useTheme } from "@mui/material";
import { ItemList } from "@/state/providers/repos/types";
import { deleteRepos } from "@/state/providers/repos/mutation/deleteRepos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@refinedev/core";


interface DeleteRepoProps {
  selected: ItemList[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<ItemList[] | null>>;
}

export function DeleteRepo({ selected, setOpen, setSelected }: DeleteRepoProps) {
  const { open, close } = useNotification();
  const theme = useTheme()
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteRepos(selected),
    onSuccess: () => {
      console.log("succesfully deleted repos");
      qc.invalidateQueries(["repos"]);
      setSelected(null);
      open?.({
        key: "delere-repo-success",
        type: "success",
        message: "Success",
        description: "Deleteed successfully",
      });
      close?.("delete-repo-success");
      setOpen(false);
    },
    onError(error: any, variables, context) {
      open?.({
        key: "delere-repo-error",
        type: "error",
        message: "Error deleting",
        description: error?.message,
      });
      close?.("delete-repo-error");
    },
  });
  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: 7,
        border: mutation.isError ? "2px solid #990000" : "",
      }}
      className="w-full flex flex-col items-center justify-center gap-5  p-2">
      <div className="w-full mt-6 flex flex-col gap-2 px-2">
        <div>
          <Typography variant="h6" fontSize="sm" sx={{ mb: 0.5 }}>
            Are you sure you want to delete these repos?
          </Typography>
          <Typography variant="subtitle1" fontSize="sm" sx={{ color: "#990000" }}>
            This action cannot be undone
          </Typography>
        </div>

        <Typography variant="caption" fontSize="" sx={{ color: "text.secondary" }}>
          <ul className="flex flex-col w-[90%] ml-4">
            {selected.map((item, idx) => {
              return (
                <li key={item.id}>
                  {idx + 1}. {item.nameWithOwner}
                </li>
              );
            })}
          </ul>
        </Typography>
      </div>

      <div className="w-full flex items-center justify-evenly ">
        <div>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            aria-label="Delete Repositories"
            sx={{ ml: "auto", fontWeight: 600 }}
            onClick={() => mutation.mutate()}>
            {mutation.isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            size="small"
            color="error"
            aria-label="Cancel Repository deletion"
            sx={{
              ml: "auto",
              fontWeight: 600,
              width: "fit",
            }}>
            cancel
          </Button>
        </div>
      </div>
      {mutation.isError && (
        <Typography fontSize="sm" sx={{ color: "text.danger" }}>
          {mutation?.error?.message}
        </Typography>
      )}
    </Card>
  );
}
