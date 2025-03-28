import ButtonReturn from "./components/ButtonReturn";
import ButtonDefault from "./components/ButtonDefault"

import { useRouter } from 'next/router'
import { useWidth } from "../components/provider/WidthProvider";

const Header = ({ title, btn = false, onModifyChange, isModified }) => {

    const router = useRouter()
    const { isDesktop } = useWidth();

    const returnToHome = () => {
            if (onModifyChange) {
                onModifyChange(false);
            }
            if (!isModified){
                router.push('/tous-les-rapports')
            }
        };

    const display = isDesktop && "justify-between"

    return (
        <div className={`${display} flex items-center pt-8 lg:pt-15 pb-6 lg:pb-20`}>
            {!btn ? <h1 className="text-4xl lg:text-5xl font-bold text-text-title-blue">{title}</h1> : <ButtonReturn text="Retour" onClick={returnToHome} />}
            {(isDesktop && router.pathname === "/tous-les-rapports") && <ButtonDefault text="Créer un rapport" variant="addAdmin" size="addAdmin" destination="/nouveau-rapport"/>}
        </div>
    );
};

export default Header;