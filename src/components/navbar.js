import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const navbar = () => {
    return (
        <nav className="bg-gradient-to-br border-b from-[#3442D2] to-[#B24EFF] p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className='flex flex-row'>
                    <Image className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" width={10} height={10} alt="logo" />
                    <Link href="/" className='text-white text-lg font-bold'>
                        E_Learning
                    </Link>
                </div>
                <div className="flex space-x-4 text-lg">
                    <Link href="/" className='text-white'>
                        Home
                    </Link>
                    <Link href="/courses" className='text-white'>
                        Courses
                    </Link>
                    <Link href="/quizzes" className='text-white'>
                        Quizzes
                    </Link>
                    <Link href="/auth/login" className='text-white'>
                        Logout
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default navbar
