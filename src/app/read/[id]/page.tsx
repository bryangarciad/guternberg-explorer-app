import { BookNotFound } from "@/components/BookNotFound";
import { GoBackButton } from "@/components/GoBackButton";
import { Reader } from "@/components/Reader"

export default async function ReaderPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    console.log(id)

    const book = null;

  if (!book) return <BookNotFound/>


  return (
    <div className="container mx-auto px-4 py-8">
      <GoBackButton />
      <Reader book={book} />
    </div>
  )
}

