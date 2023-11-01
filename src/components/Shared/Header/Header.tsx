import Link from 'next/link'
import Logo from './Logo'
import { LinkButton } from '@/components/Shared/LinkButton/LinkButton'
import SearchBar from '@/components/Shared/Header/SearchBar/SearchBar'
import SearchBarMobile from './SearchBar/SearchBarMobile'
import LogoutButton from '@/components/Shared/Header/LogoutButton'
import { authenticate } from '@/app/actions'

interface HeaderProps {
  path: string
}

export default async function Header({ path }: HeaderProps) {
  const notAuthPath = path !== '/login' && path !== '/register'
  const isIdEvent = path.includes('/event/')
  const { verified } = await authenticate()

  return (
    <header className={isIdEvent ? 'border-b border-shadowColor' : undefined}>
      <div className="p-5 pb-7  md:px-10 md:pb-5 relative z-10">
        <div className="flex flex-row items-center justify-between gap-3 h-100">
          <div className="flex sm:items-center sm:justify-between">
            <div className="flex ">
              <Link
                href="/"
                className="text-lg mr-0 md:mr-8 mb:0 w-[140px] h-[42px]"
              >
                <Logo />
              </Link>
            </div>
            {notAuthPath && <SearchBar />}
          </div>
          <nav>
            <ul className=" flex justify-end space-x-4 items-center">
              {verified ? (
                <>
                  <li>
                    <LinkButton href="/dashboard">Dashboard</LinkButton>
                  </li>
                  <li>
                    <LinkButton href="/create">Create Event</LinkButton>
                  </li>
                  <li>
                    <LogoutButton />
                  </li>
                </>
              ) : (
                <>
                  {path !== '/login' && (
                    <li>
                      <LinkButton href="/login" transparent={true}>
                        Log in
                      </LinkButton>
                    </li>
                  )}
                  {path !== '/register' && (
                    <li>
                      <LinkButton href="/register">Register</LinkButton>
                    </li>
                  )}
                </>
              )}
            </ul>
          </nav>
        </div>

        {notAuthPath && <SearchBarMobile />}
      </div>
    </header>
  )
}
