'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class RegisterController {

  index({ view }) {
    return view.render('users.register')
  }

  async store({ request, session, response }) {

    /**
     * declaration validation
     */
    const rules = {
      username: 'required',
      email: 'required|unique:users,email',
      password: 'required'
    }

    const messages = {
      'username.required': 'Nama lengkap Tidak Boleh Kosong!',
      'email.required': 'Alamat Email Tidak Boleh Kosong!',
      'email.unique': 'Alamat Email Sudah Terdaftar!',
      'password.required': 'Password Tidak Boleh Kosong!',
    }

    const validation = await validate(request.all(), rules, messages)

    /**
     * validation failed
     */
    if(validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(['password'])
      return response.redirect('back')
    }

    /**
     * create user
     */
    const user = await User.create({
      username: request.input('username'),
      email: request.input('email'),
      password: request.input('password')
    })

    /**
     * display success message
     */
    session.flash({ notification: 'Register Berhasil!' })
    return response.redirect('users')

  }

}

module.exports = RegisterController