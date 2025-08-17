"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
export default function Home(){
   const { 
        data: session,
    } = authClient.useSession() 
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password,
    }, {
      onError: () => {
        window.alert("Error creating user");
      },
      onSuccess: () => {
        window.alert("User created successfully");
      }
    }


  );
  }
  const onLogin = () => {
    authClient.signIn.email({
      email,
      password,
    }, {
      onError: () => {
        window.alert("Error loggin user");
      },
      onSuccess: () => {
        window.alert("User logged in successfully");
      }
    }


  );
  }
if(session){
  return(
    <div className="p-4 flex flex-col gap-y-4">
    <p> Logged in as {session.user.name}</p>
    <Button onClick={() => authClient.signOut()}>
      Sign Out
    </Button>
  </div>
  )
}
  return(
    <div>
      <div className="p-4 flex flex-col gap-y-4">

      <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
      <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <Input placeholder="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
      <Button onClick={onSubmit}>
        create user
      </Button>
    </div>
    <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <Input placeholder="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
      <Button onClick={onLogin}>
        login
      </Button>
    </div>
    </div>

  )
}