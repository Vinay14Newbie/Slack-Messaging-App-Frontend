import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const NotfoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center h-screen w-full flex-col items-center bg-gray-100">
      <Card className="text-center shadow-lg max-w-lg">
        <CardHeader>
          <CardTitle>404 Page Not Found</CardTitle>
          <p className="text-gray-600">
            The page you are looking for does not exist.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <img
            className="rounded-lg shadow-lg w-[400px]"
            src="https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1900.jpg?t=st=1734773387~exp=1734776987~hmac=53154070833c221c923f83cbf49ad0920859ea3c1dd3f71beeda3c8b4f2a45c0&w=740"
            alt="page_not_found_img"
          />

          <Button
            variant="outline"
            className="mt-4 w-[105px]"
            onClick={() => navigate(-1)} //you will go to just previous page
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
