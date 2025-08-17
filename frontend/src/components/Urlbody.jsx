import React from 'react'
import api from '../utils/axios.js';
import { useState } from 'react';

const Urlbody = () => {
    const [Original, setOriginal] = useState("");
    const [Short, setShort] = useState("");
    const [loading, setloading] = useState(false);
    const [Copied, setCopied] = useState(false);

    const handleConvert = async () => {
        if(!Original.trim()){
            alert("please enter a valid Url");
            return;
        }
        setloading(true);
        setShort("");
        
        try {
            const res = await api.post("/api", {originalUrl : Original });
            if(res.status === 200){
                const base = import.meta.env.VITE_BASE_URL;
                const shorturl = `${base}/${res.data.shortId}`;
                setShort(shorturl);
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred while shortening the URL");
        } finally {
            setloading(false);
        }
    };

    // to display state if user click copy
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(Short);
            setCopied(true);
            setTimeout(() => setCopied(false), 5000); //disable after 5 seconds
        } catch (error) {
            alert("Failed to copy the URL");
        }
    };

  return (
    <div className='flex items-center justify-center min-h-screen'>
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-6 text-center'>Url Shortener</h1>
            <div className="space-y-4">
                <input 
                    type="text"
                    placeholder='Enter your URL'
                    value={Original}
                    onChange={(e) => setOriginal(e.target.value)}
                 className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button 
                    className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50' 
                    onClick={handleConvert}
                    disabled={loading}
                >
                    {loading ? 'Shortening...' : 'Shorten'}
                </button>
                
                {Short && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded">
                        <p className="text-sm text-gray-600 mb-2">Your shortened URL:</p>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={Short}
                                readOnly
                                className="flex-1 px-2 py-1 bg-white border rounded text-sm"
                            />
                            <button
                                onClick={handleCopy} //inbuilt function to copy text
                                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                            >
                                {Copied ? "Copied" : "Copy"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Urlbody