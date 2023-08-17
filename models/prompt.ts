import { Schema, model, models } from 'mongoose';

const promptSchema = new Schema({
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
const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;
