import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";

export function AuthHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="app-width flex h-20 items-center justify-between sm:h-24">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/svgs/khoren-logo.svg"
            alt="Khoren"
            width={135}
            height={48}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>
        {/* <Button className={ctaPrimaryClassName} style={ctaPrimaryStyle}>
          Buy a service
        </Button> */}
      </div>
    </header>
  );
}
