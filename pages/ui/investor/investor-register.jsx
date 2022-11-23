import React from "react";
import { useState } from "react";
import Header from "../../../components/header/header.component";

import styles from './css/investor-register.module.css'

function InvestorRegister() {

  const [singular, isSingular] = useState(false)
  const [legal, isLegal] = useState(false)

  const handleChecked = (e) => {
    if (e.target.id === 'singular' && e.target.checked)
      isSingular(true)
    else
      isSingular(false)
    if (e.target.id === 'juridico' && e.target.checked)
    isLegal(true)
    else
    isLegal(false)
  }

  return (
    
    <div>
      <Header />
      <form className={styles.form}>
        <div className={styles.infoCadastro}>
          <h2 className={styles.h2}>Formulário de Cadastro do Investidor</h2>

          <div className={styles.caixaElement1}>
            <label htmlFor="">Tipo pessoa</label><br />
            <div className={styles.radio}>
              <input name="radio" type="radio" id="singular" onChange={handleChecked} /><label htmlFor="singular">Pessoa singular</label>
              <input name="radio" type="radio" id="juridico" onChange={handleChecked} /><label htmlFor="juridico">Pessoa jurídica</label>
            </div>
          </div>

          {singular && (
            <div>
            <div className={`${styles.caixaElement2} ${styles.caixaEsq}`}>
              <label htmlFor="">Nome</label>
              <input className={styles.input} type="text" placeholder="Insira o seu nome"></input>
            </div>
            <div className={styles.caixaElement2}>
              <label htmlFor="">Apelido</label>
              <input className={styles.input} type="text" placeholder="Insira o seu Apelido"></input>
            </div>
          </div>
          )}

          {legal && (
            <div>
            <div className={styles.caixaElement1}>
              <label htmlFor="">Empresa</label>
              <input className={styles.input} type="text" placeholder="Nome da empresa"></input>
            </div>
            <div className={styles.caixaElement1}>
              <label htmlFor="">NIF</label>
              <input className={styles.input} type="text" placeholder="Insira o Nif"></input>
            </div>
          </div>
          )}
          
          <div className={`${styles.caixaElement2} ${styles.caixaEsq}`}>
            <label className={styles.label} htmlFor="">Email</label>
            <input className={styles.input} type="text" placeholder="Insira o seu email"></input>
          </div>
          <div className={styles.caixaElement2}>
            <label htmlFor="">Contacto</label>
            <input className={styles.input} type="text" placeholder="Insira o seu contacto"></input>
          </div>
          <div className={styles.caixaElement1}>
            <label htmlFor="">Nome de utilizador</label>
            <input className={styles.input} type="text" placeholder="Insira o seu nome de utilizador" />
          </div>
          <div className={styles.caixaElement1}>
            <label htmlFor="">Senha</label>
            <input className={styles.input} type="text" placeholder="Insira a sua palavra-passe" />
          </div>
          <div className={styles.caixaElement1} >
            <label htmlFor="">Confirmar Senha</label>
            <input className={styles.input} type="text" placeholder="Confirme a sua palavra-passe" />
          </div>
          <div className={styles.caixaBotoes} />
          < button className={styles.button} type="submit" > Cadastrar</button >
          <button className={styles.button} type="reset">Limpar</button>
        </div >
      </form >
    </div>
  )
}

export default InvestorRegister