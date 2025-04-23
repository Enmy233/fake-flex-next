import { useState } from "react";
import html2canvas from "html2canvas";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("paypal");
  const [isPro, setIsPro] = useState(false);

  const generateImage = async () => {
    const element = document.getElementById("screenshot-area");
    if (!element) return;

    const canvas = await html2canvas(element);
    const link = document.createElement("a");
    link.download = `fake-${platform}-proof.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h2 style={{ fontWeight: 'bold', fontSize: 24 }}>💰 Fake Flex Generator</h2>
      <input
        placeholder="Nom / pseudo affiché"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <input
        placeholder="Montant (ex: 174.00)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 20 }}
      >
        <option value="paypal">PayPal</option>
        <option value="revolut">Revolut</option>
        <option value="binance">Trade Binance</option>
        <option value="mt4">MetaTrader 4 (FX)</option>
      </select>

      <div id="screenshot-area" style={{
        border: '1px solid #ddd',
        padding: 20,
        borderRadius: 8,
        background: '#f9f9f9',
        position: 'relative',
        marginBottom: 20
      }}>
        <p style={{ margin: 0, fontSize: 12, color: '#888' }}>{platform.toUpperCase()} - Transaction</p>
        <h3 style={{ fontSize: 24, fontWeight: 'bold' }}>+ {amount} €</h3>
        <p style={{ fontSize: 16 }}>de {name}</p>
        {!isPro && (
          <div style={{
            position: 'absolute',
            bottom: 8,
            right: 10,
            fontSize: 12,
            color: '#999',
            opacity: 0.3
          }}>
            @FakeFlex.ai
          </div>
        )}
      </div>

      <button onClick={generateImage} style={{ padding: 10, background: 'black', color: 'white', width: '100%' }}>
        📸 Télécharger l'image
      </button>

      <div style={{ marginTop: 20 }}>
        <input
          type="checkbox"
          checked={isPro}
          onChange={() => setIsPro(!isPro)}
        />{" "}
        Activer la version Pro (sans watermark)
      </div>
    </div>
  );
}
