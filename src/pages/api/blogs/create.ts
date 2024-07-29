/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/pages/api/blogs/create.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma'; // Ensure the import path is correct
import { getSession } from 'next-auth/react';
import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  body: z.string().min(1),
  coverImage: z.string().url(),
});

type BlogRequestBody = z.infer<typeof blogSchema>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const parsedBody = blogSchema.safeParse(req.body);

      if (!parsedBody.success) {
        return res.status(400).json({ error: 'Invalid request data', details: parsedBody.error.errors });
      }

      const { title, description, body, coverImage }: BlogRequestBody = parsedBody.data;

      const blog = await prisma.blog.create({
        data: {
          title,
          description,
          body,
          coverImage,
        },
      });

      return res.status(201).json(blog);
    } catch (error) {
      console.error('Error creating blog:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
