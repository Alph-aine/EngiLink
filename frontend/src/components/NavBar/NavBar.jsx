import NavLink from '../NavLink/NavLink'

const NavBar = () => {
  return (
    <div>
      <NavLink url="/" text="Home" header={true} />
      <NavLink url="/discover" text="Discover Employers" header={true} />
      <NavLink url="/login" text="Sign In" header={true} />
    </div>
  )
}

export default NavBar