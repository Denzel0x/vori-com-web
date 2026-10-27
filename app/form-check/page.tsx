import type { Metadata } from "next";
import FormCheck from "@/components/FormCheck";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Form check",
  robots: { index: false, follow: false },
};

export default function FormCheckPage() {
  return (
    <>
      <PageHead eyebrow="Owner tool" title={<span className="grad-text">Are the forms delivering?</span>}>
        Send a test to each inbox and see exactly what the email relay replies. Use it after deploying, and whenever a
        form shows an error.
      </PageHead>
      <section className="wrap sec" style={{ maxWidth: 820 }}>
        <FormCheck />
      </section>
    </>
  );
}
