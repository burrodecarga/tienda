import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'
import {
  BeakerIcon,
  CircleStackIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

function CartScreen() {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty)
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
  }
  return (
    <Layout title='Shooping Cart'>
      <h1 className='mb-4 text-xl'>Shooping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href='/'>Please go Shooping</Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <table className='min-w-full'>
              <thead className='border-b'>
                <tr>
                  <th className='px-5 text-left'>Item</th>
                  <th className='px-5 text-left'>Quantity</th>
                  <th className='px-5 text-left'>Price</th>
                  <th className='px-5 text-left'>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id + item.slug} className='border-b'>
                    <td>
                      <Link href={`/product/${item.slug}`}>{item.name}</Link>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                      &nbsp;&nbsp;
                      {item.name}
                    </td>
                    <td className='p-5 text-right'>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className='p-5 text-right'>{item.quantity}</td>
                    <td className='p-5 text-right'>{item.price}</td>
                    <td className='p-5 text-right'>
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className='h-6 w-6 text-blue-500' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='card p-5'>
            <ul>
              <li>
                <div className='pb-3 text-xl'>
                  Subtotal:(
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                  {'  '}: $
                  {cartItems.reduce(
                    (sum, item) => sum + item.quantity * item.price,
                    0
                  )}
                </div>
              </li>
              <li>
                <button
                  className='primary-button w-full'
                  onClick={() => {
                    router.push('/shipping')
                  }}
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })
