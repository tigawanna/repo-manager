import { RepoQueryVariables } from "@/state/providers/repos/query/viewer_repos";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface ReposSortSectionProps {
  repovars: RepoQueryVariables;
  setRepoVars: React.Dispatch<React.SetStateAction<RepoQueryVariables>>;
}
//  TODO : add below options
//   isFork?: boolean;
//   affiliations?: ("OWNER" | "COLLABORATOR" | "ORGANIZATION_MEMBER")[];
//   privacy?: "PUBLIC" | "PRIVATE";

export function ReposSortSection({
  repovars,
  setRepoVars,
}: ReposSortSectionProps) {
  const handleOrderFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as
      | "CREATED_AT"
      | "UPDATED_AT"
      | "PUSHED_AT"
      | "NAME"
      | "STARGAZERS";
    setRepoVars((prev) => {
      return {
        ...prev,
        orderBy: {
          field: value,
          direction: prev.orderBy?.direction ?? "DESC",
        },
      };
    });
  };
  const handleOrderDirectionChange = (event: SelectChangeEvent) => {
    const value = event.target.value as "ASC" | "DESC";
    setRepoVars((prev) => {
      return {
        ...prev,
        orderBy: {
          field: prev.orderBy?.field ?? "PUSHED_AT",
          direction: value,
        },
      };
    });
  };

  // console.log("repovars === ",repovars)
  return (
    <div className="w-full h-full flex items-center justify-center">

      <FormControl fullWidth>
        <InputLabel id="repos-ordre-by-field-label">field</InputLabel>
        <Select
          labelId="repos-ordre-by-field-label"
          id="repos-ordre-by-field"
          value={repovars.orderBy?.field}
          label="order field"
          variant="outlined"
          size="small"
          sx={{ fontSize: "12px" }}
          onChange={handleOrderFieldChange}
        >
          <MenuItem value={"UPDATED_AT"} sx={{ fontSize: "11px" }}>
            UPDATED AT
          </MenuItem>
          <MenuItem sx={{ fontSize: "11px" }} value={"CREATED_AT"}>
            CREATED AT
          </MenuItem>
          <MenuItem sx={{ fontSize: "11px" }} value={"PUSHED_AT"}>
            PUSHED AT
          </MenuItem>
          <MenuItem sx={{ fontSize: "11px" }} value={"NAME"}>
            NAME
          </MenuItem>
          <MenuItem sx={{ fontSize: "11px" }} value={"STARGAZERS"}>
            STARGAZERS
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="repos-ordre-by-direction-label">direction</InputLabel>
        <Select
          labelId="repos-ordre-by-direction-label"
          id="repos-order-by-direction"
          value={repovars.orderBy?.direction}
          label="direction"
          variant="outlined"
          size="small"
          sx={{ fontSize: "12px" }}
          onChange={handleOrderDirectionChange}
        >
          <MenuItem sx={{ fontSize: "11px" }} value={"ASC"}>
            ASC
          </MenuItem>
          <MenuItem sx={{ fontSize: "11px" }} value={"DESC"}>
            DESC
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="repos-isfork-label">type</InputLabel>
        <Select
          labelId="repos-isforklabel"
          id="repos-order-by-direction"
          value={repovars.isFork?"FORKS":"ALL"}
          label="type"
          variant="outlined"
          size="small"
          sx={{ fontSize: "12px" }}
          onChange={(e) => {
            const value = e.target.value
            
            setRepoVars((prev) => {
              return {
                ...prev,
                isFork:value === "FORKS" ? true : false,
              };
            });
          }}
        >
          <MenuItem sx={{ fontSize: "11px" }} value={"ALL"}>
            All
          </MenuItem>
          <MenuItem sx={{ fontSize: "11px" }} value={"FORKS"}>
            FORKS
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
