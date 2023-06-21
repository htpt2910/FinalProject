import { DefaultSession } from "next-auth"
import { signOut, useSession } from "next-auth/react"
import ava from "../../assets/dog_food.webp"
import Image from "next/image"
import { useCallback, useState } from "react"
import Link from "next/link"

interface AccountInfoProps {
  user: DefaultSession["user"]
  id: number | undefined
  avatar: string | undefined
}
export const AccountInfo = ({ user, id, avatar }: AccountInfoProps) => {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  function handleOpenMenu() {
    setOpen(!open)
  }
  return (
    <div className="relative inline-block text-left">
      <div>
        {avatar && (
          <Image
            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
            onClick={handleOpenMenu}
            src={avatar}
            alt="das"
            width={50}
            height={50}
          />
        )}
      </div>
      {open ? (
        <>
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                Signed in as {user?.email?.substring(0, 30)}
              </a>
            </div>
            <div className="py-1" role="none">
              <Link
                href={`/users/${id}`}
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-2"
              >
                Profile
              </Link>
              <Link
                href={`/orders/${id}`}
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-3"
              >
                Orders
              </Link>
            </div>
            <div className="py-1" role="none">
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-4"
              >
                My pets
              </a>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-5"
              >
                Loved
              </a>
            </div>
            <div className="py-1" role="none">
              <Link
                href="/"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-6"
              >
                {session ? (
                  <button
                    className="inline-block text-sm leading-none  text-orange-400 hover:border-transparent hover:text-orange-500"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                ) : (
                  <></>
                )}
              </Link>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
