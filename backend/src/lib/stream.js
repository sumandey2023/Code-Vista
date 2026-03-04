import { StreamChat } from "stream-chat";
import {StreamClient} from "@stream-io/node-sdk"
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Add your Stream API Key and Secret to the .env file");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);//this is used for chat functionality
export const streamClient = new StreamClient(apiKey, apiSecret);//this is used for video calls

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Stream user upserted successfully", userData);
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("Stream user deleted successfully", userId);
  } catch (error) {
    console.error("Error deleting Stream user:", error);
  }
};
