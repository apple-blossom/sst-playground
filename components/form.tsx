// components/Form.tsx
"use client";

import styles from "./form.module.css";

export default function Form({ url }: { url: string }) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const file = form.file.files?.[0];
    
    if (!file) return;

    await fetch(url, {
      body: file,
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="${file.name}"`,
      },
    });

    window.location.href = url.split("?")[0];
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input 
        name="file" 
        type="file" 
        accept="image/png, image/jpeg" 
        required
      />
      <button type="submit">Upload Image</button>
    </form>
  );
}