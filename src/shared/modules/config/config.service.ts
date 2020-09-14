import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
    [key: string]: string;
}

export class ConfigService {
    private envConfig: EnvConfig;
    private envSchema: Joi.ObjectSchema = Joi.object({
        NODE_ENV: Joi.string().default('development'),
        PORT: Joi.number().default(4000),
        SECRET: Joi.string(),

        MYSQL_HOST: Joi.string().default('localhost'),
        MYSQL_PORT: Joi.number().default(3306),
        MYSQL_DATABASE: Joi.string(),
        MYSQL_USERNAME: Joi.string(),
        MYSQL_PASSWORD: Joi.string(),

        REDIS_HOST: Joi.string(),
        REDIS_PORT: Joi.string(),
    });

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config, this.envSchema);
        this.envConfig = config;
    }

    get env(): string {
        return this.envConfig.NODE_ENV;
    }

    get port(): number {
        return Number(this.envConfig.PORT);
    }

    get restSecret(): string {
        return this.envConfig.SECRET;
    }

    get mysqlHost(): string {
        return this.envConfig.MYSQL_HOST;
    }

    get mysqlPort(): number {
        return Number(this.envConfig.MYSQL_PORT);
    }

    get mysqlDatabase(): string {
        return this.envConfig.MYSQL_DATABASE;
    }

    get mysqlUsername(): string {
        return this.envConfig.MYSQL_USERNAME;
    }

    get mysqlPassword(): string {
        return this.envConfig.MYSQL_PASSWORD;
    }

    get redisHost(): string {
        return this.envConfig.REDIS_HOST;
    }

    get redisPort(): number {
        return Number(this.envConfig.REDIS_PORT);
    }

    private validateInput(envConfig: EnvConfig, envSchema): EnvConfig {
        const { error, value: validated } = envSchema.validate(envConfig);

        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }

        return validated;
    }
}
