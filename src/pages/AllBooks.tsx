import { BorrowModal } from "@/components/modals/BorrowModal";
import { DeleteModal } from "@/components/modals/DeleteModal";
import { EditBookModal } from "@/components/modals/EditBookModal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/types";

export const AllBooks = () => {
  const { data } = useGetBooksQuery(undefined);
  return (
    <div>
      <Table>
        <TableCaption>
          A list of all the books available on the store
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((book: IBook) => (
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                {book.available ? "Available" : "Unavailable"}
              </TableCell>
              <TableCell className="flex gap-2">
                <EditBookModal small={true} book={book} />
                <DeleteModal id={book._id} />
                <BorrowModal book={book} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
