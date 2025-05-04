import Link from "./Link";
import HomeLink from "./HomeLink";
import { serif } from "./fonts";
import UmamiAnalytics from "./UmamiAnalytics";
import "./global.css";

export const metadata = {
  metadataBase: new URL("https://blog.darnell.io"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={serif.className}>
      <body className="mx-auto max-w-2xl bg-[--bg] px-5 py-12 text-[--text]">
        <UmamiAnalytics />
        <header className="mb-12 flex flex-row place-content-between">
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
      </body>
    </html>
  );
}
