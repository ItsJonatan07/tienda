import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://default:GtWLDwtWUtIFOYCDqgicfnLPRlozefqL@yamabiko.proxy.rlwy.net:24604'); // Usar REDIS_URL si está configurada

export default redis;



