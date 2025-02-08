import { useState, useRef } from "react";
import { Book, ReadingStatus } from "@/types/book";
import BookCard from "@/components/BookCard";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const defaultBooks: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverUrl: "/Book_Cover_1.jpg",
    status: "completed",
  },
  {
    id: "2",
    title: "Homegoing",
    author: "Yaa Gyasi",
    coverUrl: "/Book_Cover_2.jpg",
    status: "reading",
  },
  {
    id: "3",
    title: "Slouching Towards Bethlehem",
    author: "Joan Didion",
    coverUrl: "/Book_Cover_3.jpg",
    status: "reading",
  },
  {
    id: "4",
    title: "Whole Numbers and Half Truths",
    author: "Rukmini S.",
    coverUrl: "/Book_Cover_4.jpg",
    status: "completed",
  },
  {
    id: "5",
    title: "Betting on the Muse",
    author: "Charles Bukowski",
    coverUrl: "/Book_Cover_5.jpg",
    status: "reading",
  },
  {
    id: "6",
    title: "Memories on a Plate",
    author: "Brinda Narayan",
    coverUrl: "/Book_Cover_6.jpg",
    status: "not-started",
  },
  {
    id: "7",
    title: "Lekin",
    author: "Jaun Elia",
    coverUrl: "/Book_Cover_7.webp",
    status: "completed",
  },
  {
    id: "8",
    title: "Munnu",
    author: "Malik Sajad",
    coverUrl: "/Book_Cover_8.jpg",
    status: "reading",
  },
  {
    id: "9",
    title: "Before the Coffee Gets Cold",
    author: "Toshikazu Kawaguchi",
    coverUrl: "/Book_Cover_9.jpg",
    status: "not-started",
  },
  {
    id: "10",
    title: "Salt, Fat, Acid, Heat",
    author: "Samin Nosrat",
    coverUrl: "/Book_Cover_10.jpg",
    status: "reading",
  },
];

const Index = () => {
  const [books, setBooks] = useState<Book[]>(defaultBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [titleLanguage, setTitleLanguage] = useState(0);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { toast } = useToast();
  const intervalRef = useRef<number>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const titles = [
    "My Bookshelf",
    "Mi Biblioteca",
    "我的书架",
    "Mein Bücherregal",
    "मेरी किताबों की अलमारी"
  ];

  const handleMouseEnter = () => {
    intervalRef.current = window.setInterval(() => {
      setTitleLanguage((prev) => (prev + 1) % titles.length);
    }, 500);
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.log("Audio playback failed:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setTitleLanguage(0);
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (id: string, newStatus: ReadingStatus) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, status: newStatus } : book
      )
    );
    
    toast({
      title: "Status Updated",
      description: "Your book's reading status has been updated.",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-background p-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#D3E4FD_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      <audio
        ref={audioRef}
        src="/hover-sound.mp3"
        preload="auto"
      />
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-12 space-y-6">
          <h1 
            className="text-8xl font-bold text-primary animate-fade-up font-tanker tracking-wider transition-all duration-300 py-12"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {titles[titleLanguage]}
          </h1>
          
          <div className="flex items-start justify-between animate-fade-up relative" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-2xl font-medium text-primary font-bevellier">On Shelf this Month <span className="text-base opacity-70">February</span></h2>
            
            <div className="absolute right-[5%] mt-1">
              <div className={`flex items-center gap-2 transition-all duration-300 ${isSearchExpanded ? 'w-64' : 'w-10'}`}>
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 ${
                    isSearchExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
                <button
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                >
                  <Search className="w-6 h-6 text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {filteredBooks.map((book, index) => (
            <div
              key={book.id}
              style={{ animationDelay: `${index * 0.05}s` }}
              className="animate-fade-up"
            >
              <BookCard book={book} onStatusChange={handleStatusChange} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
