# How to Run Houznext – View the Website

**Prerequisite:** The backend uses **PostgreSQL**. If you see *"Unable to connect to the database"* or *ECONNREFUSED*, follow **[DC-backend-master/DC-backend-master/DATABASE-SETUP.md](DC-backend-master/DC-backend-master/DATABASE-SETUP.md)** to install PostgreSQL, create the database, and add a `.env.development` file with `POSTGRES_URL`.

---

Follow these steps in order. Use **3 separate terminals** (or 2 if you skip the admin).

---

## Step 1: Start the Backend (required for login & data)

1. Open **Terminal / PowerShell** (first window).
2. Run:

```powershell
cd c:\Users\katra\OneDrive\Desktop\houznext\DC-backend-master\DC-backend-master
npm run start:dev
```

3. Wait until you see: **"Nest application successfully started"** or **"Listening on port 4400"**.
4. Leave this terminal **open**. The backend runs on **http://localhost:4400**.

---

## Step 2: Start the Customer Website (main site)

1. Open a **second** Terminal / PowerShell.
2. Run:

```powershell
cd c:\Users\katra\OneDrive\Desktop\houznext\dreamcasaWeb-master\dreamcasaWeb-master
npm run dev
```

3. Wait until you see: **"Ready in ..."** or **"Local: http://localhost:3000"**.
4. Leave this terminal **open**.
5. **Open your browser** and go to: **http://localhost:3000**

You should see the **Houznext customer site** (Interiors, Cost Calculator, Contact, Login).

---

## Step 3: Start the Admin Website (optional)

1. Open a **third** Terminal / PowerShell.
2. Run:

```powershell
cd c:\Users\katra\OneDrive\Desktop\houznext\houznext_Admin\houznext_Admin
npm run dev
```

3. Wait until you see: **"Ready in ..."** or **"Local: http://localhost:3001"**.
4. Leave this terminal **open**.
5. **Open your browser** and go to: **http://localhost:3001**
6. Log in with:
   - **Email:** vinaynenavath758@gmail.com  
   - **Password:** Vinay@23043  

You should see the **admin dashboard** (CRM, Cost Estimator, Invoice, Interior Progress).

---

## Summary – What to open in the browser

| What you want to view | URL to open |
|------------------------|-------------|
| **Customer website** (Interiors, Calculator, Login) | **http://localhost:3000** |
| **Admin** (Dashboard, CRM, etc.) | **http://localhost:3001** |

---

## If a port is already in use

- If **3000** is in use, the customer site may run on **3002** or another port – check the terminal output for the exact URL (e.g. `Local: http://localhost:3002`).
- If **3001** is in use, close the other app using it, or the admin will show an error. Then run the admin again.

---

## First time only (if needed)

If you get errors about missing packages, run **once** in each project folder:

```powershell
npm install
```

Then run the steps above again.
