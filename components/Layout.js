import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store'

export default function Layout({ children, title }) {
  const { state, dispatch } = useContext(Store)
  const { cart } = state

  const [cartItemsCount, setCartItemsCount] = useState(0)

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])

  return (
    <>
      <Head>
        <title>{title ? title + '-tienda' : 'tienda'}</title>
        <meta name='description' content='create a tienda' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <nav className='flex justify-between h-12 shadow-md items-center'>
            <Link href='/'>
              <div href='/' className='text-lg font-bold p-2'>
                Rokave
              </div>
            </Link>
            <div className='flex justify-between gap-4'>
              <Link href='/cart'>
                <div href='/cart' className='p-2'>
                  Cart
                  {console.log(cart.cartItems)}
                  {cart.cartItems.length > 0 && (
                    <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                      {cartItemsCount}
                    </span>
                  )}
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
        <main className='container mx-auto mt-4 px-4'>{children}</main>
        <footer className='flex h-10 justify-center items-center font-bold shadow-inner'>
          <p>Edwin Henriquez 2022-10</p>
        </footer>
      </div>
    </>
  )
}
