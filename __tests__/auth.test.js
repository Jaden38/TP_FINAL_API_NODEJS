const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');
const dotenv = require('dotenv');

dotenv.config(); // Charge les variables d'environnement

describe('authenticateToken middleware', () => {
  it('should call next if token is valid', () => {
    const req = {
      headers: {
        authorization: `Bearer ${jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET)}`
      }
    };
    const res = {};
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should send 401 if no token is provided', () => {
    const req = { headers: {} };
    const res = { sendStatus: jest.fn() };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('should send 403 if token is invalid', () => {
    const req = {
      headers: {
        authorization: 'Bearer invalidtoken'
      }
    };
    const res = { sendStatus: jest.fn() };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
