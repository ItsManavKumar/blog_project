import { GetServerSideProps } from 'next';
import { prisma } from '../../../lib/prisma';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  description: string;
  coverImage: string;
}

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  const { data: session } = useSession();

  if (!session) {
    return <p>You need to be signed in to view this page.</p>;
  }

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <a>
                <img src={blog.coverImage} alt={blog.title} className="w-32 h-32 object-cover" />
                <h2>{blog.title}</h2>
                <p>{blog.description}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      props: {
        blogs: [],
      },
    };
  }

  const blogs = await prisma.blog.findMany();
  return {
    props: {
      blogs,
    },
  };
};

export default BlogList;
