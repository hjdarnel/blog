import Link from "./Link";
import Color from "colorjs.io";
import { metadata, getPosts } from "./posts";
import { sans } from "./fonts";
import Script from "next/script";

export { metadata };

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <Script
        id="ld-json"
        strategy="beforeInteractive"
        type="application/ld+json"
      >
        {`{
          "@context": "http://schema.org",
          "@type": "Blog",
          "name": "Overly Enthusiastic",
          "headline": "Overly Enthusiastic",
          "description": "Sometimes I stay up too late thinking about tech and falling down rabbit holes. I'll document some of the more interesting things here",
          "datePublished": "${posts.at(-1).date}",
          "dateModified": "${posts[0].date}",
          "author": "Henry Darnell",
        }`}
      </Script>
      <div className="py-4 mb-8 px-4 border-2 rounded border-gray-300 dark:border-gray-700">
        <p>
          A technical blog by{" "}
          <Link
            className={"border-b-[1px] border-[--link] text-[--link]"}
            href="https://github.com/hjdarnel"
          >
            Henry Darnell
          </Link>
          . Sometimes I stay up too late thinking about tech and falling down
          rabbit holes. I'll document some of the more interesting things here.
        </p>
      </div>
      <div className="relative  flex flex-col gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            className="block py-4 hover:scale-[1.005] will-change-transform"
            href={"/" + post.slug + "/"}
          >
            <article>
              <PostTitle post={post} />
              <PostMeta post={post} />
              <PostSubtitle post={post} />
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}

function PostTitle({ post }) {
  let lightStart = new Color("lab(63 59.32 -1.47)");
  let lightEnd = new Color("lab(33 42.09 -43.19)");
  let lightRange = lightStart.range(lightEnd);
  let darkStart = new Color("lab(81 32.36 -7.02)");
  let darkEnd = new Color("lab(78 19.97 -36.75)");
  let darkRange = darkStart.range(darkEnd);
  let today = new Date();
  let timeSinceFirstPost = (today - new Date(2019, 4, 10)).valueOf();
  let timeSinceThisPost = (today - new Date(post.date)).valueOf();
  let staleness = timeSinceThisPost / timeSinceFirstPost;

  return (
    <h2
      className={[
        sans.className,
        "text-[28px] font-black leading-none mb-2",
        "text-[--lightLink] dark:text-[--darkLink]",
      ].join(" ")}
      style={{
        "--lightLink": lightRange(staleness).toString(),
        "--darkLink": darkRange(staleness).toString(),
      }}
    >
      {post.title}
    </h2>
  );
}

function PostMeta({ post }) {
  return (
    <p className="text-[13px] text-gray-700 dark:text-gray-300">
      {new Date(post.date).toLocaleDateString("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </p>
  );
}

function PostSubtitle({ post }) {
  return <p className="mt-1">{post.spoiler}</p>;
}
