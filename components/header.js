import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.svg';

export default function Header() {
  return (
    <nav className='nav hidden lg:block'>
      <div className='container mx-auto flex flex-row items-center justify-center p-0 border-b'>
        <div className='logo-container'>
          <Image
            src={logo}
            alt='Store Logo'
            width={150}
            //   placeholder='blur' // Optional blur-up while loading
          />
        </div>

        <Link href='/'>
          <p className='navLink'>Home</p>
        </Link>
        <Link href='/shop'>
          <p className='navLink'>Shop</p>
        </Link>
        <Link href='/'>
          <p className='navLink'>About</p>
        </Link>
        <Link href='/'>
          <p className='navLink'>Contact</p>
        </Link>

        <div className='header-actions'>
          <div id='globalSearch'>
            <div className='search'>
              <input type='text' placeholder='Search products...' />
              <button>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-gray-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className='header-icon '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 text-gray-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
              />
            </svg>
          </div>
          <div className='header-icon relative'>
            <span class=' top-0 right-0 absolute  h-2 w-2 rounded-full bg-red-600 flex flex-row items-center justify-center text-white'>
              <small></small>
            </span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 text-gray-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}
