// src/orden/index.ts
import { orden as catalogoSinTipar } from "./orden";   // tu array existente

export interface CatalogItem {
  title: string;
  imagenLista: string;
}

/** 
 *  Mapa para lookup instantáneo por título.
 *  - Normalizo: trim, mayúsculas y sin tildes para evitar “HONDA PÁJARO LOCO” ≠ “HONDA PAJARO LOCO”.
 */
export const catalogMap: Record<string, string> = catalogoSinTipar.reduce(
  (acc, { title, imagenLista }) => {
    const key = normalizar(title);
    acc[key] = imagenLista;
    return acc;
  },
  {} as Record<string, string>
);

function normalizar(txt: string) {
  return txt
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}
