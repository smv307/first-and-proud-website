const Logo = () => {
    return(
        <h1><span>First</span> and <span>Proud</span></h1>
    );
}

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/">College Match</NavLink></li>
                <li><NavLink to="/">Contact</NavLink></li>
            </ul>
        </nav>
    );
}

export default function Header() {
    return(
        <header>
            <Logo />
            <Navbar />
            
        </header>
    );
}