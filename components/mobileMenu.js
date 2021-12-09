import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.svg';

export default function MobileNav() {
  return (
    <nav className='mobile-nav' role='navigation'>
      <div id='menuToggle'>
        <input className='checkbox' type='checkbox' />
        <span></span>
        <span></span>
        <span></span>
        <ul id='menu'>
          <div className='logo-container mx-auto flex flex-row items-center justify-center'>
            <Image
              src={logo}
              alt='Store Logo'
              width={150}
              //   placeholder='blur' // Optional blur-up while loading
            />
          </div>
          <div
            className='mb-8 flex flex-row items-center justify-center px-4'
            id='globalSearch'>
            <div className='search w-full mx-auto'>
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
          <li>
            <Link href='#'>
              <p className='text-3xl  text-center cursor-pointer hover:bg-blue-500 hover:text-white py-8 text-gray-600'>
                Home
              </p>
            </Link>
          </li>
          <li>
            <Link href='#'>
              <p className='text-3xl  text-center cursor-pointer hover:bg-blue-500 hover:text-white py-8 text-gray-600'>
                Shop
              </p>
            </Link>
          </li>
          <li>
            <Link href='#'>
              <p className='text-3xl  text-center cursor-pointer hover:bg-blue-500 hover:text-white py-8 text-gray-600'>
                About
              </p>
            </Link>
          </li>
          <li>
            <Link href='#'>
              <p className='text-3xl  text-center cursor-pointer hover:bg-blue-500 hover:text-white py-8 text-gray-600'>
                Contact
              </p>
            </Link>
          </li>
        </ul>
      </div>
      <div className='header-actions'>
        <div className='header-icon '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 mr-4 text-white'
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
          <span className='top-0 right-0 absolute  h-2 w-2 rounded-full bg-red-600 flex flex-row items-center justify-center text-white'>
            <small></small>
          </span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
        </div>
      </div>
    </nav>
  );
}
