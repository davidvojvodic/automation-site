import SectionSvg from "@/public/assets/svg/SectionSvg";
import { cn } from "@/lib/utils";

interface SectionProps {
  className?: string;
  id?: string;
  crosses?: boolean;
  crossesOffset?: string;
  customPaddings?: string;
  children: React.ReactNode;
}

function Section({
  className,
  id,
  crosses,
  crossesOffset,
  customPaddings,
  children,
}: SectionProps) {
  return (
    <div
      id={id}
      className={cn(
        "relative",
        customPaddings ||
          `py-10 md:py-12 lg:py-16 xl:py-20 ${crosses ? "md:py-16 lg:py-24 xl:py-28" : ""}`,
        className
      )}
    >
      {children}

      <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-10" />
      <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10" />

      {crosses && (
        <>
          <div
            className={cn(
              "hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-stroke-1 pointer-events-none lg:block xl:left-10 right-10",
              crossesOffset
            )}
          />
          <SectionSvg crossesOffset={crossesOffset} />
        </>
      )}
    </div>
  );
}

export default Section;
