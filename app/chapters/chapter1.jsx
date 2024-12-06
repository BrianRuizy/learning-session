import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Chapter1() {
  return (
    <div>
      <p className="font-mono text-muted-foreground">Chapter 1</p>
      <h1>Intro to State and Hooks</h1>
      <p className="lead">
        State and hooks are fundamental to React. They enable dynamic,
        interactive applications without full page refreshes. Unlike traditional
        server-rendered frameworks, React components can update instantly in
        response to user actions, creating a more fluid user experience.
      </p>

      <h2>What is State?</h2>
      <p>
        State represents data that changes over time in your React components.
        Think of it as your component&apos;s memory. Unlike traditional
        server-rendered frameworks like Django, React components can update
        instantly in response to user actions, creating a more fluid user
        experience.
      </p>
      <p>That just sounds like a variable? 🤔</p>
      {/* <p>
        While both states and variables are used to store data, React states are
        specifically designed to work within the React component lifecycle and
        provide reactivity
        
        With a variable, when you update it, it doesn't
        automatically trigger a re-render, you have to manually show that
        change.
      </p> */}
      <LiveProvider
        code={`import { useState } from "react";

const [count] = useState(0) `}
        scope={{ useState }}
      >
        {/* //declaring a state variable with initial value of 0 */}
        <LiveEditor />
      </LiveProvider>

      <ul>
        {/* you can think of state as the component&apos;s memory */}
        <li>Component&apos;s memory</li>

        {/* changes to to the state triggers a rerender that's immmedialy visible */}
        <li>Changes trigger re-renders</li>

        {/* state is local to the component */}
        <li>Local to components</li>

        {/* state persists between renders, meaning it's not lost when the component unmounts */}
        <li>Persists between renders</li>
      </ul>

      <h2>😦 What about Hooks?</h2>
      <p>
        In React, hooks are special functions that allow you to use state and
        other React features in functional components. They were introduced in
        React 16.8 to enable developers to manage state and side effects in a
        more intuitive and reusable way, without the need for class components.
      </p>

      <p>
        Only call hooks at the top level of your component, before any early
        returns
      </p>
      <LiveProvider
        code={`function MyComponent() {

  // here is where you can call hooks
  useEffect(() => {
    // ...
  }, [])

  return <div>My Component</div>;
}`}
        scope={{}}
      >
        <LiveEditor />
      </LiveProvider>

      <h3>Basic built-in hooks</h3>
      <ul>
        <li>useState</li>
        <li>useEffect</li>
      </ul>

      <hr className="border-dashed" />

      <h2>
        The <code>useState</code> Hook
      </h2>
      <p>
        useState is a built-in hook which is declared like a tuple. The first
        element is the current state value, and the second element is a function
        that lets you update the state.
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

      <h2>
        The <code>useEffect</code> Hook
      </h2>
      <p>
        useEffect lets you synchronize your component with external systems and
        handle side effects like API calls, subscriptions, and DOM mutations.
      </p>
      <ul>
        <li>Handles side effects</li>
        {/* meaning anything that affects something outside of the component */}

        <li>Runs after render</li>

        <li>Cleanup on unmount</li>
      </ul>

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
    <div >
      <p>Seconds elapsed</p>
      <p className="font-bold text-2xl">{seconds}</p>
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

      <h3>Additional built-in React hooks</h3>
      <ul>
        <li>useContext</li>
        <li>useReducer</li>
        <li>useCallback</li>
        <li>useMemo</li>
        <li>useRef</li>
      </ul>
      {/*  and notice the naming convention of hooks is prefixed with use */}

      <hr className="border-dashed" />

      <h2>🚨 Challenge (10 minutes)</h2>

      <ol>
        <li className="font-bold">
          Add a reset button that sets the count back to 0
        </li>
        <li className="font-bold">
          add useEffect to track the highest number reached externally, in this
          case, to local storage.
        </li>
      </ol>

      <p>
        Hint: localstorage is set with a key and value{" "}
        <code>localStorage.setItem(&apos;key&apos;, &apos;value&apos;)</code>.
        Head over to your browser devtools to inspect application storage for
        changes.
      </p>

      <LiveProvider
        code={`function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // write logic here to save the highest number reached to local storage
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
        // write logic here to reset the count to 0
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
