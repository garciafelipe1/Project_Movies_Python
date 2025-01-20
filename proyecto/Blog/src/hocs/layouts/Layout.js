import { connect } from 'react-redux';
import {motion} from "framer-motion";
function Layout({ children }) {
    return (
        <motion.div
        initial={{ opacity: 0, transition: { duration: 0.4 } }}
        animate={{ opacity: 1, }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
        {children}
        </motion.div>
    );
}

const mapStateToProps = (state) => {
    return {}; // Devuelve el estado necesario (si es aplicable)
};

export default connect(mapStateToProps, {})(Layout);