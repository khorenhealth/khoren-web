import { cn } from "cn";
import { ReactNode } from "react";

export function FloatingField({
    id,
    label,
    type = "text",
    placeholder,
    autoComplete,
    trailing,
    value,
    onChange,
    invalid = false,
}: {
    id: string;
    label: string;
    type?: string;
    placeholder: string;
    autoComplete?: string;
    trailing?: ReactNode;
    value?: string;
    onChange?: (value: string) => void;
    invalid?: boolean;
}) {
    return (
        <div className="relative">
            <label
                htmlFor={id}
                className={cn(
                    "absolute -top-2.5 left-3 z-10 bg-white px-1.5 text-xs font-medium",
                    invalid ? "text-red-500" : "text-healiu-dark",
                )}
            >
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required
                value={value}
                onChange={
                    onChange
                        ? (event) => onChange(event.target.value)
                        : undefined
                }
                aria-invalid={invalid || undefined}
                className={cn(
                    "h-12 w-full rounded-xl border px-4 text-sm text-healiu-dark-dark outline-none transition-colors placeholder:text-healiu-dark-lighter",
                    invalid
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-[#E6E8EC] bg-white focus:border-healiu-blue",
                    trailing && "pr-11",
                )}
            />
            {trailing}
        </div>
    );
}