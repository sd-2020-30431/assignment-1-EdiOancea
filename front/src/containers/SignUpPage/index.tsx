import React from 'react';
import * as Yup from 'yup';
import { withRouter } from 'react-router';

import Button from '../../components/forms/Button';
import TextField from '../../components/forms/TextField';
import SignUpComponent from '../../components/forms/SignUp';
import Form from '../../components/forms/Form';
import APIRequests from '../APIRequests';

class SignUpPage extends React.Component<SignUpPageProps, {}> {
  private validationSchema;
  private fields = [
    {
      fieldProps: {
        id: 'email',
        label: 'Email',
        name: 'email',
        autoComplete: 'off',
      },
      component: TextField,
    },
    {
      fieldProps: {
        id: 'password',
        label: 'Password',
        name: 'password',
        type: 'password',
        autoComplete: 'nope',
      },
      component: TextField,
    },
    {
      fieldProps: {
        id: 'confirmPassword',
        label: 'Confirm Password',
        name: 'confirmPassword',
        type: 'password',
        autoComplete: 'nope',
      },
      component: TextField,
    },
  ];

  constructor(props: SignInPageProps) {
    super(props);

    this.validationSchema = Yup.object<SignUpValidationSchema>().shape({
      email: Yup.string()
        .email('This field must be a valid email')
        .required('This field is required'),
      password: Yup.string().required('This field is required'),
      confirmPassword: Yup.string()
        .required('This field is required')
        .test({
          name: 'equal passwords',
          message: 'This field must be equal to the password field.',
          test: function(values) {
            const { password } = this.options.context.values;

            return values === password;
          }
        }),
    })
  }

  componentDidMount() {
    localStorage.setItem('token', '');
  }

  private onSubmit = async (values: SignUpValidationSchema) => {
    const response = await APIRequests.post('/users', values);
  }

  renderForm = () => (
    <Form
      {...{
        onSubmit: this.onSubmit,
        validationSchema: this.validationSchema,
        fields: this.fields,
        submitButton: { render: () => <Button type="submit">Sign up</Button> },
        errors: null,
      }}
    />
  )

  render() {
    return (
      <SignUpComponent renderForm={this.renderForm}/>
    );
  }
}

export default withRouter(SignUpPage);