
export function gerarNomeImagem() {
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var tamanho = Math.floor(Math.random() * (23 - 7 + 1)) + 7; // Gera um número aleatório entre 7 e 23
    var nomeImagem = '';

    for (var i = 0; i < tamanho; i++) {
        nomeImagem += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return nomeImagem;
}



