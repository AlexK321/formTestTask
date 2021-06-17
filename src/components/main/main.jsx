import React from 'react'
import styles from "./Main.module.scss";
import Form from "../form/form";

function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.form_wrapper}>
        <h1 className={styles.form_title}>Заявка на участие</h1>
        <h2 className={styles.form_description}>Расскажите о проекте, его ценности для бизнеса, оставьте информацию о компании и контакты, чтобы мы могли с вами связаться</h2>
        <Form/>      
      </div>
    </main>
  );
}

export default (Main);
