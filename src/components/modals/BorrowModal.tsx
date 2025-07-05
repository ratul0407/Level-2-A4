import { BookText, CalendarIcon } from "lucide-react";
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
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import type { IBook } from "@/types/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";
import { useState } from "react";

export const BorrowModal = ({
  book,
  small,
}: {
  book: IBook;
  small?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [borrowBook, { isLoading }] = useBorrowBookMutation(undefined);
  const form = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { quantity, dueDate } = data;
    const borrowData = {
      book: book?._id,
      quantity: +quantity,
      dueDate,
    };
    try {
      await borrowBook(borrowData).unwrap();
      toast.success("Book borrowed successfully", {
        position: "top-right",
        duration: 5000,
      });
      form.reset();
      setOpen(false);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const err = error as {
          data?: {
            message?: string;
            success?: boolean;
            error?: unknown;
          };
        };
        if (err?.data?.message) {
          setOpen(false);
          toast.error(err.data.message + " copies", {
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
      }
      form.reset();
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button disabled={!book.available}>
            {!small && <span>Borrow</span>}

            <BookText />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrow {book?.title}</DialogTitle>
            <DialogDescription>
              {book?.title} is a {book.genre.toLowerCase()} by {book.author}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        type="number"
                        placeholder="enter the quantity"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="dueDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[250px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date <= new Date()}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={isLoading}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading}>
                  Borrow Book
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
