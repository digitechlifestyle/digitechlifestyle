import type { Metadata } from "next";
import { StandardPage } from "@/components/StandardPage";

export const metadata: Metadata = { title: "Corrections Policy", alternates: { canonical: "/corrections" } };

export default function CorrectionsPage() {
  return (
    <StandardPage eyebrow="Standards" title="Corrections Policy" description="How to report an error, and what we do when one is found.">
      <h2>Report an error</h2>
      <p>Email <a href="mailto:contact@digitechlifestyle.com?subject=Correction%20request">contact@digitechlifestyle.com</a> with the article URL and the issue. Factual errors are reviewed within two working days.</p>
      <p><a href="mailto:contact@digitechlifestyle.com?subject=Correction%20request" style={{ display: "inline-block", background: "var(--amber)", color: "oklch(15% 0.02 60)", fontWeight: 800, fontSize: "14px", padding: "10px 20px", borderRadius: "8px", textDecoration: "none" }}>📧 Report an error</a></p>
      <h2>What happens next</h2>
      <p>Confirmed factual errors are corrected in the article, with a dated correction note explaining what changed. Significant errors — anything that could have affected a reader's decision — get the note placed at the top of the article, not buried at the bottom.</p>
      <h2>What we do not silently change</h2>
      <p>Typos and formatting fixes are made without notes. Anything touching facts, figures, scores, or recommendations gets a visible note. We do not delete articles to hide mistakes.</p>
      <h2>Outdated content</h2>
      <p>Crypto and AI move fast, and older articles can age out of accuracy without being "wrong" at the time. Where we refresh an article, we show the updated date. News articles state the date they were written and should be read in that context.</p>
    </StandardPage>
  );
}
