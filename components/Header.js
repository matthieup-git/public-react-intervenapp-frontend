const Header = ({ title }) => {
    return (
        <div className="flex items-center h-36 font-bold">
            <h1 className="text-4xl">{title}</h1>
        </div>
    );
};

export default Header;