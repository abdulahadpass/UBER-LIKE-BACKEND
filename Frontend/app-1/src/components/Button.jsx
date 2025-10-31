import React from 'react'

const Button = ({
    children,
    bgColor = 'black',
    color = 'white',
    type = 'button',
    className = '',
    ...props
}
) => {
    return (
        <div>
            <button className={`${bgColor} ${color} ${className}  py-2 px-2 rounded`} type={`${type}`} {...props}>{children}</button>
        </div>
    )
}

export default Button
