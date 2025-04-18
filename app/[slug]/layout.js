import HomeLink from "../HomeLink";
import Link from "../Link";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <footer className="mt-12">
        <HomeLink />
        <div className="mt-2">
          <span>
            <Link
              href="https://github.com/hjdarnel/hjdarnel/blob/master/README.md"
              className="border-b-[1px] border-[--link] text-[--link]"
            >
              About me
            </Link>
          </span>
          <span className="p-2">•</span>

          <span>
            <Link
              href="https://twitter.com/hjdarnel"
              className="border-b-[1px] border-[--link] text-[--link]"
            >
              Twitter
            </Link>
          </span>
          <span className="p-2">•</span>
          <span>
            <Link
              href="https://github.com/hjdarnel"
              className="border-b-[1px] border-[--link] text-[--link]"
            >
              GitHub
            </Link>
          </span>
        </div>
      </footer>
    </>
  );
}
