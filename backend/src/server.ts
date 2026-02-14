import { app } from "./index.js";
import { db } from "./utils/db.js";
import 'dotenv/config'

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


