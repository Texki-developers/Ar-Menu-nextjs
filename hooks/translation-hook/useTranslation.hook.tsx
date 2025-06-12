import { translationProvider } from '@/providers/translation-provider/TranslationProvider';
import { useContext } from 'react';

interface IReturnValues {
    t: any;
}

const useTranslation = (): IReturnValues => {
    const t = useContext(translationProvider);
    return { t };
};

export default useTranslation;
