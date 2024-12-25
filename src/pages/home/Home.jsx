import { UserButton } from "@/components/atoms/UserButton";
import { useFetchWorkspaces } from "@/hooks/apis/workspace/useFetchWorkspaces";
import { useEffect } from "react";

export const Home = () => {
  const { isFetching, workspaces } = useFetchWorkspaces();
  //useQuery: Automatically executes the queryFn on component mount or when its queryKey changes.
  // React will not automatically invoke the mutation function. Unlike useQuery, which runs automatically to fetch data, useMutation is explicitly designed to be triggered only when called.

  useEffect(() => {
    if (isFetching) return;
    console.log("Workspaces are: ", workspaces);

    if (workspaces.length === 0 || !workspaces) {
      console.log("No workspaces found, create one");
    }
  }, [isFetching, workspaces]);

  return (
    <>
      <div>Home</div>
      <UserButton />
    </>
  );
};
