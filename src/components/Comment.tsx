import { FC } from "react";
import { ProfileImage } from "./ProfileImage";

type Comment = {
  id: string;
  content: string;
  user: { name: string | null; image?: string | null };
};

type CommentListProps = {
  comments: Comment[];
};

const CommentList: FC<CommentListProps> = ({ comments }) => {
  const commentDateFormatter = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
  });
  

  return (
    <div className="mt-4">
            <div>
              <ul className="space-y-2">
                {comments.map((comment) => (
                  <li key={comment.id} className="pt-2">
                    <div className=" gap-2 flex">
                      {comment.user.image && (
                        <ProfileImage
                          src={comment.user.image}
                          className="h-6 w-6 rounded-full"
                        />
                      )}

                      <div className=" bg-[#f5f5f5] flex-grow p-4 space-y-2 rounded-md">
                        <p className="text-md text-gray-800">
                          {comment.user.name}
                          <span className="text-xs text-gray-500 mx-2">
                          {commentDateFormatter.format(new Date())}
                        </span>
                        </p>

                        <p className=" text-gray-800">
                          {comment.content}
                        </p>
                       
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            </div>
  );
};

export default CommentList;
