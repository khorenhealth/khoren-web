"use client";

import { useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { type Appointment } from "./appointments-data";

const starValues = [1, 2, 3, 4, 5];

export function RateDialog({
  open,
  visit,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  visit: Appointment | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (rating: number) => void;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const shown = hover || rating;
  const visitRef = useRef(visit);
  if (visit) visitRef.current = visit;
  const shownVisit = visit ?? visitRef.current;

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) {
      setRating(0);
      setHover(0);
      setComment("");
    }
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!rating) return;
    onConfirm(rating);
    handleOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#102844]/40 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[26.5rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-[0_24px_60px_rgba(16,40,68,0.22)] transition duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:p-6">
          <Dialog.Title className="text-lg font-semibold tracking-tight text-healiu-dark-dark">
            Rate Your Visit
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            {shownVisit ? `${shownVisit.title} with ${shownVisit.provider}` : "Rate your visit"}
          </Dialog.Description>

          <form className="mt-6" onSubmit={submit}>
            <div className="flex flex-col items-center" onMouseLeave={() => setHover(0)}>
              <div className="flex items-center gap-2" role="radiogroup" aria-label="Your rating">
                {starValues.map((value) => {
                  const active = value <= shown;
                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={rating === value}
                      aria-label={`${value} star${value === 1 ? "" : "s"}`}
                      onMouseEnter={() => setHover(value)}
                      onClick={() => setRating(value)}
                      className="rounded-md p-0.5"
                    >
                      <Star
                        className={cn("size-8", active ? "fill-[#F5A524] text-[#F5A524]" : "text-[#D8DEE6]")}
                        strokeWidth={active ? 0 : 1.5}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-[#9AA6B2]">
                {rating ? `${rating} star${rating === 1 ? "" : "s"}` : "Tap a star to rate"}
              </p>
            </div>

            <label className="mt-6 block text-sm font-medium text-healiu-dark-dark" htmlFor="visit-rating-comment">
              Comment
            </label>
            <textarea
              id="visit-rating-comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Share your experience with this provider"
              className="mt-2 min-h-20 w-full resize-none rounded-lg border border-[#EEF2F6] bg-[#F7F9FC] px-3 py-2.5 text-sm text-healiu-dark-dark outline-none placeholder:text-[#B0B8C4] focus:border-healiu-blue"
            />

            <button
              type="submit"
              disabled={!rating}
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#C5CED6] text-sm font-semibold text-white transition-colors enabled:bg-healiu-blue enabled:hover:bg-healiu-blue-hover"
            >
              Submit Review
            </button>
          </form>

          <Dialog.Close className="sr-only">Close</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
