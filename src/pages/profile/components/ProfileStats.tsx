
import { Viewer } from "@/state/providers/home/viewr_query_types";
import { Card, Typography,makeStyles } from "@mui/material";
import { styled } from "@mui/material/styles";


interface ProfileStatsProps {
  profile: Viewer;
}

export function ProfileStats({profile}:ProfileStatsProps){

return (
 <div className='w-full h-full flex flex-wrap items-center justify-center gap-3'>
{profile?.repositories?.totalCount&&<ProfileStatsCard figure={profile.repositories.totalCount} title="Repositories"/>}
{profile?.followers?.totalCount&&<ProfileStatsCard figure={profile.followers.totalCount} title="Followers"/>}
{profile?.following?.totalCount&&<ProfileStatsCard figure={profile.following.totalCount} title="Following"/>}
{profile?.watching?.totalCount&&<ProfileStatsCard figure={profile.watching.totalCount} title="Watching"/>}
{profile?.gists?.totalCount&&<ProfileStatsCard figure={profile.gists.totalCount} title="Gists"/>}
{profile?.starredRepositories?.totalCount&&<ProfileStatsCard figure={profile.starredRepositories.totalCount} title="Starred"/>}

 </div>
);
}



const CardContainer = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
//   backgroundColor: theme.palette.secondary.main,
  boxShadow: `0px 0px 2px ${theme.palette.secondary.main}`,
  textAlign: "center",
  color: theme.palette.secondary.contrastText

}));

const Title = styled(Typography)({
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginBottom: "8px",

});

const Figure = styled(Typography)({
  fontSize: "2rem",

});

export interface ProfileStatsCardProps {
  title: string;
  figure: string | number;
}

export function ProfileStatsCard({ figure, title }: ProfileStatsCardProps) {
  return (
    <CardContainer elevation={2} sx={{ width: "100%" }}>
      <Title variant="h6">{title}</Title>
      <Figure variant="h3">{figure}</Figure>
    </CardContainer>
  );
}
