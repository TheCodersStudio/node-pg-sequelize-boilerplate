import { promises as fsPromises } from 'fs';
import yaml from 'js-yaml';

import { swaggerSpec } from '../config/swagger-config.js';

export async function generateSpecs() {
  const swaggerYaml = yaml.dump(swaggerSpec);
  await fsPromises.writeFile('./docs//api-specs.yaml', swaggerYaml); // write file asynchronously
}
