import { WorkspaceNavbar } from "@/components/organisms/workspace/WorkspaceNavbar";
import { WorkspaceSidebar } from "@/components/organisms/workspace/WorkspaceSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const WorkspaceLayout = ({ children }) => {
  return (
    <div className="h-[100vh]">
      <WorkspaceNavbar />
      <div className="flex h-[calc(100vh-40px)]">
        <WorkspaceSidebar />

        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId={"workspace-resize"}
        >
          <ResizablePanel
            defaultSize={50}
            minSize={11}
            className="bg-slack-medium"
          >
            <div className="flex h-[200px] items-center justify-center p-6">
              <span className="font-semibold">One</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
