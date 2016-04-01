import config from '../config'
import { get, put } from '../utils/cruder'
import { OAuth } from 'oauthio-web' // window/document undefined error

/**
 * @description Authenticate using a token generated from the server (so server and client are both aware of auth state)
 */
export const authWithProvider = provider =>
  get(`${config.tessellateRoot}/stateToken`)()
    .then(params => {
      if (!config.oauthioKey) return Promise.reject({ message: 'OAuthio key is required ' })
      OAuth.initialize(config.oauthioKey)
      OAuth
        .popup(provider, { state: params.token })
        .done(result =>
          put(`${config.tessellateRoot}/auth`,
            { provider, code: result.code, stateToken: params.token }
          )()
        )
          .fail(error => Promise.reject(error))
    })
      .catch(error => Promise.reject(error))
