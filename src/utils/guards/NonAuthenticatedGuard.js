import { Navigate } from "react-router-dom";
import { getLoggedCustomer } from "../http-utils/customer-requests";

export function NonAuthenticatedGuard({ children }) {
    const customer = getLoggedCustomer();

    if (customer) {
        return <Navigate to="/customers-list" />;
    }

    return children;
}