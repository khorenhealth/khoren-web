import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleIcon } from "@/components/_core/landing-pages/svg";

export function GoogleSignButton({ className }: { className?: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "h-12 w-full gap-2 rounded-full border-[#E6E8EC] bg-white text-sm font-medium text-healiu-dark-dark hover:bg-healiu-neutral-light",
        className,
      )}
    >
      Continue with Google
      <GoogleIcon />
    </Button>
  );
}
