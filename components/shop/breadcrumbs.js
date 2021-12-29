import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function BreadCrumbs({ paths }) {
  // class UrlObj {
  //   constructor(title, url) {
  //     this.title = title;
  //     this.url = url;
  //   }
  //   getBreadCrumbs() {
  //     let paths = [{ title: 'shop', url: '/shop' },{}];
  //     return paths;
  //   }
  // }

  return (
    <div id='breadcrumbs'>
      <small className='opacity-70 flex flex-row items-center'>
        <Link href='/'>
          <p className='mr-2 cursor-pointer'>Home </p>
        </Link>
        {paths.map((path) => {
          return (
            <Link href={`${path.url}`}>
              <p className='mr-2 cursor-pointer'>
                <span className='mr-2'>-</span>
                {path.title}
              </p>
            </Link>
          );
        })}
      </small>
    </div>
  );
}
