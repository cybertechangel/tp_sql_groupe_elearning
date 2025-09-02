tp_sql_groupe_elearning/
│
├── backend/
│   ├── config/
│   │   └── db.js              # Connexion à MySQL
│   │
│   ├── models/                # Modèles qui représentent les tables
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   └── Review.js
│   │
│   ├── controllers/           # Logique métier
│   │   ├── userController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── reviewController.js
│   │
│   ├── routes/                # Routes API
│   │   ├── userRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   └── reviewRoutes.js
│   │
│   ├── middleware/            # Middleware (auth, validation, etc.)
│   │   └── authMiddleware.js
│   │
│   │
│   ├── app.js                 # Point d'entrée Express
│   └── .env                   # Variables d'environnement (DB, PORT…)
│
├── sql/
│   └── schema.sql            
│
├── package.json
└── README.md
