import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowNavBarFooter = ({ children }) => {
    const location = useLocation();
    const [showNavBarFooter, setShowNavBarFooter] = useState(false)
    useEffect(() => {
        console.log('this is location: ', location)
        const pathsToExclude = ['/login', '/signup', '/resetPassword', '/changePassword', '/admin', '/requestManager']; // Liệt kê mấy cái page mà không muốn hiển thị Nav với Footer ở mảng này
        if (pathsToExclude.some(path => location.pathname.includes(path))) {
            setShowNavBarFooter(false);
        } else {
            setShowNavBarFooter(true);
        }
    }, [location])
    return (
        <div
        className={`${showNavBarFooter ? "sticky top-0 z-10 w-full border-b bg-white h-14" : ''}`}
        >{showNavBarFooter && children}</div>
    )
}
export default ShowNavBarFooter