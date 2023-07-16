import { Viewer } from "@/state/providers/home/viewr_query_types";
import { Card, Typography, Chip, styled } from "@mui/material";
import { Link } from "react-router-dom";


interface GistsCardsProps {
  profile: Viewer;
}

export function GistsStatCards({ profile }: GistsCardsProps) {
  const gists = profile.gists
  // const gists = profile.gists

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
        <div className="min-w-fit ">
          {gists.totalCount && <h3 className="text-6xl ">{gists.totalCount}</h3>}
          {gists && <Title className="text-xl">Gists</Title>}
        </div>

        <div className=" flex flex-wrap gap-1">
          {gists.nodes.map((gist) => {
            return (
              <Link className="text-sm " to={"/gists"} key={gist.name}>
                <Chip
                  variant="outlined"
                  className="hover:text-blue-400 w-[100px]"
                  key={gist.name}
                  label={<h3 className="text-sm">{gist.name}</h3>}
                />
              </Link>
            );
          })}
          {/* <Link className="text-sm " to={"/gists"}> */}
          <Chip variant="outlined" label={<h3 className="text-xs  ">...</h3>} />
          {/* </Link> */}
        </div>
      </CardWrapper>
    </div>
  );
}
