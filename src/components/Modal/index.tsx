import { type FC } from 'react';

import { ModalTypes } from './types';
import { useModalController } from './modalController';

export const Modal: FC<ModalTypes> = ({isOpen, onClose, id }) => {
    const {item} = useModalController({id})

    return (
        <>
        {isOpen && (
            <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>

                <div className="relative bg-white p-4 rounded-lg max-w-md mx-auto">
                    {item}
                </div>
            </div>
        )}
        </>
    );
};
