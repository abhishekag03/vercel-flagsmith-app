"use client";

import flagsmith from "flagsmith/isomorphic";
import { FlagsmithProvider } from "flagsmith/react";
import { ReactElement, useEffect, useState } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [flagsmithState, setFlagsmithState] = useState<any>({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      flagsmith
        .init({
          // fetches flags on the server
          environmentID: "heiEFz5x78igSLA8fGRgiP", // substitute your env ID
          identity: "my_user_id", // specify the identity of the user to get their specific flags
        })
        .then(() => {
          setFlagsmithState(flagsmith.getState());
        });
    }
  }, []);

  return (
    <FlagsmithProvider flagsmith={flagsmith} serverState={flagsmithState}>
      {children as ReactElement}
    </FlagsmithProvider>
  );
}