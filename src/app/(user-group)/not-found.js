import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col w-full h-screen justify-center items-center'>
      <h2 className='text-3xl'>404 : Page Not Found</h2>
      {/* <p>Could not find requested resource</p> */}
      <Link href="/" className='text-xl text-blue-600 hover:underline hover:cursor-pointer'>Return Home</Link>
    </div>
  )
}