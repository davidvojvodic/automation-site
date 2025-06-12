import { check } from "@/public/assets";
import { pricing } from "@/lib/constants";
import Button from "./Button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PricingItem {
  id: string | number;
  title: string;
  description: string;
  price?: string;
  features: string[];
}

interface PricingListProps {
  className?: string;
}

function PricingList({ className }: PricingListProps) {
  return (
    <div
      className={cn(
        "flex gap-[1rem] max-lg:flex-wrap justify-center",
        className
      )}
    >
      {pricing.map((item: PricingItem) => (
        <div
          key={item.id}
          className={cn(
            "w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4",
            "[&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3"
          )}
        >
          <h4 className="h4 mb-4">{item.title}</h4>

          <p className="body-2 min-h-[4rem] mb-3 text-n-1/50">
            {item.description}
          </p>

          <div className="flex items-center h-[5.5rem] mb-6">
            {item.price && (
              <>
                <div className="h3">$</div>
                <div className="text-[5.5rem] leading-none font-bold">
                  {item.price}
                </div>
              </>
            )}
          </div>

          <Button
            className="w-full mb-6"
            href={item.price ? "/pricing" : "mailto:contact@jsmastery.pro"}
            white={!!item.price}
          >
            {item.price ? "Get started" : "Contact us"}
          </Button>

          <ul>
            {item.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start py-5 border-t border-n-6"
              >
                <Image src={check} width={24} height={24} alt="Check" />
                <p className="body-2 ml-4">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PricingList;
