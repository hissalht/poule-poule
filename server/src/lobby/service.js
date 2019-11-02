import _ from 'lodash'
import { prisma } from '../../generated/prisma-client'
import {genSalt, hash} from 'bcryptjs'

/**
 * @private
 */
class PrismaError extends Error {
  constructor(original) {
    super()
    this.name = 'PrismaError'
    this.result = _.get(original, 'result')
    this.stack = _.get(original, 'stack')
  }
}

/**
 * Wrap a function to transform errors thrown into `PrismaError`.
 * @param {Function} func - Service function to wrap
 * @private
 */
function createServiceFunction(func) {
  return (...args) => {
    return Promise.resolve()
      .then(() => {
        return func(...args)
      })
      .catch(reason => {
        throw new PrismaError(reason)
      })
  }
}

export const deleteLobby = createServiceFunction(id =>
  prisma.deleteLobby({ id })
)

export const createLobby = createServiceFunction((name, password) =>
  prisma.createLobby({ name, password })
)

export const getLobbies = createServiceFunction(() => prisma.lobbies())

export const createUser = createServiceFunction(async (name, password) => {
  const salt = await genSalt(10)
  const passwordHash = await hash(password, salt)
  const user = await prisma.createUser({ name, password: passwordHash })
  return _.omit(user, 'password')
})
