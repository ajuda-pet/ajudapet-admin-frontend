export const formatCPF = (cpfNumber) => {
    // Remove todos os caracteres não numéricos
    const cleaned = cpfNumber.replace(/\D/g, '');
    // Adiciona pontos e traço conforme necessário
    let formattedCPF = cleaned.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1.$2.$3-$4');
    // Remove pontos e traço extras no final
    formattedCPF = formattedCPF.replace(/[.-]+$/, '');
    return formattedCPF;
}
export const validateCPF = (cpfNumber) => {
    // Remove todos os caracteres não numéricos
    const cleaned = cpfNumber.replace(/\D/g, '');
    // Verifica se o CPF tem 11 dígitos
    if (cleaned.length !== 11) {
        return false;
    }
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleaned)) {
        return false;
    }
    // Validação do CPF utilizando algoritmo
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
    }
    if (remainder !== parseInt(cleaned.substring(9, 10))) {
        return false;
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
    }
    if (remainder !== parseInt(cleaned.substring(10, 11))) {
        return false;
    }
    return true;
}
