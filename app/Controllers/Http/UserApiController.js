'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')
const axios = use('axios');
const querystring = use('querystring'); // https://github.com/axios/axios#nodejs

class UserAPIController {

  async index({ request, response, view }) {
    const users = await User.all()

    return response.status(200).json({ code: 200, status: 'success', data: users })
  }

  async store({ request, response }) {
    const input = request.only(['username', 'email', 'password'])
    try {
      const users = await User.create(input)

      return response.status(200).json({ code: 200, status: 'success', data: users })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  async edit({ response, params }) {
    const id    = params.id
    const user  = await User.find(id)
    if (!user) {
      return response.status(404).json({data: 'Resource not found'})
    }else{
      return response.status(200).json({ code: 200, status: 'success', data: user })
    }
  }
  
  async update({ request, response, params }) {
    const id    = params.id
    const user  = await User.find(id)
    if (!user) {
      return response.status(404).json({data: 'Resource not found'})
    }else{
      user.username    = request.input('username')
      user.email  = request.input('email')
      await user.save()
      
      return response.status(200).json({ code: 200, status: 'success', data: user })
    }
  }

  async delete({ response, params }) {
    const id = params.id
    const user = await User.find(id)
    if (!user) {
      return response.status(404).json({data: 'Resource not found'})
    }
    await user.delete()
    return response.status(200).json({data: 'Data has been deleted'})
  }

  async check({ request, response, view, auth }) {
    // const { email, password } = request.all()
    const data = {
      username: 'yusuf@digimasia.com',
      password: 123456,
      firebase_token: '78342rhksfjdfsdfsdfds',
      brand: 'Xiaomi',
      model: 'MiA1',
      serial_number: 786423749234,
      platform: 'Android',
      version: 7.0
    }
    
    const req = await axios.post(
      'https://app-dev.digimasia.com/api/public/index.php/login', data
      );
    // await auth.attempt(email, password)
    const token = '$2y$10$Z3KwJ./v.HhXQ2b0mxkd4efHXYdIHDh5AdiM/lJoTxg5Z3TZnJJNm'
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
     const journey = await axios.get(
       'https://app-dev.digimasia.com/api/public/index.php/journey', config
     );
     console.log(req.data)
    //  console.log(auth)
     console.log(journey.data)
    return view.render('data', {data : req.data})
   }

  async loginDigima({ view }) {
    return view.render('logindigima')
  }

}

module.exports = UserAPIController