import { useState } from "react";
import { useMutation } from "convex/react";
import { error } from "console";

export const use_api_mutation = (mutation_fn: any) => {
  const [pending, set_pending] = useState(false);

  const api_mutation = useMutation(mutation_fn);

  const mutate = (payload: any) => {
    set_pending(true);

    return api_mutation(payload)
      .finally(() => {
        set_pending(false);
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };

  return {
    mutate,
    pending,
  };
};
