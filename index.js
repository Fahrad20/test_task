const SetSerializer = {
    MAX: 300,
    BYTES: 38,
  
    serialize(arr) {
      const buf = new Uint8Array(this.BYTES);
      for (const n of arr) {
        if (n < 1 || n > this.MAX) continue;
        const i = n - 1;
        buf[i >> 3] |= 1 << (i & 7);
      }
      return btoa(String.fromCharCode(...buf));
    },
  
    deserialize(str) {
      const bin = atob(str);
      const buf = Uint8Array.from(bin, c => c.charCodeAt(0));
      const res = [];
      for (let i = 0; i < this.MAX; i++) {
        if (buf[i >> 3] & (1 << (i & 7))) res.push(i + 1);
      }
      return res;
    }
  };
  
  function runTests() {
    const cases = [
      { name: "Простейший (5)", data: [1, 2, 3, 4, 5] },
      { name: "Все 1-значные", data: Array.from({length: 9}, (_, i) => i + 1) },
      { name: "Все 2-значные", data: Array.from({length: 90}, (_, i) => i + 10) },
      { name: "Все 3-значные", data: Array.from({length: 201}, (_, i) => i + 100) },
      { name: "Случайные 50", data: Array.from({length: 50}, () => Math.floor(Math.random()*300)+1) },
      { name: "Случайные 100", data: Array.from({length: 100}, () => Math.floor(Math.random()*300)+1) },
      { name: "Случайные 500", data: Array.from({length: 500}, () => Math.floor(Math.random()*300)+1) },
      { name: "Случайные 1000", data: Array.from({length: 1000}, () => Math.floor(Math.random()*300)+1) },
      { name: "Каждого по 3 (900)", data: Array.from({length: 900}, (_, i) => (i % 300) + 1) }
    ];
  
    console.log("Кейс | Исх. | Сжатая | Коэф.");
    for (const c of cases) {
      const simple = c.data.join(",");
      const packed = SetSerializer.serialize(c.data);
      const ratio = (simple.length / packed.length).toFixed(2);
  
      const decoded = SetSerializer.deserialize(packed).sort((a,b)=>a-b);
      const unique = [...new Set(c.data)].sort((a,b)=>a-b);
      const ok = JSON.stringify(decoded) === JSON.stringify(unique);
  
      console.log(`${c.name} | ${simple.length} | ${packed.length} | ${ratio}x ${ok ? "OK" : "FAIL"}`);
    }
  }
  
  runTests();