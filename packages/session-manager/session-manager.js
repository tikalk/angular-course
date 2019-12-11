import cookieParser from 'cookie-parser';
export function createToken() {
    const rand = function () {
        return Math.random().toString(36).substr(2); // remove `0.`
    };

    const token = function () {
        return rand() + rand(); // to make it longer
    };

    return token();
}


const sessions = {};

export const timeout = +process.env.sessionTimeout || 10000000;

export function getSessionByToken(token) {
    const session = sessions[token];
    if (session) {
        if (Date.now() > session.lastAccessed + timeout) {
            delete session[token];
            return null;
        }
        session.lastAccessed = Date.now();
    }
    return session || null;
}

export function createSession() {

    let newToken = createToken();
    while (sessions[newToken]) {
        newToken = createToken();
    }

    const newSession = {token: newToken, lastAccessed: Date.now()};


    sessions[newSession.token] = newSession;

    return newSession;
}
const sessionCookie = 'SESSION_COOKIE';
export const clearSession = (req, res) => {
    const token = req.cookies[sessionCookie];
    delete sessions[token];
    res.cookie(sessionCookie, null)
}

export const sessionMiddleware = () => {
 //   this.use(cookieParser());

    return cookieParser(),  (req, res, next) => {



        const token = req.cookies[sessionCookie];

        let currentSession = getSessionByToken(token);

        if (!currentSession) {
            const newSession = createSession();
            res.cookie(sessionCookie, newSession.token, {maxAge: timeout, httpOnly: true})
            currentSession = newSession;

        }
        req.session = currentSession;

        next();
    };
}

