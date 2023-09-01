"use client";

import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { HTMLAttributes, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { nanoid } from "nanoid";
import { Message } from "@/lib/validators/message";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput = ({ className, ...props }: ChatInputProps) => {
  const [input, setInput] = useState<string>("");

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: "hello" }),
      });
      return response.body;
    },
    
    onSuccess: () => {
      console.log("success");
    },
  });

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextAreaAutoSize
          rows={2}
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              const message: Message = {
                id: nanoid(),
                isUserMessage: true,
                text: input,
              };
              sendMessage(message);
            }
          }}
          placeholder="Write a message...."
          className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default ChatInput;
