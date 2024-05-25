export const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    let formattedPhoneNumber = cleaned.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, '($1) $2-$3');
    formattedPhoneNumber = formattedPhoneNumber.replace(/[()-\s]+$/, '');
    return formattedPhoneNumber;
}
export const validatePhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    return cleaned.length === 11;
}