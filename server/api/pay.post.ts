import {Client} from "square";
import {randomUUID} from "crypto";

//@ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};


const config = useRuntimeConfig();

// noinspection JSDeprecatedSymbols
const {paymentsApi} = new Client({
    //@ts-ignore
    accessToken: config.accessToken,
    //@ts-ignore
    environment: "production",
});

export default defineEventHandler(async (event) => {
    const {locationId, sourceId, amountMoney} = await readBody(event);
    
    // Validate required fields
    if (!locationId || !sourceId || !amountMoney) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required payment parameters'
        });
    }
    
    // Check if access token is configured
    if (!config.accessToken) {
        console.error('Square access token not configured');
        throw createError({
            statusCode: 500,
            statusMessage: 'Payment service not properly configured'
        });
    }
    
    try {
        console.log('Creating payment with:', { locationId, sourceId, amountMoney });
        const {result} = await paymentsApi.createPayment({
            locationId,
            sourceId,
            idempotencyKey: randomUUID(),
            amountMoney
        });
        console.log('Payment result:', result);
        return result;
    } catch (error) {
        console.error('Square payment error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Payment processing failed',
            data: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
