 

**Fake Review Detection System 📌**  

## 🌟 Features  
Will be updated soon ! 


## 🛠 Tech Stack  

✅ **Frontend:** Vite + React + Tailwind CSS  
✅ **Backend:** Flask (REST API)  
✅ **Machine Learning:** Scikit-learn (Logistic Regression)  
✅ **Model Storage:** Joblib for saving/loading `.pkl` models  
✅ **Data Processing:** Pandas & NumPy  

---

## 📌 How It Works ?  

1️⃣ **Train the Machine Learning model** using real & fake review datasets.  
2️⃣ **Save the trained model** as `fake_review_model.pkl`.  
3️⃣ **Run the Flask backend server** to expose a REST API.  
4️⃣ **Connect the React frontend** to interact with the API.  
5️⃣ **Upload or enter product reviews** to get authenticity results.  

⚡ **This system empowers consumers to make informed purchasing decisions by identifying fraudulent product reviews!**  

---

## 📂 Project Directory Structure  

```sh
FakeReviewDetector/
│── backend/
│   ├── .venv/                     # Virtual environment (version = 3.13.2) 
│   ├── ml/                        # ML-related scripts and utilities  
│   ├── model/                     # Trained ML models  
│   ├── scraped_files/             # Stores scraped eCommerce reviews  
│   ├── uploads/                   # Stores uploaded files for analysis  
│   ├── utils/                     # Helper functions for backend  
│   ├── app.py                     # Main Flask API file  
│   ├── requirements.txt           # Python dependencies  
│── frontend/
│   ├── node_modules/              # Dependencies for frontend  
│   ├── public/                    # Public assets like index.html  
│   ├── src/                       # React source files  
│   │   ├── components/            # Reusable React components  
│   │   ├── assets/                # Images, icons, etc.  
│   │   ├── utils/                  # Utility functions  
│   ├── .env                        # Environment variables  
│   ├── .gitignore                  # Git ignore file  
│   ├── eslint.config.js            # ESLint configuration  
│   ├── index.html                  # Main HTML file  
│   ├── package.json                # Frontend dependencies  
│   ├── package-lock.json           # Lockfile for package versions  
│   ├── postcss.config.js           # PostCSS configuration  
│   ├── README.md                   # Project documentation  
│   ├── tailwind.config.js          # Tailwind configuration  
│   ├── vite.config.js              # Vite configuration  
```
---
## 📦 Installation & Setup  

### 🔹 Prerequisites  
Ensure you have the following installed on your system:  
- **Python 3.8+**  
- **Node.js & npm**  
- **pip** (Python package manager)
- **Virtual env** (recommanded: use virtual environment if accidently installed requirements globally use "pip uninstall -r requirements.txt -y")

---

### 🔹 Backend Setup (Flask API)  
```sh
# Navigate to the backend folder
cd backend

# Create a virtual environment (optional but recommended)
python -m venv venv
venv/Scripts/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
#[recommanded: use virtual environment if accidently installed requirements globally use "pip uninstall -r requirements.txt -y]

# Run the Flask server
python app.py

```
#### 🚀 Flask API will start at http://127.0.0.1:5000/

### 🔹 Frontend Setup (React + Vite + Tailwind CSS)
```sh
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
#### 🚀 React app will run at http://localhost:5173/
---

### **🚨 Model Upload Restriction  🚨**  

GitHub restricts file uploads to **below 100MB**, so the trained model (`fake_review_model.pk`) could not be uploaded to this repository.  

### **🛠 How to Get the Model?**  

#### **1️⃣ Train Your Own Model**  
- The **training dataset format** is provided in this repository.  
- You can generate your own dataset and train the model using:  
  ```sh
  python train_model.py
  ```
- This script will train the model and generate a new `fake_review_model.pk` file for you.  




## 🔗 Contributing  
Hi I'm Srihari Janardhanan , 
💡 **Want to contribute?** Fork the repo, create a branch, and submit a pull request. I welcome **bug fixes, feature improvements, and optimizations**.  

---

