# Fix: "Unable to connect to the database" (ECONNREFUSED)

This error means the **backend cannot reach PostgreSQL**. Do the following:

---

## 1. Install PostgreSQL (if not installed)

- **Windows:** Download from https://www.postgresql.org/download/windows/ and run the installer. Remember the **password** you set for the `postgres` user.
- **Or use Docker:** `docker run -d --name houznext-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=houznext -p 5432:5432 postgres:15`

---

## 2. Start PostgreSQL

- **Windows (installed):** Open **Services**, find **postgresql-x64-15** (or your version), start it. Or from a terminal: `pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start` (path may vary).
- **Docker:** Container should be running after `docker run` above.

---

## 3. Create the backend env file

In the backend folder create (or edit) **`.env.development`**:

**Path:** `c:\Users\katra\OneDrive\Desktop\houznext\DC-backend-master\DC-backend-master\.env.development`

**Contents (adjust username/password/database if needed):**

```
POSTGRES_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/houznext
```

- Replace **YOUR_PASSWORD** with your PostgreSQL user password.
- Replace **houznext** with your database name (create it first – see below).
- If your PostgreSQL user is different (e.g. `admin`), use: `postgresql://admin:YOUR_PASSWORD@localhost:5432/houznext`

---

## 4. Create the database (if it doesn’t exist)

**Option A – Command line (if `psql` is in PATH):**
```powershell
psql -U postgres -c "CREATE DATABASE houznext;"
```
(Enter your postgres password when prompted.)

**Option B – pgAdmin:**  
Right‑click **Databases** → **Create** → **Database** → name: **houznext** → Save.

**Option C – SQL Shell (psql) from Start Menu:**  
Run `psql -U postgres`, then:
```sql
CREATE DATABASE houznext;
\q
```

---

## 5. Run the backend again

```powershell
cd c:\Users\katra\OneDrive\Desktop\houznext\DC-backend-master\DC-backend-master
npm run start:dev
```

You should see **"Nest application successfully started"** instead of the connection error.

---

## Quick checklist

- [ ] PostgreSQL is **installed**
- [ ] PostgreSQL **service** is **running**
- [ ] Database **houznext** (or the name in your URL) **exists**
- [ ] File **`.env.development`** exists in the backend folder with **POSTGRES_URL** set correctly
