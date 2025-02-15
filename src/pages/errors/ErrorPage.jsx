/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FaExclamationTriangle, FaLock, FaBug } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = ({ code, message, Icon }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
            <Icon className="text-6xl text-red-500" />
            <h1 className="text-6xl font-bold mt-4">{code}</h1>
            <p className="text-xl mt-2">{message}</p>
            <Link to="/login" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Go to Home
            </Link>
        </div>
    );
};

export const NotFound = () => <ErrorPage code="404" message="Page Not Found" Icon={FaExclamationTriangle} />;
export const AccessDenied = () => <ErrorPage code="403" message="Access Denied" Icon={FaLock} />;
export const ServerError = () => <ErrorPage code="500" message="Internal Server Error" Icon={FaBug} />;

export default ErrorPage;
