import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import LoginForm from '../components/LoginForm/LoginForm';

//componentes

const Login = () => {

    const [isLoading, setIsLoading] = useState(false);
    const notifySucess = () => toast.success("Login realizado com sucesso!");
    const notifyFail = () => toast.error("Erro ao realizar o Login!");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignIn, setIsSignIn] = useState(true);

    const [formData, setFormData] = useState({
      username: '', 
      senha: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (event: any) => {
      event.preventDefault();
      setIsLoading(true);
      
      try {
        const response = await fetch('http://localhost:8081/v1/usuarios/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            senha: formData.senha,
          }),
        });
        
        if (response.ok) {
          // Limpar o formulário após o envio bem-sucedido, se necessário
          setFormData({
            username: '',
            senha: '',
          });
        
          setIsLoading(false);
          notifySucess();
         
          console.log('Login efetuado com sucesso!');
        } else {
          setIsLoading(false);
          notifyFail();
          console.error('Erro ao efetuar o login:', response.statusText);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Erro ao efetuar o login:', error);
      }
    };

    const handleSignIn = (e: React.FormEvent) => {
      e.preventDefault();
      // Lógica de autenticação
    };
  
    const handleSignUp = (e: React.FormEvent) => {
      e.preventDefault();
      // Lógica de registro
    };
  
    return (
      <div>
        <LoginForm/>
      </div>
    );
  };
  
  export default Login;