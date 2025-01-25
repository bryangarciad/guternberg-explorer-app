import { BookDetails } from "@/components/BookDetails"
import { BookNotFound } from "@/components/BookNotFound";
import { GoBackButton } from "@/components/GoBackButton";
import axios from "axios";


export default async function BookPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    let book = null;
    try {
      const response = await axios.get(`http://147.182.188.166:8000/book/${id}`);
      if (response.status === 200) {
        book = response.data.data;
        book.id = id
      }
    } catch(err) {
      console.error(err);
    }

  if (!book) return <BookNotFound/>

  return (
    <div className="container mx-auto px-4 py-8">
      <GoBackButton />
      <BookDetails book={book} />
    </div>
  )
}

