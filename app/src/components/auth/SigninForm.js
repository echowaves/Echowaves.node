import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux'
import {signinUser} from '../../actions/index'

class SigninForm extends Component {

  onSubmit(props){
    console.log("this.context.router: ", this.context.router)
    this.props.signinUser(props, this)
    //  .then(() => {
    //    this.context.router.push('/');
    //  })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component="input" type="email" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" component="input" type="password"  className="form-control" />
        </fieldset>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }

}
const formData = {
  form: 'SigninForm',
  fields: ['email', 'password']
}

export default connect(null, { signinUser })(reduxForm(formData)(SigninForm))
