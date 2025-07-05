import type { IBook } from "@/types/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import type React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
export const BookDetailsModal = ({
  children,
  book,
}: {
  children: React.ReactNode;
  book: IBook;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {book.title} <i className="text-purple-500">by</i> {book.author} is
            a {book.genre.toLowerCase()} book
          </DialogTitle>
          <DialogDescription>{book.description} </DialogDescription>
          <div>
            <p>Books ISBN number: {book.isbn}</p>
            <p className={cn("", { "text-red-500": !book.copies })}>
              {!book.copies ? "No" : book.copies} copies are available now to
              borrow.
            </p>
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Ok</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
