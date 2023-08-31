'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
import { IPrompt } from '@models/prompt';

function MyProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  const [prompts, setprompts] = useState<IPrompt[]>([]);

  const handleEdit = (prompt: IPrompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (id: string) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );
    if (hasConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Something went wrong');
        setprompts(prompts.filter((prompt) => `${prompt._id}` !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getPrompts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = (await res.json()) as IPrompt[];
      setprompts(data);
    };
    if (session?.user.id) getPrompts();
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personilized profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
