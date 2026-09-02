<script setup lang="ts">
const { price } = defineProps(['price'])

const emit = defineEmits(['payment'])

const loadSquareScript = () =>
  new Promise<void>((resolve, reject) => {
    if (typeof Square !== 'undefined') {
      resolve()
      return
    }

    const existing = document.querySelector('script[data-square-sdk]')
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Square.js failed to load')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = useRuntimeConfig().public.squareEnvironment === 'sandbox'
      ? 'https://sandbox.web.squarecdn.com/v1/square.js'
      : 'https://web.squarecdn.com/v1/square.js'
    script.async = true
    script.dataset.squareSdk = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Square.js failed to load'))
    document.head.appendChild(script)
  })

const resetProcessing = (message = "") => {
  isProcessing.value = false;
  paymentStatus.value = message;
}

defineExpose({
  resetProcessing
})

const config = useRuntimeConfig();
const appId = config.public.squareAppId//'sandbox-sq0idb-kSqCFhDPPZCfcIm56q8bWQ';
const locationId = config.public.locationId //'LHM72HAD1BSB2';
let card;
let paymentStatus = ref("");
let loading = ref(false);

const isProcessing = ref(false)

// The card is only tokenized here — the server charges it as part of creating the
// appointment, so a payment can never succeed without a booking to match it.

onMounted(async () => {
  loading.value = true;
  try {
    await loadSquareScript()
    await initializePaymentForm();
    await initializeGooglePay()
  } catch (error) {
    console.error(error)
    paymentStatus.value = 'Payment form failed to load'
  } finally {
    loading.value = false;
  }
});


function buildPaymentRequest(payments) {
  return payments.paymentRequest({
    countryCode: 'US',
    currencyCode: 'USD',
    total: {
      amount: Number(price).toFixed(2),
      label: 'Total',
    },
  });
}

const initializeGooglePay = async () => {
  if (!Square) {
    throw new Error("Square.js failed to load properly");
  }
  const payments = Square.payments(appId, locationId);
  try {
    const paymentRequest = buildPaymentRequest(payments)
    const googlePay = await payments.googlePay(paymentRequest);
    await googlePay.attach('#google-pay-button', {
      buttonSizeMode: 'fill',
      buttonType: 'long'
    });
    const googlePayButton = document.getElementById('google-pay-button');
    googlePayButton.onclick = async () => {
      await handleGooglePaySubmission(googlePay)
    }
  } catch (e) {
    console.error("Initializing Card failed", e);
    return;
  }
}

const initializePaymentForm = async () => {
  if (!Square) {
    throw new Error("Square.js failed to load properly");
  }
  const payments = Square.payments(appId, locationId);
  try {
    card = await payments.card();
    await card.attach("#card-container");
  } catch (e) {
    console.error("Initializing Card failed", e);
    return;
  }
};

const tokenize = async (paymentMethod) => {
  // console.log(paymentMethod)
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === "OK") {
    return tokenResult.token;
  } else {
    let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
    }
    throw new Error(errorMessage);
  }
}

const handlePaymentMethodSubmission = async () => {
  if (isProcessing.value) return;
  isProcessing.value = true;
  try {
    paymentStatus.value = "";
    const token = await tokenize(card);
    paymentStatus.value = "Processing payment...";
    emit('payment', { token, method: 'card' })
    // Keep isProcessing true - parent component will handle completion
  } catch (e) {
    console.error(e)
    paymentStatus.value = "Payment failed";
    isProcessing.value = false;
  }
};

const handleGooglePaySubmission = async (googlePay) => {
  if (isProcessing.value) return;
  isProcessing.value = true;
  try {
    paymentStatus.value = "";
    const token = await tokenize(googlePay);
    paymentStatus.value = "Processing payment...";
    emit('payment', { token, method: 'google_pay' })
    // Keep isProcessing true - parent component will handle completion
  } catch (e) {
    console.error(e)
    paymentStatus.value = "Payment failed";
    isProcessing.value = false;
  }
};
</script>

<template>
  <div>
    <div class="w-full bg-dark-charcoal p-4 rounded-lg">
      <form class="space-y-2.5" @submit.prevent="handlePaymentMethodSubmission">
        <div v-if="loading">Loading...</div>
        <div id="card-container"/>
        <button :disabled="isProcessing">Pay ${{ price }}</button>
        <div class="w-full" id="google-pay-button"></div>
      </form>
      <div v-if="paymentStatus" id="payment-status-container">
        {{ paymentStatus }}
      </div>
      <div class="w-full text-white italic text-center mt-2">
        Payments protected by Square
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  color: #ffffff;
  background-color: #006aff;
  border-radius: 6px;
  cursor: pointer;
  border-style: none;
  font-size: 16px;
  line-height: 24px;
  padding: 12px 16px;
  width: 100%;
}

button:hover {
  background-color: #005fe5;
}

button:active {
  background-color: #0055cc;
}

button:disabled {
  background-color: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.3);
}

#payment-status-container {
  width: fit-content;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  background: #1a1a1a;
  display: flex;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 36px;
}
</style>
