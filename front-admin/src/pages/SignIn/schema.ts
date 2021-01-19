import { object, string } from 'yup';

export default object().shape({
  email: string()
    .required('E-mail obrigatório')
    .email('Digite um email válido'),
  password: string().required('Senha obrigatória'),
});
