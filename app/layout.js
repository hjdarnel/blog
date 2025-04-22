import PlausibleProvider from "next-plausible";
import Link from "./Link";
import HomeLink from "./HomeLink";
import { serif } from "./fonts";
import "./global.css";

export const metadata = {
  metadataBase: new URL("https://blog.darnell.io"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={serif.className}>
      <body className="mx-auto max-w-2xl bg-[--bg] px-5 py-12 text-[--text]">
        <PlausibleProvider domain="darnell.io">
          <header className="mb-8 flex flex-row place-content-between">
            <HomeLink />
            <span className="relative top-[4px] italic">
              by{" "}
              <Link href="https://darnell.io" target="_blank">
                <img
                  alt="Henry Darnell"
                  src="https://github.com/hjdarnel.png"
                  className="relative -top-1 mx-1 inline h-8 w-8 rounded-full"
                />
              </Link>
            </span>
          </header>
          <main>{children}</main>
        </PlausibleProvider>
      </body>
    </html>
  );
}
