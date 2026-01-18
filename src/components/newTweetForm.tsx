/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { Button } from "./Button";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export function NewTweetForm() {
  const { status } = useSession();
  if (status !== "authenticated") return null;
  return <Form />;
}

function Form() {
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

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
        setTags((prev) => [...prev, e.currentTarget.value.trim()]);
        e.currentTarget.value = "";
      }
    }
  }

  async function uploadToCloudinary(file: File) {
    setUploading(true);
    setUploadError(null);

    try {
      const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });
      if (!signRes.ok) throw new Error("Failed to get upload signature");

      const { timestamp, signature, folder } = (await signRes.json()) as {
        timestamp: number;
        signature: string;
        folder: string;
      };

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("folder", folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData },
      );

      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) {
        throw new Error(uploadJson?.error?.message ?? "Upload failed");
      }

      setImageUrl(uploadJson.secure_url as string);
    } catch (err: any) {
      setUploadError(err?.message ?? "Image upload failed");
      setImageUrl(undefined);
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    createTweet.mutate({
      header,
      content,
      imageUrl: imageUrl ?? undefined,
      // IMPORTANT: keep consistent with how you parse elsewhere.
      // If your feed uses split(",") then store comma-separated.
      // If your app uses space-separated elsewhere, keep join(" ").
      tags: tags.length > 0 ? tags.join(",") : undefined,
    });
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-[74px]">
      <div className="mx-auto flex w-full max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Main form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl flex-1"
        >
          <div className="overflow-hidden rounded-md  border-gray-200 bg-white ">
            {/* Top section */}
            <div className="space-y-4 p-4 sm:p-6">
              {/* Upload row */}
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadToCloudinary(file);
                  }}
                  className="w-full max-w-xs rounded-md  border-gray-300 p-2 text-sm outline-none"
                />

                {uploading && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
                {imageUrl && (
                  <span className="text-sm font-medium text-green-600">
                    Image added ✓
                  </span>
                )}
              </div>

              {uploadError && (
                <p className="text-sm text-red-600">{uploadError}</p>
              )}

              {/* Image preview */}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Cover preview"
                  className="h-44 w-full rounded-md object-cover sm:h-56"
                  loading="lazy"
                />
              )}

              {/* Title */}
              <textarea
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                className="w-full resize-none rounded-md  border-gray-200 p-3 text-xl font-semibold outline-none placeholder:text-[#525252] sm:text-2xl "
                placeholder="New post title here..."
                rows={2}
                required
              />

              {/* Tags */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 ">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded bg-gray-100 px-2 py-1 text-sm text-blue-700 "
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {tags.length < 4 && (
                  <input
                    type="text"
                    onKeyDown={handleTagInput}
                    className="w-full rounded-md  border-gray-200 p-3 text-base outline-none placeholder:text-[#525252] "
                    placeholder="Add up to 4 tags (press Enter)..."
                  />
                )}
              </div>
            </div>

            {/* Editor */}
            <div className="border-t border-gray-200 ">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="min-h-[280px] text-base sm:min-h-[360px] sm:text-lg"
                placeholder="Write your post content here..."
              />
            </div>
          </div>

          {/* Publish */}
          <div className="mt-4 flex items-center justify-between">
            <Button
              className="rounded-md bg-blue-700"
              disabled={uploading || createTweet.isPending}
            >
              {createTweet.isPending ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </form>

        {/* Right guidelines (desktop only) */}
        <aside className="hidden w-[320px] flex-shrink-0 lg:block">
          <div className="sticky top-[100px] rounded-md  border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-lg font-semibold">Tagging Guidelines</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#525252]">
              <li>
                Tags help people find your post — think of them as topics or
                categories.
              </li>
              <li>
                Add up to four tags per post. Use existing tags whenever
                possible.
              </li>
              <li>
                Some tags have special posting guidelines — double check before
                publishing.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
