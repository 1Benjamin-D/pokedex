'use client'

import React, { useEffect } from 'react';

interface Props {
    error: Error & { digest?: string };
    reset: () => void;
}

const ErrorPage: React.FC<Props> = ({ error, reset }) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h2>Something went wrong!</h2>
                <p>Error message: {error.message}</p>
                {error.stack && <p>Stack trace: {error.stack}</p>}
                <button onClick={() => reset()}>Try again</button>
            </div>
        </div>
    );
};

export default ErrorPage;
