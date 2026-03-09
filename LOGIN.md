# Houznext – Login troubleshooting

## Why you see "Invalid credentials"

The message usually means one of the following:

1. **User does not exist** – The email is not in the database. You must run the **admin seed** so the user is created.
2. **Wrong password** – The password does not match the one stored for that email.
3. **Backend not running** – The admin app calls `http://localhost:4400/users/login-user`. If the backend is not running, the request fails and you get a login error (you may now see: *"Could not reach server. Is the backend running on port 4400?"*).
4. **Wrong API URL** – Admin uses `NEXT_PUBLIC_LOCAL_API_ENDPOINT` from `env/dev.env`. It must be `http://localhost:4400` (or your backend URL).

---

## Fix: use the correct credentials and seed

**Default admin (after seed):**

- **Email:** `vinaynenavath758@gmail.com`
- **Password:** `Vinay@23043`

**Steps:**

1. **Start the backend** (required for login):
   ```powershell
   cd c:\Users\katra\OneDrive\Desktop\houznext\DC-backend-master\DC-backend-master
   npm run start:dev
   ```
   Wait until you see something like: `Nest application successfully started`.

2. **Create/update the admin user** (run in a **new** terminal, same folder):

   **Option A – Using seed script (recommended):**
   ```powershell
   cd c:\Users\katra\OneDrive\Desktop\houznext\DC-backend-master\DC-backend-master
   npm run seed:admin
   ```
   If that fails with `cross-env` or `ts-node` errors, use Option B.

   **Option B – Using compiled seed (after build):**
   ```powershell
   cd c:\Users\katra\OneDrive\Desktop\houznext\DC-backend-master\DC-backend-master
   npm run build
   $env:NODE_ENV="development"; node dist/scripts/seed-admin.js
   ```
   You should see: `Email: vinaynenavath758@gmail.com`, `Password: Vinay@23043`, `Seed complete`.

3. **Start the admin app** (if not already running):
   ```powershell
   cd c:\Users\katra\OneDrive\Desktop\houznext\houznext_Admin\houznext_Admin
   npm run dev
   ```

4. Open **http://localhost:3001**, sign in with the email and password above.

---

## Database

The seed and login use your **backend database** (e.g. PostgreSQL). Ensure:

- The backend `.env.development` (or the env file you use) has the correct `DATABASE_URL`.
- Migrations have been run so the `user` table and related tables exist.

If the database is empty or migrations were never run, run migrations first, then run `npm run seed:admin`.
