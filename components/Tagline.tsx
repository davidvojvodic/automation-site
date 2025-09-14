import brackets from "@/public/assets/svg/Brackets";
import { cn } from "@/lib/utils";

interface TaglineProps {
  className?: string;
  children: React.ReactNode;
}

function Tagline({ className, children }: TaglineProps) {
  return (
    <div className={cn("tagline flex items-center", className)}>
      {brackets("left")}
      <div className="mx-3 text-n-3">{children}</div>
      {brackets("right")}
    </div>
  );
}

export default Tagline;
