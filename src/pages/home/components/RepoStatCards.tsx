import { Viewer } from "@/state/providers/home/viewr_query_types";
import { Card, Typography, Chip, styled } from "@mui/material";
import { Link } from "react-router-dom";

interface RepoStatCardsProps {
  profile: Viewer;
}

export function RepoStatCards({ profile }: RepoStatCardsProps) {
  const repos = profile.repositories;

  const CardWrapper = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: "7px",
    margin: "2px",
    boxShadow: `1px 0px 2px ${theme.palette.primary.main}`,
    "&:hover": {
      boxShadow: `1px 0px 2px ${theme.palette.secondary.main}`,
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "1.2rem",
    color: theme.palette.secondary.contrastText,
  }));

  return (
    <div className="w-full  flex flex-col lg:flex-row p-2 gap-3">
      <CardWrapper elevation={2} className="flex flex-col md:flex-row  gap-3">
        <div className="min-w-fit hover:text-purple-400">
          {repos.totalCount && <h3 className="text-6xl ">{repos.totalCount}</h3>}
          {repos && <Title className="text-xl">Repositories</Title>}
        </div>

        <div className=" flex flex-wrap gap-1">
          {repos.nodes.map((repo) => {
            return (
              <Chip
                variant="outlined"
                className="hover:bg-purple-950"
                key={repo.name}
                label={<h3 className="text-sm">{repo.name}</h3>}
              />
            );
          })}
          <Link className="text-sm " to={"/repos"}>
            <Chip
              variant="outlined"
              label={<h3 className="text-xs hover:text-blue-600">shom more...</h3>}
            />
          </Link>
        </div>
      </CardWrapper>
    </div>
  );
}
