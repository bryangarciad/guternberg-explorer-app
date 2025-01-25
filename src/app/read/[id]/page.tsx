import { BookNotFound } from "@/components/BookNotFound";
import { GoBackButton } from "@/components/GoBackButton";
import { Reader } from "@/components/Reader"
import axios from "axios";

type Params = Promise<{ id: string[] }>

export default async function ReaderPage({ params }: { params: Params }) {
    const { id } = await params;

    let bookText = null;
    try {
      const response = await axios.get(`http://147.182.188.166:8000/book/content/${id}`);
      if (response.status === 200) {
        bookText = response.data.data;
      }
    } catch(err) {
      console.error(err);
    }

  if (!bookText) return <BookNotFound/>


  return (
    <div className="container mx-auto px-4 py-8">
      <GoBackButton />
      <Reader book={bookText} />
    </div>
  )
}

