import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Chapter4() {
  return (
    <div>
      <p className="font-mono text-muted-foreground">Chapter 4</p>
      <h1>Advanced Data Fetching</h1>
      <p className="lead">
        Sometimes basic data fetching isnt enough. Let&apos;s look at patterns
        for handling continuous data and infinite scrolling.
      </p>

      <h2>♾️ Infinite Scroll</h2>
      <p>
        Loading data as the user scrolls is a common pattern for handling large
        lists. Let&apos;s break it down step by step.
      </p>

      <p>
        At its core, infinite scroll is just pagination - we&apos;re still
        loading data page by page. The main difference is that instead of clicking
        a &quot;Load More&quot; button, we use an Intersection Observer to detect
        when the user has scrolled to the bottom, creating a seamless infinite
        feed experience.
      </p>

      <p>First, we need state for our posts and pagination:</p>
      <LiveProvider
        code={`function PostList() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)

  async function loadMore() {
    const res = await fetch(
      \`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=2\` // limit to 2 posts
    )
    const newPosts = await res.json()
    setPosts(prev => [...prev, ...newPosts]) // append new posts
    setPage(prev => prev + 1)
  }
}`}
        scope={{ useState }}
      >
        <div className="-mx-24 my-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg border bg-card">
          <LiveEditor />
        </div>
      </LiveProvider>

      <p>
        Next, we need to detect when the user scrolls to the bottom using
        Intersection Observer:
      </p>
      <LiveProvider
        code={`function PostList() {
  const loaderRef = useRef(null) // another built-in hook which helps reference DOM elements
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // When loader comes into view
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 1.0 } // meaning 100% in view
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [page])
}`}
        scope={{ useEffect, useRef }}
      >
        <div className="-mx-24 my-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg border bg-card">
          <LiveEditor />
        </div>
      </LiveProvider>

      <p>Finally, we put it all together with a scrollable container:</p>

      <LiveProvider
        code={`function PostList() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const loaderRef = useRef(null)
  
  async function loadMore() {
    const res = await fetch(
      \`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=2\`
    )
    const newPosts = await res.json()
    setPosts(prev => [...prev, ...newPosts])
    setPage(prev => prev + 1)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 1.0 }
    )

    if (loaderRef.current) { 
      observer.observe(loaderRef.current) 
    }

    return () => observer.disconnect()
  }, [page])

  return (
    <div className="h-[900px] overflow-auto space-y-4 mt-4 not-prose">
      <h2 className="text-2xl font-bold">All Posts</h2>
      {posts.map(post => (
        <Card key={post.id}>
          <CardContent className="pt-6 space-y-2">
            <p className="text-sm text-muted-foreground font-mono">{post.id}</p>
            <h3 className="font-bold text-base">{post.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-3">{post.body}</p>
          </CardContent>
        </Card>
      ))}
      
      <div ref={loaderRef} className="h-10" />
    </div>
  )
}`}
        scope={{ useState, useEffect, useRef, Card, CardContent }}
      >
        <div className="-mx-24 my-8 grid grid-cols-2 gap-4 overflow-hidden rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <LiveEditor />
          </div>
          <div className="rounded-lg p-4">
            <LivePreview />
          </div>
        </div>
      </LiveProvider>

      <h2>📹 Real-time Updates (Streaming)</h2>
      <p>
        Streaming is different from polling where instead of setting a predfined
        interval of time we&apos;re receiving data as it happens.
      </p>
      <p>
        For true real-time data, we need server-sent events or WebSockets ...
        Here&apos;s a simulated example of a live chat:
      </p>

      <LiveProvider
        code={`function ChatRoom() {
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(true)
  
  useEffect(() => {
    // Simulate incoming messages
    const interval = setInterval(() => {
      const newMessage = {
        id: Date.now(),
        text: \`Message #\${messages.length + 1}\`,
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, newMessage])
    }, 3000)
    
    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className={\`w-3 h-3 rounded-full \${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }\`} />
        <p className="text-sm text-muted-foreground">
          {isConnected ? 'Connected' : 'Disconnected'}
        </p>
      </div>

      <div className="h-[700px] overflow-auto space-y-4 p-4 border rounded-lg">
        {messages.map(msg => (
          <Card key={msg.id}>
            <CardContent className="pt-6">
              <p>{msg.text}</p>
              <p className="text-sm text-muted-foreground">{msg.timestamp}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button 
        onClick={() => setIsConnected(!isConnected)}
        variant={isConnected ? "destructive" : "default"}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </Button>
    </div>
  )
}`}
        scope={{ useState, useEffect, Card, CardContent, Button }}
      >
        <div className="-mx-24 my-8 grid grid-cols-2 gap-4 overflow-hidden rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <LiveEditor />
          </div>
          <div className="rounded-lg p-4">
            <LivePreview />
          </div>
        </div>
      </LiveProvider>

      <h2>Key Takeaways</h2>
      <p>
        Advanced data fetching patterns help us handle complex or new data
        requirements.
      </p>
      <ul>
        <li>Choose the right pattern for your needs</li>
        <li>Consider UX and performance</li>
        <li>Infinite scroll for large lists</li>
        <li>Real-time updates for live data</li>
      </ul>
    </div>
  );
}
