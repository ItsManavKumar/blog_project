import { useSession } from "next-auth/react";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
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
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

//   const trpcUtils = api.useContext(); // Ensure this usage is correct

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      setInputValue("");

      if (!session) return;

      // If infiniteProfileFeed is not necessary, remove related logic
      // Adjust the cache update according to your needs if applicable
      // e.g., updating local state or cache directly if using react-query or similar
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    createTweet.mutate({ content: inputValue });
  }

  return (
    <div className="container mx-auto flex h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="ml-20 mt-20 flex w-[800px] flex-col gap-2 border-b px-4 py-2"
      >
        <div className="flex gap-4">
          <textarea
            ref={inputRef}
            style={{}}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="min-h-[200px] flex-grow resize-none overflow-hidden rounded-md p-4 text-lg outline-none"
            placeholder="What's happening?"
          />
        </div>
        <Button className="self-start">Tweet</Button>
      </form>
    </div>
  );
}
