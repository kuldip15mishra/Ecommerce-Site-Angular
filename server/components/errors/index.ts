/**
 * Error responses
 */

'use strict';

module.exports[404] = function pageNotFound(req, res) {
  let viewFilePath = '404';
  let statusCode = 404;
  let result = {
    status: statusCode
  };

  res.status(result.status);
  res.render(viewFilePath, {}, function(err, html) {
    if(err) {
      return res.status(result.status).json(result);
    }

    res.send(html);
  });
};
