import { BookCard } from "@/components/BookCard";
import { Loader } from "@/components/utility/Loader";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/types";

export const Home = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);
  console.log(data?.data);
  if (isLoading)
    return (
      <div className="flex min-w-full justify-center items-center min-h-[70vh]">
        <Loader />;
      </div>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data?.data.map((book: IBook) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};
