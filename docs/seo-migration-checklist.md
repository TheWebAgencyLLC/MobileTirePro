# SEO Migration Checklist — Proline Wheel & Tire

Complete these steps **after** the site is deployed with the new domain and 301 redirects are live.

## 1. Verify redirects

- [ ] Visit `http://mobiletirepro.net/` — first redirect must go **directly** to `https://www.prolinewheelandtire.com/` (not `https://mobiletirepro.net/` first)
- [ ] Visit `https://mobiletirepro.net/about` — should 301 to `https://www.prolinewheelandtire.com/about`
- [ ] Visit `https://www.mobiletirepro.net/bookings` — should 301 to `https://www.prolinewheelandtire.com/bookings`
- [ ] Visit `https://prolinewheelandtire.com` — should 301 to `https://www.prolinewheelandtire.com`

## 2. Google Search Console

- [ ] Add a property for `https://www.prolinewheelandtire.com`
- [ ] (Recommended) Also add a **Domain** property for `prolinewheelandtire.com` via DNS — works better for Change of Address from `sc-domain:mobiletirepro.net`
- [ ] Keep the existing `mobiletirepro.net` property active during the transition
- [ ] In the **old** property: Settings → **Change of address** → select the new property (only after redirects are confirmed — especially `http://mobiletirepro.net/`)
- [ ] Submit sitemap: `https://www.prolinewheelandtire.com/sitemap.xml`
- [ ] Monitor Coverage and Page indexing reports for 4–8 weeks

## 3. Google Business Profile

- [ ] Update website URL to `https://www.prolinewheelandtire.com`
- [ ] Confirm business name is **Proline Wheel & Tire** (NAP matches site footer and schema)

## 4. Netlify domain settings

- [ ] Add `prolinewheelandtire.com` and `www.prolinewheelandtire.com` to the Netlify site
- [ ] Set **primary domain** to `www.prolinewheelandtire.com` (critical — if primary is the apex, you get `ERR_TOO_MANY_REDIRECTS`)
- [ ] Do **not** add apex→www rules in `_redirects`; Netlify handles that when primary is www
- [ ] Keep `mobiletirepro.net` attached (legacy redirects are in `public/_redirects`)
- [ ] Confirm HTTPS/SSL is active on both domains

## 5. Analytics (GTM)

- [ ] Confirm GTM container `GTM-N9TR8WBG` loads on production only
- [ ] In GTM, create triggers/tags for new custom events:
  - `phone_click`
  - `schedule_click`
  - `mobile_nav_open`
  - `booking_step`
  - `payment_success`
  - `booking_complete`
- [ ] Mark `booking_complete` and `payment_success` as GA4 conversions

## 6. Ongoing monitoring

- [ ] Check GSC for 404 errors on old URLs
- [ ] Update any external listings (social bios, directories) to the new URL
- [ ] Keep `mobiletirepro.net` registered and redirecting for at least 12 months
