'use strict'

class DashboardController {

  index({ view, auth }) {
    // console.log("sini")
    const user = auth.user.toJSON()
    return view.render('dashboard', { user: user })
  }

}

module.exports = DashboardController