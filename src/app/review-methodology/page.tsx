import type { Metadata } from "next";
import { StandardPage } from "@/components/StandardPage";

export const metadata: Metadata = { title: "Review Methodology", alternates: { canonical: "/review-methodology" } };

export default function ReviewMethodologyPage() {
  return (
    <StandardPage eyebrow="Standards" title="Review Methodology" description="What our scores mean and how reviews are researched.">
      <h2>What the score means</h2>
      <p>Every review carries a score out of 10. It is a weighted judgement across five criteria: fees and pricing (25%), security and trustworthiness (25%), usability for UK users (20%), features and performance (20%), and customer support (10%). A 7/10 is a genuinely good product with real drawbacks — we do not grade on a curve of praise.</p>
      <h2>Hands-on vs research-based</h2>
      <p>Where we have used a product directly, the review says so, including how long we used it and when. Where a review is research-based — built from documentation, fee schedules, user reports, and regulator records — we state that too. We never imply first-hand testing that did not happen.</p>
      <h2>UK relevance</h2>
      <p>Every financial product review checks FCA registration status, GBP support, UK payment methods, and UK customer support availability. A product that is excellent elsewhere but poor for UK users is scored for UK users.</p>
      <h2>Affiliate relationships</h2>
      <p>Some reviewed products pay us a commission on sign-ups; many do not. Commissions never affect scores, and every review lists cons. Our <a href="/affiliate-disclosure/">affiliate disclosure</a> covers this in full.</p>
      <h2>Updates</h2>
      <p>Fees, features, and regulation change. We refresh reviews when material facts change, and mark significant updates with the date they were made. If you spot something out of date, email <a href="mailto:contact@digitechlifestyle.com?subject=Review%20update">contact@digitechlifestyle.com</a>.</p>
    </StandardPage>
  );
}
