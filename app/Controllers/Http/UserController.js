'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {

  async index({ view }) {
    const users = await User.all()

    return view.render('users.index', { users: users.rows })
    // return response.json(users)
  }

  async edit({  view, params }) {
    const id    = params.id
    const user  = await User.find(id)

    return view.render('users.edit', { user: user })
  }

  async update({ request, response, params, session }) {
    const id    = params.id
    const user  = await User.find(id)
    const rules = {
        username: 'required',
        email: 'required'
      }
  
      const messages = {
        'username.required': 'Nama lengkap Tidak Boleh Kosong!',
        'email.required': 'Alamat Email Tidak Boleh Kosong!',
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
    user.username    = request.input('username')
    user.email  = request.input('email')
    await user.save()

    session.flash({ notification: 'Data Berhasil Diupdate!' })
    return response.route('users.index')
  }

  async delete({ response, params, session}) {
    const id = params.id
    const user = await User.find(id)
    await user.delete()

    session.flash({ notification: 'Data Berhasil Dihapus!' })
    return response.route('users.index')
  }
}

module.exports = UserController