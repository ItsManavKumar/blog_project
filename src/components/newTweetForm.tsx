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
      <div className="container mx-auto flex h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="ml-20 mt-20 flex w-[800px] flex-col gap-2 border-b px-4 py-2"
        >
          <div className="flex gap-4">
            <input
              type="text"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="flex-grow rounded-md p-4 text-lg outline-none"
              placeholder="Header"
              required
            />
          </div>
          <div className="flex gap-4">
            <textarea
              ref={inputRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] flex-grow resize-none overflow-hidden rounded-md p-4 text-lg outline-none"
              placeholder="What's happening?"
              required
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
            accept="image/*"
              value={imageUrl ?? ""}
              onChange={(e) => setImageUrl(e.target.value || undefined)}
              className="flex-grow rounded-md p-4 text-lg outline-none"
              placeholder="Image URL (optional)"
            />
          </div>
          <Button className="self-start">Publish</Button>
        </form>
      </div>
    );
  }
  