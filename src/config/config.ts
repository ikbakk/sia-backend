import Joi from 'joi';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .required(),
    PORT: Joi.number().default(3001),
    DATABASE_URL: Joi.string().required(),
    API_KEY_TOKEN: Joi.string().required(),
  })
  .unknown(true);

const { value: envVars, error } = envSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  apiKeyToken: envVars.API_KEY_TOKEN,
};
