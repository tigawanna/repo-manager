import { GithubButton } from "./components/GithubButton";

interface HomePageProps {

}

export function HomePage({}:HomePageProps){
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <div className="text-2xl font-bold">HOME PAGE</div>
    <GithubButton/>
  </div>
);
}
