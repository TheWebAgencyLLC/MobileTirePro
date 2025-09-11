<script setup lang="ts">
onMounted(async () => {
  loading.value = true;
  await initializePaymentForm();
  await initializeGooglePay()
  loading.value = false;

});

const {price} = defineProps(['price'])

const emit = defineEmits(['payment'])

const resetProcessing = () => {
  isProcessing.value = false;
  paymentStatus.value = "";
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

console.log(price)


function buildPaymentRequest(payments) {
  return payments.paymentRequest({
    countryCode: 'US',
    currencyCode: 'USD',
    total: {
      amount: price.toString(),
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
  console.warn('handlePaymentMethodSubmission')
  if (isProcessing.value) return;
  console.warn('STARTING')
  isProcessing.value = true;
  paymentStatus.value = "";
  const token = await tokenize(card);
  const {data, error} = await useFetch("/api/pay", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      locationId,
      sourceId: token,
      amountMoney: {
        amount: (parseInt(price) * 100).toString(),
        currency: "USD"
      }
    },
  });
  if (!error.value) {
    paymentStatus.value = "Payment completed, creating appointment...";
    emit('payment')
    // Keep isProcessing true - parent component will handle completion
  } else {
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
    const {error} = await useFetch("/api/pay", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: {
        locationId,
        sourceId: token,
        amountMoney: {
          amount: (parseInt(price) * 100).toString(),
          currency: "USD"
        }
      },
    });
    if (!error.value) {
      paymentStatus.value = "Payment completed, creating appointment...";
      emit('payment')
      // Keep isProcessing true - parent component will handle completion
    } else {
      paymentStatus.value = "Payment failed";
      isProcessing.value = false;
    }
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
