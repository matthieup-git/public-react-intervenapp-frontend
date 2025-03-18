import ButtonReturn from "./ButtonReturn";

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
        <div className="flex items-center font-bold h-36">
            {!btn ? <h1 className="text-4xl">{title}</h1> : <ButtonReturn text="Retour" onClick={returnToHome} />}
        </div>
    );
};

export default Header;