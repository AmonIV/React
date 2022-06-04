import { Navigate, useNavigate } from "react-router-dom";
import { getLoggedCustomer } from "../http-utils/customer-requests";

export function AuthenticatedRoute({ children }) {
    const navigate = useNavigate();
     const customer = getLoggedCustomer();

    if (!customer) {
        return <Navigate to='/login' />;
    }

    return children;
}