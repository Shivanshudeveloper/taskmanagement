import { useContext } from "react";
import { SubscriptionContext } from "../contexts/subscription-context";

export const useSubscription = () => useContext(SubscriptionContext);
