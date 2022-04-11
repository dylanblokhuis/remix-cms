import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { hash, genSalt, compare } from "bcrypt"
import { sessionStorage } from "./session.server";
import { db } from "./db.server";
import { UserModel } from "./user.server";

const authenticator = new Authenticator<UserModel>(sessionStorage);
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    if (typeof email !== "string") throw new Error("Invalid email");
    if (typeof password !== "string") throw new Error("Invalid password");

    const user = await login(email, password);
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);

async function generateHash(password: string) {
  const salt = await genSalt(10);
  return hash(password, salt);
}

async function login(email: string, password: string): Promise<UserModel> {
  const user = await db.user.findFirst({
    where: {
      email: email,
    }
  });
  if (!user) throw new Error("Invalid credentials");

  const isSame = compare(password, user.password);
  if (!isSame) throw new Error("Invalid credentials");

  return user;
}

const authService = {
  authenticator,
  generateHash
}

export default authService