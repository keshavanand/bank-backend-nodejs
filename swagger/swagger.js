import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'yaml';

const swaggerFile = fs.readFileSync("./swagger/swagger.yaml", 'utf8');
const swaggerDocument = yaml.parse(swaggerFile);

export { swaggerUi, swaggerDocument };
