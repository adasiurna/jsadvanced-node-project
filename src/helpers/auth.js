//auth0 middleware config
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'localhost:2000',
  issuer: `https://dev-i2jeb8gg.eu.auth0.com/`,
  algorithms: ['RS256']
});


// const removerCars = jwtAuthz([ 'read:messages' ]);
// const createCar = jwtAuthz([ 'read:messages' ]);
// const readCar = jwtAuthz([ 'read:messages' ]);  blogai

const user = ['read:cars', 'read:books'];
const admin = [...user, 'remove:cars', 'create:books'];

const userScopes = jwtAuthz(user);
const adminScopes = jwtAuthz(admin);

// export default checkJwt;  - neveikia ;(
module.exports = { checkJwt, userScopes, adminScopes };