import Script from "next/script"

export const UmamiAnalytics = () => {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  if (!websiteId) {
    return <></>
  }
  return <Script async src="https://umami.hjdarnel.dev/script.js" data-website-id={websiteId} />
}

export default UmamiAnalytics
