// pages/profiles/[id].tsx

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { db } from "../../server/db";
import { UserProfile } from "../../components/UserProfile";

type UserProfileProps = {
  user: {
    id: string;
    name: string;
    image: string | null;
    bio: string | null;
  } | null;
};

const ProfilePage = ({ user }: UserProfileProps) => {
  const router = useRouter();
  const { id } = router.query;

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="">
      <UserProfile user={user} />
    </div>
  );
};

export default ProfilePage;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      image: true,
      bio: true,
    },
  });

  if (!user) {
    return {
      notFound: true, // Return a 404 if the user is not found
    };
  }

  return {
    props: {
      user,
    },
  };
};

