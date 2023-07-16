import Link from "next/link"

function Nav() {
  return (
    <>
    <Link href='/authorization'><h3>Авторизація</h3></Link>
    <Link href='/student'><h3>Учень</h3></Link>
    <Link href='/teacher'><h3>Вчитель</h3></Link>
    <Link href='/admin'><h3>Адмін</h3></Link>
    </>
  )
}
export default Nav