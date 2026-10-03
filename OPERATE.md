# PRAXIS Operations Manual & Run Guide

This guide provides clear, step-by-step instructions to run the frontend, run the backend, access the local endpoints, and push the repository to GitHub.

---

## 🔗 Quick Access Localhost Links

When the development servers are running:
* **Frontend Web Application:**  
  👉 [http://localhost:5173](http://localhost:5173)
* **Backend API Health Check:**  
  👉 [http://localhost:5000/api/health](http://localhost:5000/api/health)
* **Admin Login Portal:**  
  👉 [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## ⚡ How to Run the Applications

Open PowerShell or your preferred terminal in the project root (`d:\projects\PRAXIS-CLUD`):

### Option 1: Run from the Root Workspace (Recommended)

1. **Install all dependencies:**
   ```powershell
   npm run install:all
   ```

2. **Start the Backend API Server (Port 5000):**
   ```powershell
   npm run dev:backend
   ```

3. **Start the Frontend Vite Client (Port 5173) in a second terminal:**
   ```powershell
   npm run dev:frontend
   ```

---

### Option 2: Run Separately in Each Directory

#### To run the Backend:
```powershell
cd d:\projects\PRAXIS-CLUD\backend
npm start
```
*The backend server will run on `http://localhost:5000`.*  
*(Note: If `MONGODB_URI` is not set in `backend/.env`, it automatically uses the resilient in-memory storage mode with full seed data).*

#### To run the Frontend:
```powershell
cd d:\projects\PRAXIS-CLUD\frontend
npm run dev
```
*The frontend Vite dev server will run on `http://localhost:5173`.*

---

## 🔐 Administrative Console Credentials

Go to [http://localhost:5173/admin/login](http://localhost:5173/admin/login) or use the footer **Portal** link.

| Account Type | Username | Password | Permitted Actions |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin` | `password` | Full management: administrators, clubs, events, gallery, circulars, settings |
| **Faculty Admin**| `facultyadmin`| `password` | Manage all clubs, events, gallery, leadership, announcements |
| **Club Admin**   | `genesisadmin`| `password` | Manage **Genesis** chapter only (events, gallery, coordinators) |

*Tip: The login page includes one-click buttons to auto-fill these demo credentials.*

---

## 🛠️ Building for Production

To create an optimized production bundle of the frontend:
```powershell
cd d:\projects\PRAXIS-CLUD\frontend
npm run build
```
The compiled output is saved to `frontend/dist/`.

---

## 🚀 How to Create a GitHub Personal Access Token (PAT) and Push

Because your local Git credential manager was authenticated under your personal account (`chittimillaanirudh-png`), GitHub rejected the push to the organization repo `SREEDATTA-SDES/PRAXIS-CLUB` with HTTP 403.

Follow these simple steps to generate a PAT and push immediately:

### Step 1: Generate the GitHub Personal Access Token (PAT)
1. Open your browser and go to:  
   👉 **[https://github.com/settings/tokens](https://github.com/settings/tokens)**
2. Click **Generate new token** &rarr; select **Generate new token (classic)**.
3. In the **Note** box, enter: `PRAXIS-SDES-PUSH`.
4. Under **Expiration**, select `30 days` or `No expiration`.
5. Under **Select scopes**, check the box for:
   - ✅ **`repo`** *(Full control of private repositories)*
6. Scroll to the bottom and click the green button: **Generate token**.
7. **Copy your token immediately** (it looks like `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx`).

---

### Step 2: Push Using Your Token

Open PowerShell in `d:\projects\PRAXIS-CLUD` and run the following two commands (replace `<YOUR_GITHUB_TOKEN>` with the token you copied):

```powershell
# 1. Update the remote URL with your token
git remote set-url origin https://<YOUR_GITHUB_TOKEN>@github.com/SREEDATTA-SDES/PRAXIS-CLUB.git

# 2. Push to the main branch
git push -u origin main
```

---

### Alternative: Add Collaborator Access (No Token Needed)
If you own or manage the `SREEDATTA-SDES` organization:
1. Go to:  
   👉 **[https://github.com/SREEDATTA-SDES/PRAXIS-CLUB/settings/access](https://github.com/SREEDATTA-SDES/PRAXIS-CLUB/settings/access)**
2. Click **Add people** and invite `chittimillaanirudh-png` with **Write** or **Admin** role.
3. Then simply run:
   ```powershell
   git push -u origin main
   ```
