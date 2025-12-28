
import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  businessName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const BotSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  welcomeMessage: { type: String, default: 'Hi! How can I help you today?' },
  trainingData: { type: String, default: '' }, // Text content for now
  primaryColor: { type: String, default: '#000000' },
  createdAt: { type: Date, default: Date.now },
});

const MessageSchema = new Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ConversationSchema = new Schema({
  botId: { type: Schema.Types.ObjectId, ref: 'Bot', required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});

export const User = models.User || model('User', UserSchema);
export const Bot = models.Bot || model('Bot', BotSchema);
export const Conversation = models.Conversation || model('Conversation', ConversationSchema);
