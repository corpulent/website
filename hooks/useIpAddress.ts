import { useQuery } from "@tanstack/react-query";
import { api } from "../utils";

export const useIpAddress = () =>
  useQuery<string>(["ipAddress"], async () => {
    try {
      return await api.getIpAddress();
    } catch (error) {
      /* If we fail to retrieve the fallback IP address, then we conclude that
       * we were unable to find the user's IP address. In such a scenario, we
       * throw an exception and call it a day.
       */
      return await api.getFallbackIpAddress();
    }
  });
