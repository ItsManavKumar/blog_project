
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
import { ProfileImage } from "./ProfileImage";

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

  const trpcUtils = api.useContext(); // Ensure this usage is correct

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
    <div className="flex bg-gray-100 container mx-auto h-screen">

    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-b px-4 py-2  mt-20 ml-20 w-[800px]"
    >
      <div className="flex gap-4 ">

        <textarea
          ref={inputRef}
          style={{ }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none min-h-[200px] rounded-md"
          placeholder="What's happening?"
        />
        
      </div>
      <Button className="self-start">Tweet</Button>
    </form>
    </div>
  );
}
