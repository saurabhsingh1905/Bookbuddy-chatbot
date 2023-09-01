import { MessageArraySchema } from "@/lib/validators/message"
import { ChatGPTMessage } from "@/lib/openai-stream"
import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompt"

export async function POST (req:Request){
   const {messages} = await req.json()

   const parsedMessages = MessageArraySchema.parse(messages)

   const outBoundMessages : ChatGPTMessage[] =parsedMessages.map((message)=> ({
role:message.isUserMessage ? "user" : "system",
content:message.text,
   }))

   outBoundMessages.unshift({
    role:"system",
    content:chatbotPrompt
   })
}

