import bcrypt from 'bcrypt'

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValid = (user, password) => bcrypt.compareSync(password, user.password)