import type { Metadata } from "next";
import { StandardPage } from "@/components/StandardPage";

export const metadata: Metadata = { title: "Editorial Policy", alternates: { canonical: "/editorial-policy" } };

export default function EditorialPolicyPage() {
  return (
    <StandardPage eyebrow="Standards" title="Editorial Policy" description="How DigiTech Lifestyle chooses, researches, and publishes content.">
      <h2>Independence</h2>
      <p>Advertisers and affiliate partners have no influence over what we cover, what we conclude, or what scores we give. No partner sees content before publication, and no ranking or review can be bought.</p>
      <h2>Sourcing</h2>
      <p>News articles cite primary sources — official project announcements, regulators such as the <a href="https://www.fca.org.uk" rel="noopener">FCA</a> and HMRC, and established outlets. We do not republish social media rumours as fact. Where a detail is unconfirmed, we say so plainly.</p>
      <h2>Testing</h2>
      <p>Reviews state whether we used the product hands-on, for how long, and when. Scores follow our published <a href="/review-methodology/">review methodology</a>.</p>
      <h2>AI assistance</h2>
      <p>We use AI tools for research and drafting support. Every article is directed, fact-checked, and approved by the named author before publication.</p>
      <h2>Corrections</h2>
      <p>Errors are fixed promptly and marked with a correction note showing what changed and when. See our <a href="/corrections/">corrections policy</a>.</p>
      <h2>High-risk topics</h2>
      <p>Crypto content never contains price predictions or buy recommendations. All investment-adjacent articles carry a risk disclaimer, in line with FCA consumer-protection expectations. Cryptoassets are largely unregulated in the UK and you could lose all your money.</p>
    </StandardPage>
  );
}
