import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year dynamically

    return (
        <footer>
            <div className="footer">
                <p>TaskTrek &copy; {currentYear}</p>
                <p>Made with ❤️ by Erfan Ghesmati</p>
            </div>
        </footer>
    );
};

export default Footer;
