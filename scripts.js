document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario');

    // Carregar dados salvos
    const dadosSalvos = JSON.parse(localStorage.getItem('formulario'));
    if (dadosSalvos) {
        Object.keys(dadosSalvos).forEach(chave => {
            const campo = document.getElementById(chave);
            if (campo) campo.value = dadosSalvos[chave];
        });
    }

    // Buscar dados do CEP
    const cepInput = document.getElementById('cep');
    cepInput.addEventListener('blur', () => {
        const cep = cepInput.value.replace(/\D/g, '');
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/Json`)
            .then(res => res.json())
            .then(dados => {
                if (!dados.error) {
                    document.getElementById('rua').value = dados.logradouro || '';
                    document.getElementById('bairro').value = dados.bairro || '';
                    document.getElementById('cidade').value = dados.localidade || '';
                    document.getElementById('estado').value = dados.uf || '';
                }
            })
            .catch(err = console.error('Erro ao buscar CEP:', err));
        }
    });
    // Salvar no localStorage ao enviar o formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // evita recarregar
        const dados = {};
        [...form.elements].forEach(el => {
            if (el.name) dados[el.id] = el.value;
        });
        localStorage.setItem('formulario', JSON.stringify(dados));
        alert('Dados salvos com sucesso!');
    });
});