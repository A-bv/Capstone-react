import '../styles/header.css';

interface HeaderProps {
    title: string;
    subtitle: string;
    description: string;
    imageSrc: string;
}

function Header({ title, subtitle, description, imageSrc }: HeaderProps) {
    return (
        <header className="header">
            <div className="header-left">
                <div className="header-text">
                    <h1>{title}</h1>
                    <h2>{subtitle}</h2>
                    <p>{description}</p>
                </div>
            </div>
            <div className="header-right">
                <div className="header-image">
                    <img src={imageSrc} alt="Banner" className="header-img" />
                </div>
            </div>
        </header>
    );
}

export default Header;
