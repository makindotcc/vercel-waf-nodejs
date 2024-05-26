async function a(a, b = undefined) {
  if (b === undefined) b = {};
  const { exports: c } = await WebAssembly.instantiate(a, {
    env: {
      abort(a, b, c, d) {
        console.log("abort", a, b, c, d);
        throw new Error(i(a) + " in " + i(b) + ":" + c + ":" + d);
      },
      "console.log"(a) {
        return console.log(i(a));
      },
      seed() {
        return Date.now() * Math.random();
      },
      gtk() {
        // prettier-ignore
        const a = ["name","onmessage","onmessageerror","cancelAnimationFrame","close","postMessage","requestAnimationFrame","webkitRequestFileSystem","webkitRequestFileSystemSync","webkitResolveLocalFileSystemSyncURL","webkitResolveLocalFileSystemURL","a0_0x17c7","a0_0x18bb","a0_0x465520","a0_0x4c1599","TEMPORARY","PERSISTENT","self","location","onerror","onlanguagechange","navigator","onrejectionhandled","onunhandledrejection","isSecureContext","origin","trustedTypes","performance","crypto","indexedDB","fonts","createImageBitmap","fetch","importScripts","queueMicrotask","caches","crossOriginIsolated","scheduler","atob","btoa","clearInterval","clearTimeout","reportError","setInterval","setTimeout","structuredClone","addEventListener","dispatchEvent","removeEventListener"];
        return j(a.sort().join(";"));
      },
      gts(a, b) {
        return j(h(a, b));
      },
      gtn(a, b) {
        return h(a, b);
      },
      gto(a, b) {
        return l(h(a, b));
      },
    },
  });
  const { memory: d } = c;
  const e = new Map();
  class f extends Number {}
  const g = new FinalizationRegistry(n);
  function h(a, b) {
    const accessedField = i(a).split(".");
    const c = accessedField.reduce((a, b) => a[b], globalThis);
    if (typeof c === "function") {
      const args = b ? k(b) : [];
      console.log("called function:", c, "with args:", args);
      return c.bind(globalThis)(...args);
    } else {
      console.log("accessed field:", accessedField, c);
      return c;
    }
  }
  function i(a) {
    if (!a) {
      return null;
    }
    const b = (a + new Uint32Array(d.buffer)[(a - 4) >>> 2]) >>> 1;
    const c = new Uint16Array(d.buffer);
    let e = a >>> 1;
    let f = "";
    while (b - e > 1024) {
      const a = e + 1024;
      f += String.fromCharCode(...c.subarray(e, a));
      e = a;
    }
    return f + String.fromCharCode(...c.subarray(e, b));
  }
  function j(a) {
    if (a == null) {
      return 0;
    }
    const b = a.length;
    const e = c.__new(b << 1, 2) >>> 0;
    const f = new Uint16Array(d.buffer);
    for (let c = 0; c < b; ++c) {
      f[(e >>> 1) + c] = a.charCodeAt(c);
    }
    return e;
  }
  function k(a) {
    if (!a) {
      return null;
    }
    const b = new f(m(a));
    g.register(b, a);
    return b;
  }
  function l(a) {
    if (a == null) {
      return 0;
    }
    if (a instanceof f) {
      return a.valueOf();
    }
    throw TypeError("internref expected");
  }
  function m(a) {
    if (!a) {
      return a;
    }
    const b = e.get(a);
    if (b) {
      e.set(a, b + 1);
    } else {
      e.set(c.__pin(a), 1);
    }
  }
  function n(a) {
    if (!a) {
      return;
    }
    const b = e.get(a);
    if (b === 1) {
      c.__unpin(a);
      e.delete(a);
    } else if (b) {
      e.set(a, b - 1);
    } else {
      throw Error("invalid refcount '" + b + "' for reference '" + a + "'");
    }
  }
  return {
    solve(a) {
      if (a == null) {
        throw new TypeError("value must not be null");
      }
      const b = j(a);
      const d = c.solve(b);
      return i(d);
    },
  };
}
async function b(a, b, c) {
  const d = {
    "x-vercel-challenge-token": a,
    "x-vercel-challenge-solution": b,
    "x-vercel-challenge-version": c,
  };
  const e = {
    method: "POST",
    headers: d,
  };
  return fetch("/.well-known/vercel/security/request-challenge", e);
}

async function essa() {
  try {
    const { token: d, version: e } = {
      token:
        "2.1716714678.60.MDM3ODVlODI5ZWFiNDIxZDMwNWNmNmYxMWQyZDY1NDY7NDdkY2EyZDg7MTdlYzdlOGFiY2YyYWQzNWU3NTYyZDE3ODA0M2ViYzJkOWFkMzI0Yzs0.09be371cf4e973ce32715000f53ea2f8",
      version: "2",
    };
    const wasmBuffer = await require("fs/promises").readFile(
      "challenge.v2.wasm"
    );
    const g = await WebAssembly.compile(wasmBuffer);
    const h = await a(g);
    const soymaxxing = h.solve(d);
    console.log("solved challenge:", soymaxxing);
    // await b(d, i, e);
    // self.postMessage(null);
  } catch (a) {
    console.error("Failed to solve challenge:", a);
  }
}
essa();
