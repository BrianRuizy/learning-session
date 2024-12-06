import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Chapter3() {
  return (
    <div>
      <p className="font-mono text-muted-foreground">Chapter 3</p>
      <h1>Data Fetching, but fancy</h1>
      <p className="lead">Our sites are nothing without real data.</p>
      <p>
        In many cases, modern web apps which are separate from backend services
        need to fetch and display data from external APIs. While it may seem a
        little daunting at first, React makes this easy with hooks, but there
        are important patterns to follow for loading states and error handling.
      </p>
      <h2>✋ Basic Data Fetching</h2>
      
      <a href="https://jsonplaceholder.typicode.com/" className="text-sky-500">
        data source: jsonplaceholder.typicode.com
      </a>
      <p>
        The simplest way to fetch data is using the fetch API with useEffect.
        Here again is demonstration of how useEffect is used for external
        interactions.
      </p>
      <p>This is using the react builtin fetch api.</p>
      <LiveProvider
        code={`function SimpleUserProfile() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-bold">{data?.name}</h3>
        <p className="text-muted-foreground">{data?.email}</p>
      </CardContent>
    </Card>
  )
}`}
        scope={{ useState, useEffect, Card, CardContent }}
      >
        <div className="-mx-24 my-8 grid grid-cols-2 gap-4 overflow-hidden rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <LiveEditor />
            <LiveError />
          </div>
          <div className="rounded-lg p-4">
            <LivePreview />
          </div>
        </div>
      </LiveProvider>
      <p>
        While this example works, it doesn&apos;t provide any feedback to the
        user during loading or in case of an error. We can improve the user
        experience by leveraging state to indicate loading and error states.
      </p>
      <h2>🤨 Loading States</h2>
      <p>
        Always show a loading state while fetching data. This improves user
        experience by providing feedback.
      </p>
      <LiveProvider
        code={`function UserProfileLoading() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setData({ name: "Jane Cooper", email: "jane@example.com" })
      setLoading(false)
    }, 4000)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="h-4 w-[250px] animate-pulse rounded bg-muted" />
            <div className="h-4 w-[200px] animate-pulse rounded bg-muted" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-bold">{data.name}</h3>
        <p className="text-muted-foreground">{data.email}</p>
      </CardContent>
    </Card>
  )
}`}
        scope={{ useState, useEffect, Card, CardContent }}
      >
        <div className="-mx-24 my-8 grid grid-cols-2 gap-4 overflow-hidden rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <LiveEditor />
            <LiveError />
          </div>
          <div className="rounded-lg p-4">
            <LivePreview />
          </div>
        </div>
      </LiveProvider>
      <h2>😡 Error States</h2>
      <p>
        Always handle potential errors and show them to the user in a clear way.
      </p>
      <LiveProvider
        code={`function UserProfileError() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate API error
    setTimeout(() => {
      setError("Failed to load user data")
    }, 1000)
  }, [])

  if (error) {
    return (
      <Card className="border-destructive bg-destructive/10">
        <CardContent className="pt-6">
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-bold">{data?.name}</h3>
        <p className="text-muted-foreground">{data?.email}</p>
      </CardContent>
    </Card>
  )
}`}
        scope={{ useState, useEffect, Card, CardContent }}
      >
        <div className="-mx-24 my-8 grid grid-cols-2 gap-4 overflow-hidden rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <LiveEditor />
            <LiveError />
          </div>
          <div className="rounded-lg p-4">
            <LivePreview />
          </div>
        </div>
      </LiveProvider>
      <h2>Putting It All Together</h2>
      <p>Now let&apos;s combine loading and error states in a real API call.</p>
      <LiveProvider
        code={`function UserProfile() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to fetch user')
        setLoading(false)
      })
  }, [])

  if (loading) {
    // ...
    return 
  }

  if (error) {
    // ...
    return 
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-bold">{data.name}</h3>
        <p className="text-muted-foreground">{data.email}</p>
      </CardContent>
    </Card>
  )
}`}
        scope={{ useState, useEffect, Card, CardContent }}
      >
        <div className="-mx-24 my-8 grid grid-cols-2 gap-4 overflow-hidden rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <LiveEditor />
            <LiveError />
          </div>
          <div className="rounded-lg p-4">
            <LivePreview />
          </div>
        </div>
      </LiveProvider>
      <hr className="my-12 border-dashed" />
      <p>
        Really, data fetching can get very complex when it comes to
        optimization, performance, or just crafting better user experiences.
      </p>
      <ul>
        <li>async/await</li>
        <li>Parallel fetching</li>
        <li>Pagination</li>
        <li>Caching</li>
        <li>Streaming</li>
        <li>Optimistic updates</li>
        <li>...</li>
      </ul>
      <h2>🚨 Challenge (10 minutes)</h2>
      <h3>Data Polling</h3>
      <p>
        Sometimes we need to periodically refresh data from the server to keep
        our UI up to date. This technique is called &quot;polling&quot; - where
        we fetch new data at regular intervals.
      </p>
      <ul>
        <li>Perfect for real-time updates</li>
        <li>Common in chat apps, dashboards, and live data</li>
        <li>Uses setInterval with cleanup</li>
        <li>Can be controlled with state</li>
      </ul>
      <h3>Create a &quot;Polling&quot; component that:</h3>
      <ol>
        <li>
          fetches a random user
          <ul>
            <li>
              Get a random user ID with{" "}
              <code>Math.floor(Math.random() * 10) + 1</code>
            </li>
          </ul>
        </li>
        <li>sets the user data in state</li>
        <li>
          fetches a new user every 3 seconds
          <ul>
            <li>
              Setup polling with{" "}
              <code>const interval = setInterval(fetchUser, 3000)</code>
            </li>
          </ul>
        </li>
        <li>
          cleans up the interval at the end of the useEffect, to prevent memory
          leaks
          <ul>
            <li>
              Clean up with <code>return () =&gt; clearInterval(interval)</code>{" "}
              in useEffect{" "}
            </li>
          </ul>
        </li>
      </ol>
      <LiveProvider
        code={`function PollingDemo() {
  const [user, setUser] = useState(null)
  const [isPolling, setIsPolling] = useState(false)
  
  useEffect(() => {
    // Add polling logic here
    // ...

    // Don't forget cleanup!
  }, [isPolling])

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsPolling(!isPolling)}>
        {isPolling ? (
          <span className="mr-1 inline-block w-4 h-4 bg-green-500 rounded-full animate-ping" />
        ) : (
          <span className="mr-1 inline-block w-4 h-4 bg-red-500 rounded-full" />
        )}

        {isPolling ? "Stop" : "Start"} Polling
      </Button>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-bold">{user?.name}</h3>
          <p className="text-muted-foreground">{user?.email}</p>
        </CardContent>
      </Card>
    </div>
  )
}`}
        scope={{ useState, useEffect, Card, CardContent, Button }}
      >
        <div className="-mx-24 my-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg border bg-card">
          <div className="rounded-lg p-4">
            <LivePreview />
          </div>
          <div className="overflow-x-auto">
            <LiveEditor />
            <LiveError />
          </div>
        </div>
      </LiveProvider>
    </div>
  );
}

// solution
// useEffect(() => {
//   if (!isPolling) return

//   async function fetchUser() {
//     const id = Math.floor(Math.random() * 10) + 1
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
//     const data = await res.json()
//     setUser(data)
//   }

//   // Initial fetch
//   fetchUser()

//   // Setup polling every 5 seconds
//   const interval = setInterval(fetchUser, 5000)

//   // Cleanup on unmount or when polling stops
//   return () => clearInterval(interval)
// }, [isPolling])
