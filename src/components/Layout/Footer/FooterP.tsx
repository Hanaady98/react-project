import { Footer } from "flowbite-react"
import "../../../Style/style.css";

const FooterP = () => {
    return (
        <Footer container className="bg-pink-400 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
            <div className="w-full text-center">
                <Footer.Copyright href="#" by="Hanady" className="text-black dark:text-white" />
            </div>
        </Footer>
    );
};

export default FooterP;