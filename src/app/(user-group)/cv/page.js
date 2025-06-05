import dynamic from "next/dynamic";

const UploadForm = dynamic(() => import("../../../components/UploadForm"), {
  ssr: false,
});

export default function CVPage() {
  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h1>Dynamic Cover Letter Generator</h1>
      <UploadForm />
    </div>
  );
}
