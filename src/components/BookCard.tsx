import type { IBook } from "@/types/types";
import { EditBookModal } from "./modals/EditBookModal";
import { BorrowModal } from "./modals/BorrowModal";
import { BookDetailsModal } from "./modals/BookDetailsModal";
import { DeleteModal } from "./modals/DeleteModal";
export const BookCard = ({ book }: { book: IBook }) => {
  const { title, author, genre, copies, isbn } = book;

  return (
    <div className="shadow-sm p-4 rounded-sm">
      <BookDetailsModal book={book}>
        <div>
          <p>
            <span className="uppercase text-purple-400">Title:</span>{" "}
            <span className="font-dancing-script italic font-semibold text-lg">
              {title}
            </span>
          </p>

          <p>
            <span className="uppercase text-purple-400">Author:</span> {author}
          </p>
          <p>
            <span className="uppercase text-purple-400">Genre:</span> {genre}
          </p>
          <p>
            <span className="uppercase text-purple-400">Isbn:</span> {isbn}
          </p>
          <p>
            <span className="uppercase text-purple-400">Copies:</span> {copies}
          </p>
        </div>
      </BookDetailsModal>
      <div className="flex gap-2 justify-end">
        <EditBookModal book={book} />

        <BorrowModal book={book} />
        <DeleteModal id={book._id} />
      </div>
    </div>
  );
};
