import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";
import { useState } from "react";

export const DeleteModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [deleteBook] = useDeleteBookMutation(undefined);
  const handleDelete = async () => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book Deleted Successfully", {
        position: "top-right",
        duration: 5000,
        action: {
          label: "cancel",
          onClick: () => console.log("cancel"),
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete the book!", {
        position: "top-right",
        duration: 5000,
        action: {
          label: "Try again",
          onClick: () => setOpen(true),
        },
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Do you want to delete this Book?</DialogTitle>
          <DialogFooter>
            <DialogClose asChild>
              <Button>No</Button>
            </DialogClose>
            <Button type="submit" variant="outline" onClick={handleDelete}>
              Yes
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
