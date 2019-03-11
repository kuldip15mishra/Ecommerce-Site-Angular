import BaseCtrl from './../base';
import Config from './../../config';
let config = new Config();

export default class EmailCtrl extends BaseCtrl {
  model = '';
  contactUs = (req, res) => {
    req.body.to = config.CONTACT_US_EMAIL;
    this.email(req.body)
    res.status(200).json({ message: 'Contact email sent successfully' });
  }
}

