import PromptCard from './PromptCard';

import { IPrompt } from '@models/prompt';

interface ProfileProps {
  name: string;
  desc: string;
  data: IPrompt[];
  handleEdit: (prompt: IPrompt) => void;
  handleDelete: (id: string) => void;
}

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((prompt) => (
          <PromptCard
            prompt={prompt}
            handleEdit={() => handleEdit && handleEdit(prompt)}
            handleDelete={() => handleDelete && handleDelete(`${prompt._id}`)}
            handleTagClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
