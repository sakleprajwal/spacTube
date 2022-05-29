import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/base.css'

const Toaster = ({message, type}) => {
    return toast.success(message, {
        position: "bottom-center",
        autoClose: 2000,
        type: type,
        transition: Zoom,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
};

export default Toaster;