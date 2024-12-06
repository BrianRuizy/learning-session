import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { useState, useContext, createContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AuthContext = createContext();

export default function Chapter2() {
  return (
    <div>
      <p className="font-mono text-muted-foreground">Chapter 2</p>
      <h1>Global State Management</h1>
      <p className="lead">
        We just menionted that state is local to it&apos;s component. But
        sometimes you need to share state between different pages and
        components.
      </p>

      {/* <p>
        Global state is data that needs to be accessed by multiple components
        across your application, regardless of their location in the component
        tree.
      </p> */}
      <ul>
        <li>Centralized state management</li>
        <li>Shared across application</li>
        <li>Avoids prop drilling</li>
        <li>Perfect for themes, user data, cart state</li>
      </ul>

      <h2>Context API</h2>
      <p>
        Context provides a way to pass data through the component tree without
        having to pass props manually at every level.
      </p>

      <LiveProvider
        code={`// auth/context.js

import { createContext, useState } from "react";

function AuthProvider({ children }) {
  const AuthContext = createContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
                
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
`}
        scope={{ createContext, useContext, useState, Button }}
      >
        <div className="-mx-24 my-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg border bg-card">
          <LiveEditor />
        </div>
      </LiveProvider>

      <p className="">
        Layout page using context to manage auth state and pass it to
        components.
      </p>
      <LiveProvider code={`import { AuthProvider } from './auth/context';`}>
        <div className="-mx-24 my-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg border bg-card">
          <LiveEditor />
        </div>
      </LiveProvider>

      <LiveProvider
        code={`function Layout({ children }) {

  return (
    <AuthProvider>
      <LoginButton />
      <PropertyList />
    </AuthProvider>
  )
};`}
        scope={{
          LoginButton,
          PropertyList,
          AuthProvider,
        }}
      >
        <div className="-mx-24 my-8 grid grid-cols-2 gap-4 overflow-hidden rounded-lg border bg-card">
          <div className="h-full overflow-x-auto">
            <LiveEditor style={{ height: "100%" }} />
            <LiveError />
          </div>
          <div className="rounded-lg p-4">
            <LivePreview />
          </div>
        </div>
      </LiveProvider>
      <p>
        Now we can use the context in our seperate component to access the auth
        state.
      </p>
      <LiveProvider
        code={`// PropertyList.jsx
import { AuthContext } from './auth/context';

function PropertyList() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <ul>
      {houses.map((house, index) => (
        <li key={index}>{house.name}</li>
      ))}
    </ul>
  )
}`}
      >
        <div className="-mx-24 my-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg border bg-card">
          <LiveEditor />
        </div>
      </LiveProvider>

      <h2>Key Takeaways</h2>
      <p>
        Understanding when and how to use global state is crucial for building
        scalable React applications.
      </p>
      <ul>
        <li>Context is built into React - no extra packages needed</li>
        <li>Perfect for low-frequency updates (theme, auth, etc)</li>
        <li>Can be combined with useReducer for complex state</li>
        <li>Consider performance with frequent updates</li>
        <li>When to use a 3rd party manager like Redux?</li>
        {/* third part libraries like Redux, Zustand, etc  inlcude lots of other built in functionality  
            to manage state, like undo/redo, state persistence, etc that's not already baked in with React
        */}
      </ul>
    </div>
  );
}

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="space-y-4">{children}</div>
    </AuthContext.Provider>
  );
}

function LoginButton() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  return (
    <Button
      onClick={() => setIsLoggedIn(!isLoggedIn)}
      variant={isLoggedIn ? "destructive" : "default"}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </Button>
  );
}

function PropertyList() {
  const { isLoggedIn } = useContext(AuthContext);

  const houses = [
    { name: "Beach House", price: "$500,000" },
    { name: "Mountain Cabin", price: "$750,000" },
    { name: "City Penthouse", price: "$1,000,000" },
  ];

  return (
    <div className="space-y-4">
      {houses.map((house, index) => (
        <Card key={index} className="not-prose h-32 bg-muted pt-6">
          <CardContent>
            <h3 className="text-muted-foreground">{house.name}</h3>
            {isLoggedIn ? (
              <p className="font-mono text-2xl">{house.price}</p>
            ) : (
              <p>Login to view price</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
