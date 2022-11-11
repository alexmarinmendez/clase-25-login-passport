import passport from "passport";
import local from "passport-local"
import { users } from "./models/User.js";
import { createHash, isValid } from './utils.js'

const LocalStrategy = local.Strategy

export const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true },
            async (req, username, password, done) => {
                try {
                    let user = await users.findOne({ username: username })
                    if (user) return done(null, false) //error, data
                    const newUser = {
                        username,
                        password: createHash(password),
                        email: req.body.email,
                        fname: req.body.fname,
                        lname: req.body.lname,
                        address: req.body.address,
                        age: req.body.age
                    }
                    try {
                        let result = await users.create(newUser)
                        return done(null, result)
                    } catch (err) {
                        done(err)
                    }
                } catch(err) {
                    done(err)
                }
            }
        )
    )


    passport.use(
        'login',
        new LocalStrategy(
            async(username, password, done) => {
                try {
                    let user = await users.findOne({ username: username })
                    if (!user) return done(null, false)
                    if (!isValid(user, password)) return done(null, false)
                    return done(null, user)
                } catch(err) {
                    done(err)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        users.findById(id, done)
    })

}