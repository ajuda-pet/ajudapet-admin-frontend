export const formatCEP = (cep) => {
    const cleaned = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    let formattedCEP = cleaned.replace(/(\d{5})(\d{3})/, '$1-$2'); // Formata XXXXX-XXX
    formattedCEP = formattedCEP.replace(/[-\s]+$/, ''); // Remove caracteres finais desnecessários
    return formattedCEP;
};

export const extractNumbers = (str) => {
    // Remove todos os caracteres não numéricos
    const numbersOnly = str.replace(/\D/g, '');
    return numbersOnly;
};