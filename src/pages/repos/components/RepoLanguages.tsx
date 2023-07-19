import { IViewerOneRepoRepository } from "@/state/providers/repos/query/viewer_one_repos_types";
import { Card, Chip, useTheme, Typography } from "@mui/material";

interface RepoLanguagesProps {
  repo: IViewerOneRepoRepository;
}

export function RepoLanguages({ repo }: RepoLanguagesProps) {
  const theme = useTheme();
  const langs = repo?.languages.nodes;
  return (
    <div className="w-full h-full flex flex-col gap-2 pl-5">
      <Typography variant="caption">Languages</Typography>
      <Card className="w-full h-full flex flex-wrap items-center  gap-2">
        {langs.map((lang) => {
          return (
            <Chip
              key={lang.id}
              label={lang.name}
              variant="outlined"
              sx={{
                border: "1px solid" + lang.color,
              }}
            />
          );
        })}
      </Card>
    </div>
  );
}
