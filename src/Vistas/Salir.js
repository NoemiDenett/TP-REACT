import { useNavigate } from "react-router-dom"

function Salir() {
    let navigate = useNavigate()
    localStorage.clear();
    setTimeout(() => {
        navigate("/inicio");
    }, 2100);
}
export default Salir;