import React, { useEffect, useState } from "react"
import axios from 'axios'
export const ResourceLoad = ({ resourceUrl, resourceName, children }) => {

    const [data, setData] = useState(null)
    useEffect(() => {
        (async () => {
            const response = await axios.get(`${resourceUrl}`)
            console.log(response)
            setData(response.data)
        })();
    }, [resourceUrl])

    return (
        <>
            {
                React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { [resourceName]: data })
                    }

                    return child;
                })
            }
        </>
    )

}
