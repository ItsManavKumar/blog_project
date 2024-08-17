import { useSession } from "next-auth/react";
import { FormEvent, useRef, useState } from "react";
import { api } from "~/utils/api";
import { Button } from "./Button";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles


const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export function NewTweetForm() {
  const { data: session, status } = useSession();
  if (status !== "authenticated") return null;

  return <Form />;
}


function Form() {
  const { data: session } = useSession();
  const [header, setHeader] = useState("");
  const [content, setContent] = useState(""); // Keep as HTML content
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const createTweet = api.tweet.create.useMutation({
    onSuccess: () => {
      setHeader("");
      setContent("");
      setImageUrl(undefined);
      setTags([]);
    },
  });

  function handleTagInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault();
      if (tags.length < 4) {
        setTags([...tags, e.currentTarget.value.trim()]);
        e.currentTarget.value = "";
      }
    }
  }

  
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    createTweet.mutate({
      header,
      content, // Use HTML content directly
      imageUrl: imageUrl ?? undefined,
      tags: tags.length > 0 ? tags.join(" ") : undefined,
    });
  }

  return (
    <div className="flex min-h-max bg-[#f5f5f5]">
      <div className="flex h-full min-h-screen bg-[#f5f5f5]">
        <form
          onSubmit={handleSubmit}
          className="flex w-[900px] flex-1 flex-col px-4 pt-16 lg:ml-36"
        >
          <div className="flex flex-col rounded-t-md border-x bg-white">
            <input
              type="text"
              accept="image/*"
              value={imageUrl ?? ""}
              onChange={(e) => setImageUrl(e.target.value ?? undefined)}
              className="text-md relative top-12 ml-20 mr-auto rounded-md border-2 p-1 text-center outline-none"
              placeholder="Add Cover Image"
            />
            <textarea
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="placeholder-big text-bold header-big ml-16 mr-3 mt-20 flex h-[80px] p-1 text-lg outline-none placeholder:text-[#525252]"
              placeholder="New post title here..."
              required
            />
            <div className="mb-10 ml-16">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="mr-2 mt-2 rounded bg-gray-100 px-2 py-1 text-blue-700"
                >
                  {tag}
                </span>
              ))}
              {tags.length < 4 && (
                <input
                  type="text"
                  onKeyDown={handleTagInput}
                  className="text-bold flex rounded-md p-2 text-lg outline-none placeholder:text-base placeholder:text-[#525252]"
                  placeholder="Add up to 4 tags..."
                />
              )}
            </div>
          </div>
          <div className="flex rounded-b-md border-x border-b bg-white">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="min-h-[400px] flex-grow overflow-hidden break-words rounded-b-md text-xl outline-none"
              placeholder="Write your post content here..."
            />
          </div>
          <Button className="mt-4 self-start rounded-md bg-blue-700">
            Publish
          </Button>
        </form>
        <div className="relative hidden w-[30%] flex-shrink-0 pt-56 lg:block">
          <span className="text-lg font-semibold">Tagging Guidelines</span>
          <div className="mr-16 space-y-2 p-2 text-base text-[#525252]">
            <li className="list-inside">
              Tags help people find your post - think of them as the topics or
              categories that best describe your post.
            </li>
            <li>
              Add up to four comma-separated tags per post. Use existing tags
              whenever possible.
            </li>
            <li>
              Some tags have special posting guidelines - double check to make
              sure your post complies with them.
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}
