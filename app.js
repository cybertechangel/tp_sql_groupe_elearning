import 'dotenv/config';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/courses", courseRoutes);

app.use((req, res) => res.status(404).json({ error: 'Non trouvé' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
