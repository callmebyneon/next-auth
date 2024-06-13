import Link from "next/link";
import { BiLogoGithub } from "react-icons/bi";

export default function GithubLink() {
  return (
    <>
      <div className="fixed top-20 left-0">
        <Link
          href="https://github.com/callmebyneon/next-auth"
          className="text-white text-lg flex gap-2 items-center px-3 py-2 rounded-r-lg bg-black/90 hover:pl-4 transition-[padding]"
        >
          <BiLogoGithub />
          <span className="text-sm hidden sm:inline-block">repository</span>
        </Link>
      </div>
    </>
  );
}
