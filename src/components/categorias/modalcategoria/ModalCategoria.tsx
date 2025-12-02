
import Popup from 'reactjs-popup';
import FormCategoria from '../formcategoria/FormCategoria';

function ModalCategoria() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Nova Categoria
                    </button>
                }
                modal
                contentStyle={{
                    borderRadius: '1rem',
                    paddingBottom: '2rem'
                }}
            >
                <FormCategoria />
            </Popup>
        </>
    );
}

export default ModalCategoria;