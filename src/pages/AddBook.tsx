import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const AddBook = () => {
  const [createBook] = useCreateBookMutation();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      author: "",
      isbn: "",
      copies: "",
      genre: "",
    },
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { copies } = data;
    try {
      await createBook({ ...data, copies: +copies }).unwrap();
      toast.success("Book created successfully!", {
        position: "top-right",
        duration: 5000,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
      navigate("/all-books");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create book!", {
        position: "top-right",
        duration: 5000,
      });
    }
  };
  return (
    <div className="max-w-[500px] mx-auto border rounded-lg p-4">
      <Form {...form}>
        <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
          {/* title */}
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="add book title"
                    type="string"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* description */}
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="add book description"
                    type="string"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* author */}
          <FormField
            name="author"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Author</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="add book author"
                    type="string"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* ISBN number */}
          <FormField
            name="isbn"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ISBN number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="add the book isbn number"
                    type="number"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* copies */}
          <FormField
            name="copies"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Copies</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="add the available copies of the book"
                    type="number"
                    required
                    min={0}
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
                <FormLabel className="font-bold">Genre</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Genre</SelectLabel>
                        <SelectItem value="FICTION">Fiction</SelectItem>
                        <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
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
          <Button type="submit">Create Book</Button>
        </form>
      </Form>
    </div>
  );
};
