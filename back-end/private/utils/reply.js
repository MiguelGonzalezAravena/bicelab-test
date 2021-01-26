module.exports =  {
  error: (obj) => {
    return { status: 'ERROR', message: obj };
  },
  ok: (obj) => {
    return { status: 'OK', data: obj };
  }
}