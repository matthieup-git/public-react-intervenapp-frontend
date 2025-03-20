import ButtonReturn from "./components/ButtonReturn";

import { useRouter } from 'next/router'

const Header = ({ title, btn = false, onModifyChange, isModified }) => {

    const router = useRouter()

    const returnToHome = () => {
            if (onModifyChange) {
                onModifyChange(false);
            }
            if (!isModified){
                router.push('/tous-les-rapports')
            }
        };

    return (
        <div className="flex items-center h-36">
            {!btn ? <h1 className="text-4xl font-bold text-text-title-blue">{title}</h1> : <ButtonReturn text="Retour" onClick={returnToHome} />}
        </div>
    );
};

export default Header;