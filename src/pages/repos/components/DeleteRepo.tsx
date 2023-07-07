
import {Button,Typography} from "@mui/material";
import { ItemList } from "@/state/providers/repos/types";
import { deleteRepos } from "@/state/providers/repos/mutation/deleteRepos";
import { useMutation } from "@tanstack/react-query";


interface DeleteRepoProps {
  selected: ItemList[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DeleteRepo({selected,setOpen}:DeleteRepoProps) {
  

const mutation  =useMutation({
  mutationFn:()=>deleteRepos(selected),
  onSuccess: () => {
    console.log("succesfully deleted repos");
    setOpen(false)
  }
})
  return (
    <div 
    style={{
      border:mutation.isError?"2px solid #990000":"",
    }}
    className="w-full flex flex-col items-center justify-center gap-5">
      <div className="w-full mt-6 flex flex-col gap-2">
        <div>
          <Typography variant="h2" fontSize="lg" sx={{ mb: 0.5 }}>
            Are you sure you want to delete this repos?
          </Typography>
          <Typography variant="h3" fontSize="sm" sx={{ color: "#990000" }}>
            This action cannot be undone
          </Typography>
        </div>

        <Typography variant="h4" fontSize="sm" sx={{ color: "text.secondary" }}>
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
            sx={{ ml: "auto", fontWeight: 600, padding: "0.8rem" }}
            onClick={() => mutation.mutate()}>
          {mutation.isLoading ? "Deleting..." :  "Delete"}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            size="small"
            color="error"
            aria-label="Cancel Repository deletion"
            sx={{ ml: "auto", fontWeight: 600, width: "fit", padding: "0.8rem" }}>
            cancel
          </Button>
        </div>
      </div>
  {mutation.isError && 
<Typography  fontSize="sm" sx={{ color: "text.danger" }}>
  {/* @ts-expect-error */}
  {mutation?.error?.message}</Typography>
  }
    </div>
  );
}
