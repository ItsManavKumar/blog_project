import { useSession } from "next-auth/react";
import {
  FormEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { api } from "~/utils/api"; // Ensure this import is correct
import { Button } from "./Button";

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

export function NewTweetForm() {
  const { data: session, status } = useSession();
  if (status !== "authenticated") return null;

  return <Form />;
}

function Form() {
    const { data: session } = useSession();
    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined); // Initialize as undefined
    const textAreaRef = useRef<HTMLTextAreaElement>();
    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
      updateTextAreaSize(textArea);
      textAreaRef.current = textArea;
    }, []);
  
    useLayoutEffect(() => {
      if (textAreaRef.current) {
        updateTextAreaSize(textAreaRef.current);
      }
    }, [content]);
  
    const createTweet = api.tweet.create.useMutation({
      onSuccess: (newTweet) => {
        setHeader("");
        setContent("");
        setImageUrl(undefined); // Reset to undefined
  
        if (!session) return;
  
        // Adjust cache update or state logic as needed
      },
    });
  
    function handleSubmit(e: FormEvent) {
      e.preventDefault();
      createTweet.mutate({ header, content, imageUrl: imageUrl ?? undefined });
    }
  
    return (
      <div className=" flex h-screen bg-[#f5f5f5]">
        <form
          onSubmit={handleSubmit}
          className="ml-40 mt-[60px] flex w-[900px] flex-col gap-2 border-b px-4 absolute "
        >
          <div className="flex gap-4 border-1 rounded-md flex-col bg-white">

          <input
              type="text"
            accept="image/*"
              value={imageUrl ?? ""}
              onChange={(e) => setImageUrl(e.target.value || undefined)}
              className="w-[150px] rounded-md p-1 text-md border-2 relative top-16 text-center ml-20"
              placeholder="Add Cover Image"
            />
            
            <input
              type="text"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="flex h-[200px] rounded-md p-4 text-lg shadow-sm placeholder-big ml-16  text-bold"
              placeholder="hi"
              required
            />
          </div>
          <div className="flex bg-white">
            <textarea
              ref={inputRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[400px] flex-grow resize-none overflow-hidden rounded-md p-4 text-lg shadow-sm ml-16"
              placeholder="Write your post content here..."
              required
            />
          </div>
          <Button className="self-start bg-blue-700 rounded-md mt-4">Publish</Button>
        </form>
      </div>
    );
  }
  