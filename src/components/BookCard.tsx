
import { Book, ReadingStatus } from "@/types/book";
import { useState } from "react";
import { Check, BookOpen, Clock } from "lucide-react";
import BookNote from "./BookNote";

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
}

const statusIcons = {
  "not-started": Clock,
  "reading": BookOpen,
  "completed": Check,
};

const bookNotes: { [key: string]: string } = {
  "The Midnight Library": "This book reminded me that we all have infinite possibilities in life. Every choice we make creates a new path, but that doesn't mean the path not taken was better.\n\nThe way Matt Haig writes about depression and hope really touched me. Mrs. Elm's character felt like a warm hug in book form.\n\nStill thinking about those parallel lives...\n\n- Your fellow reader",
  "Homegoing": "The way this story spans generations is breathtaking. Each chapter feels like discovering a new photograph in an old family album.\n\nFavorite chapters: Effia & Esi's stories\nThemes to remember: Legacy, Identity, Freedom\n\nThis book changed how I think about family stories.",
  "Slouching Towards Bethlehem": "Didion's sharp observations cut right through the chaos of the 60s. Her writing style is like a camera capturing exact moments in time.\n\nThe title essay is particularly haunting. The way she describes the San Francisco scene feels eerily current.\n\nMust revisit the essay on self-respect.",
  "Whole Numbers and Half Truths": "Key statistics to remember:\n- Demographics insights\n- Economic patterns\n- Social indicators\n\nLoved how data tells stories about modern India. Numbers don't lie, but context matters.\n\nNeed to fact-check these with recent data.",
  "Betting on the Muse": "Bukowski's raw honesty hits different at 2 AM. His poems about ordinary life make the mundane feel extraordinary.\n\nFavorite poem: 'The Post Office'\nMood: Gritty realism\n\nReminder: Sometimes beauty hides in life's ugliest corners.",
  "Memories on a Plate": "Loved the blend of storytelling and cooking. Each recipe feels like a memory being shared over a warm cup of tea.\n\nMust try:\n- The mango pickle recipe\n- Sunday morning dosa ritual\n\nReminder: Food is never just about eating.",
  "Lekin": "Jaun Elia's words feel like midnight conversations with yourself. The Urdu flows like water, even in translation.\n\nFavorite lines marked on pg. 42\nMood: Melancholic beauty\n\nNeed to memorize more verses.",
  "Munnu": "The black and white artwork perfectly captures Kashmir's complexity. Every panel feels heavy with meaning.\n\nPowerful moments:\n- The school scene\n- Family dinner\n\nArt and storytelling at their best.",
  "Before the Coffee Gets Cold": "Read this in one sitting at my local coffee shop. The rules of time travel are so beautifully specific.\n\nQuestion: Which person from my past would I want to meet?\n\nMaybe some regrets are better left unexplored...",
  "Salt, Fat, Acid, Heat": "More than a cookbook - it's like having a cooking teacher right beside you. The illustrations make complex concepts so clear.\n\nKey lessons:\n- Trust your senses\n- Understand the why\n- Practice, practice\n\nTime to experiment!"
};

const BookCard = ({ book, onStatusChange }: BookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const StatusIcon = statusIcons[book.status];

  return (
    <div
      className="relative group animate-scale-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {book.title === "The Midnight Library" && (
        <div className="absolute -top-[35px] right-0 w-[96px] h-[96px] mb-[75px] z-10">
          <img
            src="/PR2N.png"
            alt="PRN Badge"
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {isHovered && !document.querySelector('[role="dialog"]') && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4">
            <button
              onClick={() => onStatusChange(book.id, "not-started")}
              className={`p-2 rounded-full ${
                book.status === "not-started" ? "bg-[#f4e472]" : "bg-white"
              }`}
            >
              <Clock className={`w-6 h-6 ${
                book.status === "not-started" ? "text-black" : "text-gray-800"
              }`} />
            </button>
            <button
              onClick={() => onStatusChange(book.id, "reading")}
              className={`p-2 rounded-full ${
                book.status === "reading" ? "bg-[#f4e472]" : "bg-white"
              }`}
            >
              <BookOpen className={`w-6 h-6 ${
                book.status === "reading" ? "text-black" : "text-gray-800"
              }`} />
            </button>
            <button
              onClick={() => onStatusChange(book.id, "completed")}
              className={`p-2 rounded-full ${
                book.status === "completed" ? "bg-[#f4e472]" : "bg-white"
              }`}
            >
              <Check className={`w-6 h-6 ${
                book.status === "completed" ? "text-black" : "text-gray-800"
              }`} />
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-1">
        <BookNote title={book.title} note={bookNotes[book.title]} coverUrl={book.coverUrl} />
        <p className="text-primary-muted text-sm">{book.author}</p>
        <div className="flex items-center space-x-2 text-primary">
          <StatusIcon className="w-4 h-4" />
          <span className="text-sm capitalize">{book.status.replace("-", " ")}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
