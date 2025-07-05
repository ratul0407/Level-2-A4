import { Loader } from "@/components/utility/Loader";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";

export const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);
  console.log(data, isLoading);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-[70vh] ">
        <Loader />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {data?.data.map(
        ({
          totalQuantity,
          book,
        }: {
          totalQuantity: number;
          book: { title: string; author: string; isbn: string };
        }) => {
          return (
            <div
              key={book.isbn}
              className="shadow-sm border border-gray-100 rounded-lg p-4"
            >
              <p className="text-purple-500 font-bold font-dancing-script">
                {book.title}
              </p>
              <p>By {book.author}</p>
              <p className="italic">ISBN number: {book.isbn}</p>
              <p>Copies borrowed: {totalQuantity}</p>
            </div>
          );
        }
      )}
    </div>
  );
};
