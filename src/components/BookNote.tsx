
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { format } from "date-fns";
import { useState } from "react";

interface BookNoteProps {
  title: string;
  note: string;
  coverUrl: string;
}

const BookNote = ({ title, note, coverUrl }: BookNoteProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="text-left hover:text-primary transition-colors">
          <h3 className="font-medium text-lg max-w-[180px] truncate">{title}</h3>
        </button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="w-screen h-screen bg-background/85"
        style={{
          transformOrigin: "center", 
          animation: "expandFromCenter 0.3s ease-out"
        }}
      >
        <SheetTitle className="sr-only">{title}</SheetTitle>
        <SheetDescription className="sr-only">Reading notes for {title}</SheetDescription>
        <div className="h-full max-w-3xl mx-auto flex flex-col gap-6 pt-6">
          <div className="flex items-start gap-20">
            <div className="w-[300px] h-[440px] relative overflow-visible">
              <img 
                src={coverUrl} 
                alt={title}
                className="w-full h-full object-cover rounded-md shadow-xl transform -rotate-6 transition-transform hover:rotate-0"
              />
            </div>
            <p className="text-2xl leading-relaxed whitespace-pre-wrap font-['Caveat'] flex-1">{note}</p>
          </div>
          <div className="mt-auto pb-8 text-right space-y-1 font-['Caveat']">
            <p>Ankush</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(), "MMMM d, yyyy")}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookNote;
