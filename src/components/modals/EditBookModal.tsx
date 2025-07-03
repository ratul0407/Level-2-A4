import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { IBook } from "@/types/types";
import { PenLine } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useUpdateBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";

export const EditBookModal = ({
  book,
  small,
}: {
  book: IBook;
  small?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [updateBook, { isLoading, isError }] = useUpdateBookMutation(undefined);
  const form = useForm({
    defaultValues: {
      title: book.title,
      author: book.author,
      description: book.description,
      isbn: book.isbn,
      copies: book.copies,
      genre: book.genre,
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = { ...data, copies: +data.copies, isbn: +data.isbn };
    try {
      const bookData = { id: book._id, formData };
      console.log(bookData);
      await updateBook(bookData).unwrap();
      toast.success("Book updated successfully!", {
        position: "top-right",
        duration: 5000,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    } catch (error) {
      console.log(isError, error);
      toast.error("Couldn't Update Book", {
        position: "top-right",
        duration: 5000,
        action: {
          label: "Try again",
          onClick: () => {
            console.log("Try again");
            setOpen(true);
          },
        },
      });
    }
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {!small && <span>Edit</span>}
          <PenLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
            {/* title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="add new title" />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* author */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="add author's name" />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="add new description" />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* ISBN */}
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="add new isbn number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* copies */}
            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step={1}
                      min={0}
                      placeholder="update copies"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* genre */}
            <FormField
              name="genre"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={book.genre}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Genre</SelectLabel>
                          <SelectItem value="FICTION">Fiction</SelectItem>
                          <SelectItem value="NON_FICTION">
                            Non-Fiction
                          </SelectItem>
                          <SelectItem value="SCIENCE">Science</SelectItem>
                          <SelectItem value="HISTORY">History</SelectItem>
                          <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                          <SelectItem value="FANTASY">Fantasy</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
