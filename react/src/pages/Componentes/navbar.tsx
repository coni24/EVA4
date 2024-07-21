import Link from 'next/link';

const Navbar = () => {
    return(
        <nav>
            <ul>
                <li><Link href="/registrar">Registrar nuevo usuario</Link></li>
                <li><Link href="/registrar-productos">Registrar Productos</Link></li>
                <li><Link href="/visualizar">VisualizarRegistrado</Link></li>
                <li><Link href="/login" onClick={()=>localStorage.removeItem('isAuthenticated')}>Salir</Link></li>
            </ul>
        </nav>

    )
}

export default Navbar