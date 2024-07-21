
import { ObjectId } from "bson";
export const generateRUC = () => {
  let ruc;
  let checksum = 10;
  while (checksum === 10 || checksum === 11) {
    const prefixes = [10, 15, 17, 20];
    ruc = prefixes[Math.floor(Math.random() * prefixes.length)].toString();
    for (let i = 0; i < 8; i++) {
      ruc += Math.floor(Math.random() * 10).toString();
    }
    let sum = 0;
    const factors = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 10; i++) {
      sum += parseInt(ruc.charAt(i), 10) * factors[i];
    }
    checksum = 11 - (sum % 11);
  }
  ruc += checksum.toString();
  return ruc;
};

function getMod(t) {
  var e, n;
  e = 0;
  n = 1;
  while (t) {
    n = (n + (t % 10) * (9 - (e++ % 6))) % 11;
    t = Math.floor(t / 10);
  }
  if (n) {
    return n - 1;
  } else {
    return "K";
  }
}

function getRandomNumber(rutOpts) {
  var t, e, n, r;
  r = rutOpts.minValue;
  n = rutOpts.maxValue;
  e = parseInt(t);
  if (!e) {
    return Math.floor(Math.random() * (n - r + 1)) + r;
  } else {
    return e;
  }
}

export function generateRUTs(
  numberOfRuts = 10,
  minValue = 1e6,
  maxValue = 4e7
) {
  let ruts = [];

  const rutOpts = {
    quantity: numberOfRuts,
    minValue: minValue,
    maxValue: maxValue,
  };

  function generateRuts() {
    var e, n, r, u, i;
    n = [];
    let t = 0;
    while (t < rutOpts.quantity) {
      i = getRandomNumber(rutOpts);
      r = 0;
      e = false;
      while (r < n.length) {
        if (n[r].number === i) {
          e = true;
          break;
        }
        r++;
      }
      if (!e) {
        u = getMod(i);
        n.push({
          number: i,
          mod: u,
        });
      }
      t++;
    }
    return (ruts = n);
  }

  let generatedRuts = generateRuts().map((rut) => `${rut.number}-${rut.mod}`);
  if (generatedRuts.length === 1) {
    return generatedRuts[0];
  }
  return generatedRuts;
}

export function generateMongoId() {
    return new ObjectId();
}