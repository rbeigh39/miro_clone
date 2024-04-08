import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Footer_Props {
  title: string;
  author_label: string;
  created_at_label: string;
  is_favourite: boolean;
  onClick: () => any;
  disabled: boolean;
}

export const Footer = ({
  title,
  author_label,
  created_at_label,
  is_favourite,
  onClick,
  disabled,
}: Footer_Props) => {
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[100%-20px]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
        {author_label}, {created_at_label}
      </p>
      <button
        disabled
        onClick={onClick}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn(
            "h-4 w-4",
            is_favourite && "fill-blue-600 text-blue-600"
          )}
        />
      </button>
    </div>
  );
};
