// import { useRootContext } from '@/context/context/context'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import React, { useState } from 'react'

// const NavItem = ({ navItem = {} }) => {
//   const [current, setCurrent] = useState(false)
//   const { currentActive } = useRootContext()
//   const { pathname } = useRouter()

//   const handleCurrent = (e) => {
//     e.stopPropagation()
//     e.preventDefault()
//     setCurrent((pre) => !pre)
//   }

//   const { href, name, subItems } = navItem
//   const subHref = subItems?.map((item) => item.href)
//   const active = currentActive === href
//   const active2 = subHref?.includes(pathname)
//   const isHome = pathname === '/'
//   const newActive = isHome ? active : active2

//   return (
//     <li className={`${newActive ? 'current ' : ''}scrollToLink`}>
//       <Link href={isHome ? href : '/' + href}>
//         <a>
//           {name}
//           {subItems?.length > 0 && (
//             <button onClick={handleCurrent} className="sub-nav-toggler">
//               <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//             </button>
//           )}
//         </a>
//       </Link>
//       {subItems?.length > 0 && (
//         <ul className={current ? 'sub-menu d-block animated fadeInDown' : 'sub-menu d-none'}>
//           {subItems.map(({ id, name, href }) => (
//             <li key={id}>
//               <Link href={href}>{name}</Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </li>
//   )
// }

// export default NavItem
import { useRootContext } from '@/context/context/context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const NavItem = ({ navItem = {} }) => {
  const [current, setCurrent] = useState(false)
  const { pathname } = useRouter()

  const handleCurrent = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrent((prev) => !prev) // Toggle manually only
  }

  const { href, name, subItems } = navItem

  return (
    <li className={`scrollToLink`}>
      <Link href={href}>
        <a>
          {name}
          {subItems?.length > 0 && (
            <button onClick={handleCurrent} className="sub-nav-toggler">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          )}
        </a>
      </Link>
      {subItems?.length > 0 && (
        <ul className={current ? 'sub-menu d-block animated fadeInDown' : 'sub-menu d-none'}>
          {subItems.map(({ id, name, href }) => (
            <li key={id}>
              <Link href={href}>{name}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default NavItem
