# Run Admin + Website and Login Without Error

Do these steps **in order** in **3 separate terminals**. Leave each running.

---

## Step 1: Start the backend (required for login)

**Terminal 1:**

```powershell
cd c:\Users\katra\OneDrive\Desktop\houznext\DC-backend-master\DC-backend-master
npm run start:dev
```

- Wait until you see **"Nest application successfully started"**.
- If you see **"Unable to connect to the database"**: PostgreSQL must be running and the `houznext` database must exist. See **DATABASE-SETUP.md** in the backend folder.
- **Leave this terminal open.**

---

## Step 2: Start the customer website

**Terminal 2:**

```powershell
cd c:\Users\katra\OneDrive\Desktop\houznext\dreamcasaWeb-master\dreamcasaWeb-master
npm run dev
```

- Wait until you see **"Ready"** and **http://localhost:3000**.
- **Leave this terminal open.**
- Open in browser: **http://localhost:3000** (customer site).

---

## Step 3: Start the admin

**Terminal 3:**

```powershell
cd c:\Users\katra\OneDrive\Desktop\houznext\houznext_Admin\houznext_Admin
npm run dev
```

- Wait until you see **"Ready"** and **http://localhost:3001**.
- **Leave this terminal open.**
- Open in browser: **http://localhost:3001** (admin login page).

---

## Step 4: Log in to admin (no error)

1. In the browser go to: **http://localhost:3001**
2. Enter:
   - **Email:** `vinaynenavath758@gmail.com`
   - **Password:** `Vinay@23043`
3. Click **Sign in**.

You should be redirected to the **admin dashboard** (CRM, Cost Estimator, Invoice, Interior Progress) with no error.

---

## If login still shows an error

| Error | What to do |
|-------|------------|
| **Invalid email or password** | Run the admin seed so this user exists: in backend folder run `npm run seed:admin` (see LOGIN.md). |
| **Could not reach server / Failed to parse URL** | Backend must be running (Step 1). Confirm you see "Nest application successfully started" in Terminal 1. |
| **Port 3001 already in use** | Close the other app using port 3001, or stop that process, then run the admin again (Step 3). |

---

## Summary

1. **Terminal 1:** Backend (`npm run start:dev`) → wait for "successfully started".
2. **Terminal 2:** Customer site (`npm run dev`) → **http://localhost:3000**.
3. **Terminal 3:** Admin (`npm run dev`) → **http://localhost:3001**.
4. **Browser:** Open **http://localhost:3001** → login with **vinaynenavath758@gmail.com** / **Vinay@23043** → dashboard.

All three must be running for admin login to work without error.
