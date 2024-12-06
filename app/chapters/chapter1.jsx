import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Chapter1() {
  return (
    <div>
      <p className="font-mono text-muted-foreground">Chapter 1</p>
      <h1>Intro to State and Hooks</h1>
      <p className="lead">
        State and hooks are fundamental building blocks in React. They enable
        components to remember and update data, forming the foundation of
        interactive user interfaces.
      </p>

      <p>
        Before we dive into state and hooks, let&apos;s refresh our memory on
        how different frameworks handle rendering and data updates. Coming from
        Django, this will help us understand why React manages state differently.
      </p>
      <div className="overflow-hidden rounded-lg border">
        <Table className="my-2">
          <TableHeader>
            <TableRow>
              <TableHead>Tech</TableHead>
              <TableHead>Rendering</TableHead>
              <TableHead>Data Updates</TableHead>
              <TableCell>Interactivity</TableCell>
              <TableHead>State Management</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">Django Templates</TableCell>
              <TableCell>Server-side (SSR)</TableCell>
              <TableCell>Full page reload</TableCell>
              <TableCell>❌</TableCell>
              <TableCell>Server context/sessions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">React JS</TableCell>
              <TableCell>Client-side (CSR)</TableCell>
              <TableCell>Instant in browser</TableCell>
              <TableCell>✅</TableCell>
              <TableCell>Component memory</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Next.js</TableCell>
              <TableCell>Hybrid (SSR & CSR)</TableCell>
              <TableCell>Instant</TableCell>
              <TableCell>✅</TableCell>
              <TableCell>Server + Client state</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* <p>
        So, Django templates (the server-side rendering) builds the entire page
        on the server and sends it to the client, this can lead to very fast
        initial loads but limits interactivity, because it r&quot;ires full page
        reload for data updates.
      </p>

      <p>
        Then React js (which uses client-side rendering) runs all the code on
        the client does give you interactivity, and and allows instant updates
        in the browser, but can be slow initial load due to the amount of code that
        needs to be downloaded.
      </p>

      <p>
        But Next.js allows for a hybrid approach: it delivers server-rendered
        HTML for fast initial loads on static elements, (such as the layout and
        navigation) then enables client side rendering using{" "}
        <code className="font-mono">use client;</code> directives where dynamic
        data or interactivity is needed. needed.
      </p> */}

      <h2>What is State?</h2>
      <p>
        State is data that changes over time in your application, but unlike
        Django where data changes trigger a page reload, React updates happen
        instantly in the browser.
      </p>

      <LiveProvider
        code={`// Django way (simplified):
def view(request):
    count = request.session['count']
    return render(request, 'template.html', {'count': count})

# React way:
function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}`}
      >
        <div className="-mx-24 my-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg border bg-card">
          <LiveEditor />
        </div>
      </LiveProvider>

      <p>
        While Django stores state on the server (in sessions, databases), React
        manages state in the browser memory, allowing for instant updates
        without server roundtrips.
      </p>

      <h2>What are Hooks?</h2>
      <p>
        Hooks are React&apos;s built-in functions that let you add different
        features to your components. useState is just one type of hook - it&apos;s
        the hook specifically designed for handling state.
      </p>

      <LiveProvider
        code={`// Django template needs server data
{% if user.is_authenticated %}
  <h1>Welcome {{ user.name }}</h1>
{% endif %}

// React manages data with hooks
function Welcome() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    // Fetch user data
  }, []);
}`}
      >
        <div className="-mx-24 my-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg border bg-card">
          <LiveEditor />
        </div>
      </LiveProvider>

      <h2>How Hooks Work</h2>
      <p>
        Behind the scenes, React keeps track of your hooks using a simple array.
        Each time you call a hook, React stores its data in this array and
        remembers its position.
      </p>

      <LiveProvider
        code={`// Inside React (simplified):
let hooks = []           // Array to store hook data
let currentHookIndex = 0 // Position of current hook

// First render:
function NameDisplay() {
  // First useState call
  const [name] = useState("John")   // hooks[0] = "John"
  
  // Second useState call
  const [age] = useState(25)        // hooks[1] = 25
  
  return <div>{name} is {age}</div>
}

// Next render:
function NameDisplay() {
  // React remembers values by their position
  const [name] = useState()         // hooks[0] is still "John"
  const [age] = useState()          // hooks[1] is still 25
  
  return <div>{name} is {age}</div>
}`}
      >
        <div className="-mx-24 my-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg border bg-card">
          <LiveEditor />
        </div>
      </LiveProvider>

      <p>
        This is why hook order matters. If hooks are called in a different
        order, React will mix up which data belongs to which hook:
      </p>

      <LiveProvider
        code={`// ❌ This breaks because hook order changes:
function NameDisplay() {
  const [name] = useState("John")   // hooks[0]
  
  if (someCondition) {
    // This hook sometimes exists, sometimes doesn't!
    const [title] = useState("Dr.") // hooks[1]?
  }
  
  const [age] = useState(25)        // hooks[1] or hooks[2]?
  // React gets confused: Is age stored at hooks[1] or hooks[2]?
}

// ✅ Keep hooks at the top level:
function NameDisplay() {
  const [name] = useState("John")   // Always hooks[0]
  const [title] = useState("Dr.")   // Always hooks[1]
  const [age] = useState(25)        // Always hooks[2]
  
  // Use values in conditions instead:
  if (someCondition) {
    name = title + " " + name
  }
}`}
      >
        <div className="-mx-24 my-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg border bg-card">
          <LiveEditor />
        </div>
      </LiveProvider>

      <p>
        React uses the hook&apos;s position to know which state belongs to which
        hook. If the order changes, React might give state from one hook to
        another.
      </p>

      <LiveProvider
        code={`// ❌ Don't do this - hooks after return
function Component() {
  if (someCondition) {
    return <Loading />
    const [data] = useState() // Never reached!
  }
}

// ✅ Do this - hooks at the top
function Component() {
  const [data] = useState()  // Always runs
  
  if (someCondition) {
    return <Loading />
  }
  
  return <div>{data}</div>
}`}
      >
        <div className="-mx-24 my-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg border bg-card">
          <LiveEditor />
        </div>
      </LiveProvider>

      <h2>Using Basic Hooks</h2>
      <h3>useState</h3>
      <p>
        The useState hook lets you add state to your component. It returns an
        array with two items: the current state value and a function to update
        it.
      </p>

      <LiveProvider
        code={`function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <Button 
        onClick={() => setCount(count + 1)}
      >
        Increment
      </Button>
    </div>
);}`}
        scope={{ useState, Button }}
      >
        <div className="-mx-24 my-8 grid grid-cols-3 gap-4 overflow-hidden rounded-lg border bg-card">
          <div className="col-span-2 overflow-x-auto">
            <LiveEditor />
            <LiveError />
          </div>
          <div className="p-4">
            <LivePreview />
          </div>
        </div>
      </LiveProvider>

      <h3>useEffect</h3>
      <p>
        useEffect lets you synchronize your component with external systems and
        handle side effects like API calls, subscriptions, and DOM mutations.
      </p>

      <LiveProvider
        code={`function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p>Seconds elapsed: {seconds}</p>
    </div>
  );
}`}
        scope={{ useState, useEffect }}
      >
        <div className="-mx-24 my-8 grid grid-cols-3 gap-4 overflow-hidden rounded-lg border bg-card">
          <div className="col-span-2 overflow-x-auto">
            <LiveEditor />
            <LiveError />
          </div>
          <div className="p-4">
            <LivePreview />
          </div>
        </div>
      </LiveProvider>

      <h2>🚨 Challenge (10 minutes)</h2>
      <p>Let&apos;s practice using both useState and useEffect together:</p>

      <ol>
        <li className="font-bold">
          Add a reset button that sets the count back to 0
        </li>
        <li className="font-bold">
          Add useEffect to track the highest number reached in localStorage
        </li>
      </ol>

      <p>
        Hint: Use <code>localStorage.setItem(&quot;key&quot;, &quot;value&quot;)</code> to save
        data. Check your browser&apos;s devtools Application tab to see the stored
        values.
      </p>

      <LiveProvider
        code={`function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Add logic here to save highest count
  }, [count]);

  return (
    <div className="flex flex-col gap-1">
      <p>Count: {count}</p>
      <Button 
        onClick={() => setCount(count + 1)}
      >
        Increment
      </Button>
      <Button 
        variant="destructive"
        // Add reset logic here
      >
        Reset
      </Button>
    </div>
);}`}
        scope={{ useState, Button, useEffect }}
      >
        <div className="-mx-24 my-8 grid grid-cols-3 gap-4 overflow-hidden rounded-lg border bg-card">
          <div className="col-span-2 overflow-x-auto">
            <LiveEditor />
            <LiveError />
          </div>
          <div className="p-4">
            <LivePreview />
          </div>
        </div>
      </LiveProvider>
    </div>
  );
}
