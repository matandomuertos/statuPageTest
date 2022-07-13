//Custom error Handler, not much sense here but it's to show more details if the deployment is dev and don't show much if it's prod

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500 //set http code if it's set or 500 if it's not set

  res.status(statusCode)

  res.json({
    message: err.message, //print the standard error message
    stack: process.env.NODE_ENV === 'prod' ? null : err.stack, //print whole error stack if it's not prod
  })
}

module.exports = { //export the function
  errorHandler,
}