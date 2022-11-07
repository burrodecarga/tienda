import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title ? title + '-tienda' : 'tienda'}</title>
        <meta name='description' content='create a tienda' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <nav class='flex justify-between h-12 shadow-md items-center'>
            <Link href='/'>
              <div href='/' className='text-lg font-bold p-2'>
                Rokave
              </div>
            </Link>
            <div class='flex justify-between gap-4'>
              <Link href='/cart'>
                <div href='/cart' className='p-2'>
                  Cart
                </div>
              </Link>
              <Link href='/login'>
                <div href='/login' className='p-2'>
                  Login
                </div>
              </Link>
            </div>
          </nav>
        </header>
        <main class='container mx-auto mt-4 px-4'>{children}</main>
        <footer class='flex h-10 justify-center items-center font-bold shadow-inner'>
          <p>Edwin Henriquez 2022-10</p>
        </footer>
      </div>
    </>
  )
}
