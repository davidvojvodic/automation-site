import TagLine from "./Tagline";
import { cn } from "@/lib/utils";

interface HeadingProps {
  className?: string;
  title?: React.ReactNode;
  text?: React.ReactNode;
  tag?: React.ReactNode;
}

function Heading({ className, title, text, tag }: HeadingProps) {
  return (
    <div
      className={cn(
        "max-w-[50rem] mx-auto mb-12 md:mb-16 lg:mb-20 md:text-center",
        className
      )}
    >
      {tag && <TagLine className="mb-4 md:justify-center">{tag}</TagLine>}
      {title && <h2 className="h2">{title}</h2>}
      {text && <p className="body-2 mt-4 text-n-4">{text}</p>}
    </div>
  );
}

export default Heading;
