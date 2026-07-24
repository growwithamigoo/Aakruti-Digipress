async function testFrontend() {
  const res = await fetch("http://localhost:3000/albums");
  const text = await res.text();
  const found = text.includes("Premium Aakruti Mesmera");
  console.log("FRONTEND ALBUMS PAGE CHECK:");
  console.log(`Contains 'Premium Aakruti Mesmera': ${found ? "YES ✅ (Successfully rendering on Front UI!)" : "NO ❌"}`);
}

testFrontend();
