import { Model, Schema, Types, model, models } from 'mongoose';
import { UserDocument } from './user';

export interface IPrompt {
  _id: Types.ObjectId;
  creator: UserDocument;
  prompt: string;
  tag: string;
}

const promptSchema = new Schema<IPrompt>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required'],
  },
});

// on nextjs we need to check if the model is already defined
// because this route is called every time the connection is stablished
const Prompt = models.Prompt as Model<IPrompt> || model<IPrompt>('Prompt', promptSchema);

export default Prompt;
