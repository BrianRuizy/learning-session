"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chapter1 from "./chapters/chapter1";
import Chapter2 from "./chapters/chapter2";
import Chapter3 from "./chapters/chapter3";
import Chapter4 from "./chapters/chapter4";

export default function Page() {
  return (
    <Tabs
      defaultValue="ch1"
      className="mx-auto flex w-full max-w-screen-md flex-col gap-8 p-12"
    >
      <TabsList className="grid w-full grid-cols-4">
        {/* 1.	Intro to State and Hooks
            2.	Global State Management
            3.	Data Fetching Strategies in Next.js
            4.	Streaming 
          */}
        <TabsTrigger value="ch1">1</TabsTrigger>
        <TabsTrigger value="ch2">2</TabsTrigger>
        <TabsTrigger value="ch3">3</TabsTrigger>
        <TabsTrigger value="ch4">4</TabsTrigger>
      </TabsList>

      <TabsContent value="ch1">
        <Chapter1 />
      </TabsContent>

      <TabsContent value="ch2">
        <Chapter2 />
      </TabsContent>
      <TabsContent value="ch3">
        <Chapter3 />
      </TabsContent>

      <TabsContent value="ch4">
        <Chapter4 />
      </TabsContent>
    </Tabs>
  );
}
