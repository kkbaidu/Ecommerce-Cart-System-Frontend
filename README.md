# 🛒 E-Commerce Cart System (Frontend)

This is the **frontend** of an e-commerce cart system built with **React (Create React App)** and **Zustand** for state management. It allows users to browse products, add them to a cart, and persist cart data before syncing with the backend. It allows users to browse products, add them to a cart, and persist cart data before syncing with the backend.

When a user first visits the site, a unique user ID is automatically generated and stored locally. If the user has visited before, their existing user ID is retrieved from local storage. This user ID is linked to the user's cart, ensuring that when they revisit the site, their cart is automatically retrieved from the database.

---

## 🚀 Features
- 📦 **Product Listing**: Fetches product data from an API and displays it.  
- 🛍 **Shopping Cart**: Add, update, and remove items.  
- 🔄 **Persistent Cart**: Cart data is saved in `sessionStorage` before syncing with the backend.  
- ⚡ **State Management**: Uses **Zustand** for a simple and efficient global state.  
- 🎨 **Loading Skeleton**: Displays a skeleton loader while fetching product data.  

---

## 🛠 Tech Stack
- **React (Create React App)**
- **TypeScript**
- **Zustand (State Management)**
- **Axios (API Requests)**
- **Tailwind CSS (Styling)**  

---

## 📥 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/kkbaidu/Ecommerce-Cart-System-Frontend.git
cd Ecommerce-Cart-System-Frontend
npm install
npm run start
```
