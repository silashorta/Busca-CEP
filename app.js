const mensagemErro = document.querySelector("#mensagemErro");
        const cepbusca = document.querySelector("#cep");
        const logradouro = document.querySelector("#logradouro");
        const complemento = document.querySelector("#complemento");
        const bairro = document.querySelector("#bairro");
        const localidade = document.querySelector("#localidade");
        const uf = document.querySelector("#uf");
        const alerta = document.querySelector("#alerta");
        const alertEndereco = document.querySelector("#alertEndereco");
        const btnBuscar =  document.querySelector("#botaoBuscar");
        const btnLimpar =  document.querySelector("#botaoLimpar");
        const btnCopiar = document.querySelector("#botaoCopiar");
        const divErro =  document.querySelector("#divErro");
        let endereco; 

        btnBuscar.addEventListener('click', (e) => {
            e.preventDefault(); 

                document.addEventListener("keypress", function(e) {
                    if(e.key === 'Enter') {
        
                    btnBuscar.click();
                    }
                });
                try{
                    validaCEP();
                }catch(erro){
                    mensagemErro.innerHTML = erro.message;
                    logradouro.value = "";
                    complemento.value = "";
                    bairro.value = "";
                    localidade.value = "";
                    uf.value = "";
                }
        })

        btnLimpar.addEventListener('click', (e) => {
            e.preventDefault();
            limpaCampos();
            mensagemErro.style.display = 'none';
            alerta.style.display = 'none';
        })

        btnCopiar.addEventListener('click', (e) => {
            e.preventDefault();
            copiaTexto();
        })

        function limpaCampos(){
            cepbusca.value = "";
            logradouro.value = "";
            complemento.value = "";
            bairro.value = "";
            localidade.value = "";
            uf.value = "";
            mensagemErro.innerHTML = "";
        }

        function copiaTexto() {
            let textoCopiado = `${logradouro.value}, ${complemento.value}, ${bairro.value}, ${localidade.value}/${uf.value}`;
            navigator.clipboard.writeText(textoCopiado);
            //textoCopiado.select();
            document.execCommand("copy");

            alerta.classList.remove("alert-danger");
            alerta.classList.add("alert-success");
            alerta.style.display = 'block';
            alerta.innerHTML = `O endereço ${textoCopiado} foi copiado com sucesso!`;

            if (logradouro.value === "") {
                alerta.classList.remove("alert-sucess");
                alerta.classList.add("alert-danger");
                alerta.innerHTML = `Não há um endereço válido a ser copiado.`
            }
        }

        function validaCEP(){
            const regex = /^[0-9]{8}$/;
            if (regex.test(cepbusca.value)){
                buscaEndereco();
                mensagemErro.style.display = 'none';
                alerta.style.display = 'none';
            }else{
                buscaNome();
                mensagemErro.style.display = 'block';
                mensagemErro.classList.add("alert-danger")
                throw new Error("O CEP informado é inválido!");
            }
        }

        function buscaEndereco(){
            fetch(`https://viacep.com.br/ws/${cepbusca.value}/json`)
            .then((resposta) =>{
                return resposta.json();
            })
            .then((endereco) =>{
                preencheCampos(endereco);

                console.log(endereco);

                if(endereco.logradouro === undefined){
                    mensagemErro.style.display = 'block';
                    mensagemErro.classList.replace("alert-danger", "alert-warning");
                    mensagemErro.innerHTML = "O CEP informado não existe.";
                    logradouro.value = "";
                    complemento.value = "";
                    bairro.value = "";
                    localidade.value = "";
                    uf.value = "";
                }   
            })
            .catch((erro)=>{
                console.error(erro);
            })
        }

        function preencheCampos(endereco){
            logradouro.value = endereco.logradouro;
            complemento.value = endereco.complemento;
            bairro.value = endereco.bairro;
            localidade.value = endereco.localidade;
            uf.value = endereco.uf;
        }

        const btnBuscaNome = document.querySelector('#btnBuscaNome')
        btnBuscaNome.addEventListener('click', (e) => {
            e.preventDefault();
            limpaCampos();
            buscaNome();
        })

        const btnLimpaNome = document.querySelector("#btnLimpaNome")
        btnLimpaNome.addEventListener('click', (e) => {
            e.preventDefault();
            lograEndereco.value = "";
            localEndereco.value = "";
            ufEndereco.value = ""; 
            alertEndereco.style.display = "none"
            document.querySelector('#listaEnderecos').remove()
            })

        function buscaNome(){
            const accordion = document.querySelector('#accordion')
            const listaEnderecos = document.createElement('div')
            listaEnderecos.setAttribute('id','listaEnderecos')
            accordion.appendChild(listaEnderecos)

            fetch(`https://viacep.com.br/ws/${ufEndereco.value}/${localEndereco.value}/${lograEndereco.value}/json`)
            .then((resposta) =>{
                return resposta.json();
            })
            
            .then((endereco) =>{
                let enderecos = endereco

                for (let i = 0; i < enderecos.length; i++) {
                    const ident = [i]

                    const divEnderecos = document.createElement('div')
                    divEnderecos.classList.add('bg-light','p-2','border','my-2')
                    divEnderecos.setAttribute('id',`enderecos` + ident)
                    listaEnderecos.appendChild(divEnderecos)

                    const cepEnderecos = document.createElement('p')
                    divEnderecos.appendChild(cepEnderecos)
                    cepEnderecos.setAttribute('id','cepEnderecos'+ ident)
                    cepEnderecos.innerHTML = `CEP: ${enderecos[i].cep}`
                    
                    const lograEnderecos = document.createElement('p')
                    divEnderecos.appendChild(lograEnderecos)
                    lograEnderecos.setAttribute('id','lograEnderecos'+ ident)
                    lograEnderecos.innerHTML = `Rua: ${enderecos[i].logradouro}`
                    
                    const compEnderecos = document.createElement('p')
                    divEnderecos.appendChild(compEnderecos)
                    compEnderecos.setAttribute('id','compEnderecos'+ ident)
                    compEnderecos.innerHTML = `Complemento: ${enderecos[i].complemento}`
                    
                    const bairroEnderecos = document.createElement('p')
                    divEnderecos.appendChild(bairroEnderecos)
                    bairroEnderecos.setAttribute('id','bairroEnderecos'+ ident)
                    bairroEnderecos.innerHTML = `Bairro: ${enderecos[i].bairro}`
                    
                    const localEnderecos = document.createElement('p')
                    divEnderecos.appendChild(localEnderecos)
                    localEnderecos.setAttribute('id','localEnderecos'+ ident)
                    localEnderecos.innerHTML = `Cidade: ${enderecos[i].localidade}`
                    
                    const ufEnderecos = document.createElement('p')
                    divEnderecos.appendChild(ufEnderecos)
                    ufEnderecos.setAttribute('id','ufEnderecos'+ ident)
                    ufEnderecos.innerHTML = `Estado: ${enderecos[i].uf}`
                    
                    const endCopiado = `${enderecos[i].cep}, ${enderecos[i].logradouro}, ${enderecos[i].complemento}, ${enderecos[i].bairro}, ${enderecos[i].localidade}/${enderecos[i].uf}`

                    const btnEnderecos = document.createElement('button')
                    divEnderecos.appendChild(btnEnderecos)
                    btnEnderecos.classList.add('btn','btn-outline-primary')  
                    btnEnderecos.innerHTML = 'Copiar'
                    btnEnderecos.setAttribute('id','btnEndereco' + ident)
                    btnEnderecos.setAttribute('value',`${endCopiado}`)
                    
                    btnEnderecos.addEventListener('click', (e) => {
                    e.preventDefault();
                    alertEndereco.style.display = 'none'
                    console.log(endCopiado)
                    navigator.clipboard.writeText(endCopiado);
                    document.execCommand("copy");
                    alertEndereco.style.display = 'block'
                    })

                    const alertEndereco = document.createElement('div')
                    alertEndereco.classList.add('alert','alert-success','mt-3','alert-dismissible','fade','show')
                    alertEndereco.style.display = 'none'
                    alertEndereco.setAttribute('id','alertaEnd' + ident)
                    alertEndereco.setAttribute('value',`${enderecos[i].cep}, ${enderecos[i].logradouro}, ${enderecos[i].complemento}, ${enderecos[i].bairro}, ${enderecos[i].localidade}/${enderecos[i].uf}`)
                    alertEndereco.setAttribute('role','alert')
                    divEnderecos.appendChild(alertEndereco)
                    alertEndereco.innerHTML = `O endereço CEP ${enderecos[i].cep}, ${enderecos[i].logradouro}, ${enderecos[i].complemento}, ${enderecos[i].bairro}, ${enderecos[i].localidade}/${enderecos[i].uf} foi copiado.`
                    const buttonEnd = document.createElement('button')
                    buttonEnd.classList.add('btn-close')
                    buttonEnd.setAttribute('data-bs-dimiss','alert')
                    buttonEnd.setAttribute('aria-label','Close')
                    alertEndereco.appendChild(buttonEnd)

                    buttonEnd.addEventListener('click', (e) => {
                    e.preventDefault();
                    alertEndereco.style.display = 'none'
                    })
                }
            })
        }

        const lograEndereco = document.querySelector("#lograEndereco");
        const localEndereco = document.querySelector("#localEndereco");
        const ufEndereco = document.querySelector("#ufEndereco");