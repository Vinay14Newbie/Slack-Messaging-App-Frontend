/*
Initial Setup:
The promise state is initialized to null.

Triggering the confirmation function:
When confirmation() is called, it creates a new Promise.
The setPromise function is used to store an object containing a reference to the resolve function of this promise.

Displaying the Confirmation Dialog:
The state promise being non-null triggers the rendering of the confirmation dialog (via ConfirmDialog).

User Interaction:
If the user clicks "Confirm," the handleConfirm function calls promise.resolve(true) to resolve the stored promise.
If the user clicks "Cancel," the handleClose function clears the promise state, effectively rejecting the confirmation process.

Outside Handling:
Wherever confirmation() was called, the program resumes once the promise resolves, using the returned value (e.g., true or undefined).
*/

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export const useConfim = ({ title, message }) => {
  const [promise, setPromise] = useState(null);

  async function confirmation() {
    console.log("confirmation triggered");
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  }

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const ConfirmDialog = () => {
    return (
      <Dialog open={promise !== null} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={handleClose} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return { ConfirmDialog, confirmation };
};
