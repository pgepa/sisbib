/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Button, FormCheck } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';
import UsuariosService from '../services/usuarios.service';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Informe seu nome'),
  email: Yup.string()
    .required('Informe seu email')
    .email('O email deve conter "@" e ponto "."'),
  phone: Yup.string()
    .required('Informe seu telefone')
    .min(8, 'O número de telefone deve conter pelo menos 8 digitos'),
  cpf: Yup.string()
    .required('Informe seu CPF')
    .test('cpf-digits', 'CPF deve conter 11 dígitos', (v) => {
      if (!v) return false;
      return String(v).replace(/\D/g, '').length === 11;
    }),
  inscription: Yup.string()
    .required('Informe seu número de matrícula')
    .min(6, 'O número de matrícula deve conter no mínimo 6 caracteres')
    .max(8, 'O número de matrícula deve conter no máximo 8 caracteres'),
  department: Yup.string()
    .required('Informe seu setor'),
  newPassword: Yup.string()
    .nullable()
    .transform((v) => (v === '' || v === undefined ? undefined : v))
    .max(100, 'Senha muito longa')
    .test('min-if-set', 'A nova senha deve ter no mínimo 6 caracteres', (v) => !v || v.length >= 6),
  confirmPassword: Yup.string()
    .nullable()
    .test('match', 'A confirmação não coincide com a nova senha', function (v) {
      const np = this.parent.newPassword;
      if (!np) return true;
      return v === np;
    }),
  roles: Yup.array()
    .of(Yup.string())
    .min(1, 'Selecione ao menos um perfil'),
});

const emptyForm = {
  id: '',
  name: '',
  email: '',
  cpf: '',
  inscription: '',
  department: '',
  phone: '',
  newPassword: '',
  confirmPassword: '',
  roles: ['user'],
};

const EditarUsuario = () => {
  const [initialValues, setInitialValues] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await UsuariosService.getOne(id);
        const u = res.data;
        if (cancelled) return;
        setInitialValues({
          id: u.id,
          name: u.name || '',
          email: u.email || '',
          cpf: u.cpf || '',
          inscription: u.inscription || '',
          department: u.department || '',
          phone: u.phone || '',
          newPassword: '',
          confirmPassword: '',
          roles: Array.isArray(u.roles) && u.roles.length ? [...u.roles] : ['user'],
        });
      } catch (e) {
        alert('Não foi possível carregar o usuário.');
        navigate(-1);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id, navigate]);

  const handleSubmit = (values) => {
    const payload = {
      id: values.id,
      inscription: values.inscription,
      name: values.name,
      department: values.department,
      cpf: String(values.cpf).replace(/\D/g, ''),
      email: values.email.trim(),
      phone: String(values.phone).replace(/\D/g, ''),
      roles: values.roles,
    };
    if (values.newPassword && String(values.newPassword).trim()) {
      payload.password = String(values.newPassword).trim();
    }
    UsuariosService.update(payload)
      .then((response) => {
        alert(response.data.message);
        navigate(-1);
      })
      .catch((error) => {
        const msg = error.response?.data?.message || 'Erro ao atualizar usuário!';
        alert(msg);
        console.error(error);
      });
  };

  const toggleRole = (roles, roleName, checked) => {
    const set = new Set(roles || []);
    if (checked) set.add(roleName);
    else set.delete(roleName);
    return Array.from(set);
  };

  if (loading) {
    return <p className="container my-4">Carregando…</p>;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="container card card-usuario my-3">
          <FormGroup>
            <FormLabel className="h4 my-2">Nome</FormLabel>
            <Field name="name" type="text" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Email</FormLabel>
            <Field name="email" type="email" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">CPF</FormLabel>
            <Field name="cpf" type="text" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="cpf" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Matrícula</FormLabel>
            <Field name="inscription" type="text" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="inscription" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Telefone</FormLabel>
            <Field name="phone" type="text" className="form-control shadow h4 mx-0 mb-2" />
            <ErrorMessage name="phone" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Setor</FormLabel>
            <Field name="department" type="text" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="department" component="div" className="text-danger" />
          </FormGroup>

          <FormGroup>
            <FormLabel className="h4 my-2">Perfis de acesso</FormLabel>
            <div className="mx-1 mb-2">
              <FormCheck
                id="role-user"
                type="checkbox"
                label="Usuário (acesso ao acervo)"
                checked={values.roles.includes('user')}
                onChange={(e) => {
                  const next = toggleRole(values.roles, 'user', e.target.checked);
                  setFieldValue('roles', next.length ? next : ['user']);
                }}
              />
              <FormCheck
                id="role-admin"
                type="checkbox"
                label="Administrador (gestão de usuários e cadastros)"
                checked={values.roles.includes('admin')}
                onChange={(e) => {
                  const next = toggleRole(values.roles, 'admin', e.target.checked);
                  setFieldValue('roles', next.length ? next : ['user']);
                }}
              />
            </div>
            <ErrorMessage name="roles" component="div" className="text-danger" />
          </FormGroup>

          <FormGroup>
            <FormLabel className="h4 my-2">Nova senha (opcional)</FormLabel>
            <Field name="newPassword" type="password" autoComplete="new-password" className="form-control shadow h4 mx-1 mb-2" placeholder="Deixe em branco para manter a senha atual" />
            <ErrorMessage name="newPassword" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Confirmar nova senha</FormLabel>
            <Field name="confirmPassword" type="password" autoComplete="new-password" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
          </FormGroup>

          <FormGroup className="text-center">
            <Button type="submit" className="btn btn-success shadow-lg px-4 py-3 mt-4">
              <BsCheckLg /><span className="mx-2">ATUALIZAR</span>
            </Button>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export default EditarUsuario;
