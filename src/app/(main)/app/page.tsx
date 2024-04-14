"use client";

import { SessionAuthForNextJS } from "@/components/SessionAuthForNextJS";
import { BookA, CornerDownLeft, Heart } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function sendMessage(
  event: MouseEvent<HTMLButtonElement>,
  isNew: boolean,
  setMessages: any,
  setHeader: Dispatch<SetStateAction<string>>,
  message: string,
  setChatroomId: Dispatch<SetStateAction<string>>,
  chatroomId: string
) {
  setMessages((prev: any) => [...prev, { isAI: false, message }]);
  (async () => {
    let aiResponse = "";
    if (isNew) {
      try {
        const res = await fetch("/api/mentalhealth/chat/createChat", {
          method: "POST",
          body: JSON.stringify({ message }),
        });
        const data = await res.json();
        setHeader(data["chatheader"]);
        setChatroomId(data["chatroom_id"]);
        aiResponse = data["airesponse"];
      } catch (e) {}
    } else {
      const res = await fetch("/api/mentalhealth/chat/createMessage", {
        method: "POST",
        body: JSON.stringify({ message, chatroom_id: chatroomId }),
      });
      const data = await res.json();
      aiResponse = data["airesponse"];
    }
    setMessages((prev: any) => [...prev, { isAI: true, message: aiResponse }]);
  })();
}

function PrevChat({
  header,
  chatId,
  setHeader,
}: {
  header: string;
  chatId: string;
  setHeader: Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      variant="outline"
      onClick={() => {
        router.replace(`${pathname}?chat=${chatId}`);
        setHeader(header);
      }}
    >
      {header.slice(0, 30) + (header.length > 30 ? "..." : "")}
    </Button>
  );
}

function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [userInput, setUserInput] = useState("");
  const [prevChats, setPrevChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [header, setHeader] = useState("");
  const [chatroomId, setChatroomId] = useState("");

  useEffect(() => {
    (async () => {
      let msgs = [];
      try {
        setChatroomId(searchParams.get("chat") || "");
        const prev = await fetch("/api/mentalhealth/chat/getMessages", {
          method: "POST",
          body: JSON.stringify({
            chatroom_id: searchParams.get("chat") || "",
          }),
        });
        msgs = (await prev.json())["messages"];
        setMessages(msgs);
      } catch (e) {}
      if (!msgs.length) {
        router.replace(pathname);
        setHeader("");
      }
    })();
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      const prev = await fetch("/api/mentalhealth/chat/findUserChats", {
        method: "POST",
      });
      const prevchats = (await prev.json())["chatrooms"];
      setPrevChats(prevchats);
    })();
  }, [header]);

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <div className="flex w-full max-w-full flex-col items-stretch gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Settings
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">Select topic</Label>
                  <Select defaultValue="mental">
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mental">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Heart className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                Mental health
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Get mental health support
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </fieldset>
              <fieldset className="grid max-w-full gap-6 overflow-auto rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Chats
                </legend>
                <div className="flex flex-col gap-3">
                  {prevChats.length
                    ? prevChats.map((ele, index) => (
                        <PrevChat
                          header={ele["chat_title"]}
                          chatId={ele["uuid"]}
                          setHeader={setHeader}
                          key={index}
                        />
                      ))
                    : "No previous conversations"}
                </div>
              </fieldset>
            </div>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <h3 className="pb-4 text-3xl">{header.length ? header : ""}</h3>
            <div className="flex flex-1 flex-col gap-2 overflow-auto">
              {messages.length
                ? messages.map((ele, index) => (
                    <Card
                      className={ele["isAI"] ? "self-start" : "self-start"}
                      key={index}
                    >
                      <CardHeader className="text-2xl font-bold">
                        {ele["isAI"] ? "AI" : "user"}
                      </CardHeader>
                      <CardContent>{ele["message"]}</CardContent>
                    </Card>
                  ))
                : "Send a message to start a new chat"}
            </div>
            <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1"
              onSubmit={(e) => e.preventDefault()}
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div className="flex items-center p-3 pt-0">
                <Button
                  onClick={(e) =>
                    sendMessage(
                      e,
                      !messages.length,
                      setMessages,
                      setHeader,
                      userInput,
                      setChatroomId,
                      chatroomId
                    )
                  }
                  size="sm"
                  className="ml-auto gap-1.5"
                >
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SessionAuthForNextJS>
      <TooltipProvider>
        <Dashboard />
      </TooltipProvider>
    </SessionAuthForNextJS>
  );
}
