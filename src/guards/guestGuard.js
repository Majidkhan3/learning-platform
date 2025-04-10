import PropTypes from 'prop-types'
import { useRouter } from 'next/navigation'
// redux
// routes
import { PATH_PAGE } from '../routes/paths'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
}

export default function GuestGuard({ ...props }) {
  console.log('helo')
  const { children } = props
  const { push, query } = useRouter()
  // type error
  const { isAuthenticated } = useContext(AuthContext)

  if (isAuthenticated) {
    push(query?.redirect || PATH_PAGE.root)
  }

  return children
}
