## **Quick Setup and Execution Guide**

### **Prerequisites**

1. **Node.js** (v18 or higher)
   - Check the installed version with:  
     ```bash
     node -v
     ```
   - If you don't have the correct version, install it from [nodejs.org](https://nodejs.org/).

2. **PNPM** (Dependency manager used by this project)
   - Install it globally with:  
     ```bash
     npm install -g pnpm
     ```
   - Verify the installation with:  
     ```bash
     pnpm -v
     ```
---

### **Steps to Run the Project**

1. **Clone the repository:**

   Clone the repository and navigate into the project directory:

   ```bash
   git clone https://github.com/franmc01/francisco-marin.git
   cd francisco-marin
   ```

2. **Install dependencies:**

   Install the project dependencies with:

   ```bash
   pnpm install
   ```

---

### **Running the Project**

1. **Start the backend first:**

   Run the backend with:

   ```bash
   pnpm --filter {backend} run start:dev
   ```

2. **Start the frontend after the backend:**

   Once the backend is running, start the frontend with:

   ```bash
   pnpm run start
   ```

---

### **Access the Application**

- **Frontend**: [http://localhost:4200](http://localhost:4200) (or the configured port)
- **Backend**: [http://localhost:3200](http://localhost:3200) (or the configured port)

---
