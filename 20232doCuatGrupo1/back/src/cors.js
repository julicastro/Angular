const DIRECTORIO_PERMITIDO_CORS = "http://localhost:4200/";
app.use(cors({
  origin: DIRECTORIO_PERMITIDO_CORS
}));