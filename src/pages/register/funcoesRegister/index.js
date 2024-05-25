// Funcoes pagina registro

// Formats
import { formatPhoneNumber } from "../../../components/validators/telefone";
import { formatCPF } from "../../../components/validators/cpf";

// Alterar pagina
export const handleStep = (formData, step, setStep, setError) => {
    const { name, description, phone, cpf } = formData;
    if ((name === '' || cpf === '' || phone === '') && step === 1) {
        setError('Complete todos os campos!');
    } else if (description === '' && step === 3) {
        setError('Complete todos os campos!');
    } else {
        setError(''); 
        setStep(step + 1);
        
    }
};

// Controle do texto
export const handleText = (e, setFormData) => {
    if (e.target.value.length < 255) {
        setFormData(prevState => ({ ...prevState, description: e.target.value }));
    }
};

// Contole do email
export const handleEmailChange = (e, setFormData) => {
    setFormData(prevState => ({ ...prevState, email: e.target.value }));
};

// Contole do email
export const handlePhoneChange = (e, setFormData) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFormData(prevState => ({ ...prevState, phone: formattedPhoneNumber }));
};

// Contole do email
export const handleCPFChange = (e, setFormData) => {
    const formattedCPF = formatCPF(e.target.value);
    setFormData(prevState => ({ ...prevState, cpf: formattedCPF }));
};