'use client';

import { IPrompt } from '@models/prompt';
import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

interface PromptCardListProps {
  data: IPrompt[];
  handleTagClick: (tag: string) => void;
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id.toString()}
          prompt={prompt}
          handleTagClick={handleTagClick}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setsearchText] = useState('');
  const [prompts, setPrompts] = useState<IPrompt[]>([]);

  const getPrompts = async () => {
    const res = await fetch('/api/prompt');
    const data = (await res.json()) as IPrompt[];
    setPrompts(data);
  };

  useEffect(() => {
    getPrompts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center" action="">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
