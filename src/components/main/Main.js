import { Outlet, Route, Routes } from "react-router-dom";
import { CustomerForm } from "../customers/customer-form/CustomerForm";
import { Customer } from "../customers/customer/Customer";
import { CustomersList } from "../customers/customers-list/CustomersList";

export function Main() {
    return (
        <div className="main-content">
            <Outlet />
        </div>
    )
}