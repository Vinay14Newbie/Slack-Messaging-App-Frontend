import { UserButton } from "@/components/atoms/UserButton";
import { useFetchWorkspaces } from "@/hooks/apis/workspace/useFetchWorkspaces";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

  const { isFetching, workspaces } = useFetchWorkspaces();
  //useQuery: Automatically executes the queryFn on component mount or when its queryKey changes.
  // React will not automatically invoke the mutation function. Unlike useQuery, which runs automatically to fetch data, useMutation is explicitly designed to be triggered only when called.

  useEffect(() => {
    if (isFetching) return;
    console.log("Workspaces are: ", workspaces);

    if (workspaces.length === 0 || !workspaces) {
      console.log("No workspaces found, create one");
      setOpenCreateWorkspaceModal(true);
    } else {
      navigate(`/workspaces/${workspaces[0]._id}`);
    }
  }, [isFetching, workspaces, navigate]);

  return (
    <>
      <div>Home</div>
      <UserButton />
    </>
  );
};
