import React from 'react'
import Link from 'next/link'

const navbar = () => {
    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className='text-white text-lg font-bold'>
                        E_Learning
                    </Link>
                    <div className="flex space-x-4">
                        <Link href="/" className='text-white'>
                            Home
                        </Link>
                        <Link href="/about" className='text-white'>
                            About
                        </Link>
                        <Link href="/login" className='text-white'>
                            Login
                        </Link>
                        <Link href="/register" className='text-white'>
                            Register
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default navbar
