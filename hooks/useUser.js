import { useState } from "react";

export default function useUser(initialValue = null) {
  const [user, setUser] = useState(initialValue);

  return {
    user,
    setUser
  };
}
