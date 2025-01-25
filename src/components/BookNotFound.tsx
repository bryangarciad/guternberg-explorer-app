import { GoBackButton } from "./GoBackButton"

export const BookNotFound: React.FC = () => {
 return (
        <div className="container mx-auto px-4 py-8">
          <GoBackButton />
          <div className="text-center mt-8">Book not found</div>
        </div>
      )
  }
  