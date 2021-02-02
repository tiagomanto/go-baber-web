import React, {useRef, useCallback} from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import {useAuth} from '../../hooks/auth'
import {useToast} from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErros'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link, useHistory } from 'react-router-dom'

import { Container, Content, AnimationContainer, Background } from './styles';
//import { sign } from 'crypto';

interface SignInFormData{
  email:string;
  password: string;
}

const SignIn:React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {user,  signIn} = useAuth();
  const {addToast } = useToast();
  const history = useHistory();
 

 const handleSubmit= useCallback(
   async (data: SignInFormData) =>{
    try {
      formRef.current?.setErrors({});
      
      const schema = Yup.object().shape({
        email: Yup.string().required('Digite um e-mail válido').email(),
        password: Yup.string().required('Senha obrigatória')
      });

      await schema.validate(data, {
        abortEarly:false,
      });

      await signIn({
        email: data.email,
        password: data.password
      }); 

      history.push('/dashboard')
    } catch (err) {
      if (err instanceof Yup.ValidationError){
        const errors =getValidationErrors(err);
      
        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type:'error',
        title:'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
      });

    }
  },[signIn,addToast,history]);

  return (
  
  <Container>
    <Content>
      <AnimationContainer>
        <img src={logoImg} alt="GoBarber"/>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Logon</h1>
          
          <Input name="email" icon={FiMail} placeholder="Email"/>
          
          <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a> 
        </Form>

        <Link to="/signup">
          <FiLogIn/>
          Criar conta
        </Link>

      </AnimationContainer>
    </Content>

    <Background/>
  </Container>
)};

export default SignIn