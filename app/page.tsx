"use client";

import { Jost } from "next/font/google";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useFlagsmith } from "flagsmith/react";

const jost = Jost({ subsets: ["latin"] });

export type User = {
  name: string;
  position: string;
};

export default function Page() {
  const flagsmith = useFlagsmith();
  const [user, toggleUser] = useState<User>({
    name: "",
    position: "freelancer",
  });

  const router = useRouter();

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    toggleUser({
      ...user,
      name: e.target.value,
    });
  };

  const handleUserPosition = (e: ChangeEvent<HTMLSelectElement>) => {
    toggleUser({
      ...user,
      position: e.target.value,
    });
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await flagsmith.setTrait("profession", user.position); // setting the "profession" trait as the one selected by user
    router.push("/about?name=" + user.name + "&position=" + user.position);
  };

  return (
    <>
      <main className={`main-login ${jost.className}`}>
        <div className="login-box">
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleOnSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="login-input"
              onChange={handleUserName}
            />
            <select className="login-menu" onChange={handleUserPosition}>
              <option className="login-menu-item" defaultValue="freelancer">
                Freelancer
              </option>
              <option className="login-menu-item" value="front-end-developer">
                Front-end developer
              </option>
              <option className="login-menu-item" value="designer">
                Designer
              </option>
            </select>
            <button className="login-form-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
